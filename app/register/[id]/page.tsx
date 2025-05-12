"use client";
import { notFound, useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { resetForm, updateForm } from "../../../store/formSlice";
import styles from "./Register.module.css";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Button } from "@mui/material";
import React from "react";
import FormOne from "./formOne";
import FormTwo from "./formTwo";
import FormThree from "./formThree";
import FormFour from "./formFour";
import Progress from "./progress";

export default function RegisterPage() {
  const { id } = useParams();
  const router = useRouter();
  if (Number(id) < 1 || Number(id) > 4 || isNaN(Number(id))) {
    notFound();
  }

  const defaultErrorState = {
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    location: "",
    agenda: "",
    gender: "",
  };

  const formData = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const { agenda, gender } = useSelector((state: RootState) => state.form);
  const [error, setError] = useState(defaultErrorState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [agendaOptions, setAgendaOptions] = useState<
    { id: string; title: string }[]
  >([]);
  const [formOneValid, setFormOneValid] = useState(false);

  const isformOneValid = () =>
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.company &&
    formData.role &&
    formData.location;

  useEffect(() => {
    setFormOneValid(!!isformOneValid());
  }, [id, formData]);
  useEffect(() => {
    if (formSubmitted) return;
    const isformTwoValid = formData.agenda && formData.agenda.length > 0;

    const isformThreeValid = formData.gender;

    if (id === "2" && !isformOneValid()) {
      router.push("/register/1");
    }
    if (id === "3") {
      if (!isformOneValid()) {
        router.push("/register/1");
      } else if (!isformTwoValid) {
        router.push("/register/2");
      }
    }
    if (id === "4") {
      if (!isformOneValid()) {
        router.push("/register/1");
      } else if (!isformTwoValid) {
        router.push("/register/2");
      } else if (!isformThreeValid) {
        router.push("/register/3");
      }
    }
  }, [id, formData, router]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const onChangeRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateForm({ gender: e.target.value }));
    setError((prev) => ({ ...prev, gender: "" }));
  };

  const handleNext = () => {
    if (id === "1") {
      let newErrors = { ...defaultErrorState };
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
      } else {
        if (formData.agenda.length > 2) {
          setError((prev) => ({
            ...prev,
            agenda: "Only 2 can be selected",
          }));
          return;
        }
      }
      router.push("/register/3");
    } else if (id === "3") {
      if (!formData.gender) {
        setError((prev) => ({
          ...prev,
          gender: "Please select the gender.",
        }));
        return;
      }
      router.push("/register/4");
    }
  };

  const handlePrevious = () => {
    const prevStep = Math.max(Number(id) - 1, 1);
    router.push(`/register/${prevStep}`);
  };

  useEffect(() => {
    const fetchAgendaOptions = async () => {
      try {
        const response = await fetch("/api/forms");
        const data = await response.json();
        setAgendaOptions(data);
      } catch (error) {
        console.error("Failed to load agenda options", error);
      }
    };

    fetchAgendaOptions();
  }, []);

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
      { name: "gender", label: "Gender" },
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
      await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      dispatch(resetForm());
      setModalMessage("Registration completed!");
      setFormSubmitted(true);
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      setModalMessage("Something went wrong while submitting the form.");
      setSubmissionSuccess(false);
    } finally {
      setIsModalOpen(true);
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (submissionSuccess) {
      router.push("/summary");
    }
  };

  return (
    <div className={styles.formContainer}>
      <Progress formData={formData} />
      <h1 className={styles.title}>Registration Step {id}</h1>
      <form>
        <div className={styles.formSection}>
          {id === "1" && (
            <FormOne
              formData={formData}
              handleChange={handleChange}
              error={error}
            />
          )}

          {id === "2" && (
            <FormTwo
              agendaOptions={agendaOptions}
              toggleAgenda={toggleAgenda}
              error={error}
              agenda={agenda}
            />
          )}

          {id === "3" && (
            <FormThree
              onChangeRadioButton={onChangeRadioButton}
              error={error}
              gender={gender}
            />
          )}

          {id === "4" && (
            <FormFour
              handleChange={handleChange}
              agendaOptions={agendaOptions}
              formData={formData}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}
        </div>

        <div className={styles.buttonsContainer}>
          {id !== "1" && (
            <Button
              color="primary"
              variant="contained"
              className={styles.button}
              onClick={handlePrevious}
            >
              Previous
            </Button>
          )}
          {id !== "4" && (
            <Button
              color="primary"
              variant="contained"
              className={styles.button}
              onClick={handleNext}
              disabled={
                id === "1"
                  ? !formOneValid
                  : id === "2"
                  ? formData.agenda.length === 0
                  : !formData.gender
              }
            >
              Next
            </Button>
          )}
        </div>
      </form>
      {isModalOpen && (
        <Modal message={modalMessage} onClose={handleModalClose} />
      )}
    </div>
  );
}
