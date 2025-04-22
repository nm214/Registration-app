"use client";
import { notFound, useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { resetForm, updateForm } from "../../../store/formSlice";
import styles from "./Register.module.css";
import { useState } from "react";
import { db } from "@/app/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Modal from "@/components/Modal";

export default function RegisterPage() {
  const { id } = useParams();
  const router = useRouter();

  if (Number(id) < 1 || Number(id) > 3 || isNaN(Number(id))) {
    notFound();
  }

  const formData = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const agenda = useSelector((state: any) => state.form.agenda);
  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    location: "",
    agenda: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    if (id === "1") {
      let newErrors = {
        name: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        location: "",
        agenda: "",
      };
      let isValid = true;

      if (!formData.name.trim()) {
        newErrors.name = "Name is required.";
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email.";
        isValid = false;
      }

      const phoneRegex = /^\d{10}$/;
      if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
        newErrors.phone = "Enter a valid 10-digit phone number.";
        isValid = false;
      }

      if (!formData.company.trim()) {
        newErrors.company = "Company is required.";
        isValid = false;
      }

      if (!formData.role.trim()) {
        newErrors.role = "Role is required.";
        isValid = false;
      }

      if (!formData.location.trim()) {
        newErrors.location = "Location is required.";
        isValid = false;
      }

      if (!isValid) {
        setError(newErrors);
        return;
      }
      router.push("/register/2");
    } else if (id === "2") {
      if (!formData.agenda || formData.agenda.length === 0) {
        setError((prev) => ({
          ...prev,
          agenda: "Please select at least one agenda item.",
        }));
        return;
      }
      router.push("/register/3");
    }
  };

  const handlePrevious = () => {
    if (id === "2") {
      router.push("/register/1");
    } else if (id === "3") {
      router.push("/register/2");
    }
  };

  const agendaOptions = [
    { id: "frontend", title: "Frontend Development" },
    { id: "backend", title: "Backend Development" },
    { id: "devops", title: "DevOps & Deployment" },
    { id: "design", title: "UI/UX Design" },
  ];

  const toggleAgenda = (id: string) => {
    const alreadySelected = agenda.includes(id);
    const updatedAgenda = alreadySelected
      ? agenda.filter((item: string) => item !== id)
      : [...agenda, id];

    dispatch(updateForm({ agenda: updatedAgenda }));
    setError((prev) => ({ ...prev, agenda: "" }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const missingFields: string[] = [];
    const requiredFields: { name: keyof typeof formData; label: string }[] = [
      { name: "name", label: "Name" },
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone Number" },
      { name: "company", label: "Company" },
      { name: "role", label: "Role" },
      { name: "location", label: "Location" },
      { name: "agenda", label: "Agenda" },
    ];

    requiredFields.forEach((field) => {
      if (
        !formData[field.name] ||
        (Array.isArray(formData[field.name]) &&
          formData[field.name].length === 0)
      ) {
        missingFields.push(field.label);
      }
    });

    if (missingFields.length > 0) {
      const missingFieldsList = missingFields.join(", ");
      setModalMessage(
        `Please fill in the following fields: ${missingFieldsList}`
      );
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "registrations"), formData);
      dispatch(resetForm());
      setModalMessage(`Registration completed!`);
      setIsModalOpen(true);
      setIsLoading(false);
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      setModalMessage("Something went wrong while submitting the form.");
      setIsModalOpen(true);
      setIsLoading(false);
      setSubmissionSuccess(false);
    }
  };

  // const handleSubmit = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch("/api/post", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  //     if (!res.ok) throw new Error("API request failed");
  //     const data = await res.json();
  //     console.log("Response:", data);
  //     dispatch(resetForm());
  //     setModalMessage("Form successfully submitted to API!");
  //     setSubmissionSuccess(true);
  //   } catch (error) {
  //     console.error("API error:", error);
  //     setModalMessage("Something went wrong while submitting to API.");
  //     setSubmissionSuccess(false);
  //   } finally {
  //     setIsModalOpen(true);
  //     setIsLoading(false);
  //   }
  // };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (submissionSuccess) {
      router.push("/summary");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Registration Step {id}</h1>
      <form>
        <div className={styles.formSection}>
          {id === "1" && (
            <>
              <label className={styles.label} htmlFor="name">
                Name:
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {error.name && <p className={styles.error}>{error.name}</p>}
              <label className={styles.label} htmlFor="email">
                Email:
              </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && <p className={styles.error}>{error.email}</p>}
              <label className={styles.label} htmlFor="phone">
                Phone Number:
              </label>
              <input
                className={styles.input}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {error.phone && <p className={styles.error}>{error.phone}</p>}
              <label className={styles.label} htmlFor="company">
                Company:
              </label>
              <input
                className={styles.input}
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              {error.company && <p className={styles.error}>{error.company}</p>}
              <label className={styles.label} htmlFor="role">
                Role:
              </label>
              <input
                className={styles.input}
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
              {error.role && <p className={styles.error}>{error.role}</p>}

              <label className={styles.label} htmlFor="location">
                Location:
              </label>
              <input
                className={styles.input}
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              {error.location && (
                <p className={styles.error}>{error.location}</p>
              )}
            </>
          )}

          {id === "2" && (
            <>
              <p className={styles.label}>Select Agenda Items:</p>
              <div className={styles.agendaGrid}>
                {agendaOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.agendaButton} ${
                      agenda.includes(item.id) ? styles.selected : ""
                    }`}
                    onClick={() => toggleAgenda(item.id)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              {error.agenda && (
                <p className={styles.agendaError}>{error.agenda}</p>
              )}
            </>
          )}

          {id === "3" && (
            <div className={styles.summaryBox}>
              <h2 className={styles.summaryTitle}>Review Your Info:</h2>
              <p>
                {" "}
                <strong>Name: </strong>
                {formData.name}
              </p>
              <p>
                {" "}
                <strong>Email:</strong> {formData.email}
              </p>

              <p>
                {" "}
                <strong>Phone Number:</strong> {formData.phone}
              </p>
              <p>
                {" "}
                <strong>Company:</strong> {formData.company}
              </p>
              <p>
                {" "}
                <strong>Role:</strong> {formData.role}
              </p>
              <p>
                {" "}
                <strong>Location:</strong> {formData.location}
              </p>

              <p>
                <strong>Agenda:</strong> {formData.agenda.join(", ")}
              </p>
              <p>
                <strong>What are you hoping to learn?:</strong>
              </p>
              <textarea
                id="summary"
                name="summary"
                className={styles.summary}
                value={formData.summary}
                onChange={handleChange}
              ></textarea>
              <button
                className={styles.submitButton}
                type="button"
                onClick={handleSubmit}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </div>

        <div className={styles.buttonsContainer}>
          {id !== "1" && (
            <button
              className={styles.button}
              type="button"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {id !== "3" && (
            <button
              className={styles.button}
              type="button"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </form>
      {isModalOpen && (
        <Modal message={modalMessage} onClose={handleModalClose} />
      )}
    </div>
  );
}
