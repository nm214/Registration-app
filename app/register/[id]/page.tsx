"use client";
import { notFound, useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { resetForm, updateForm } from "../../../store/formSlice";
import styles from "./Register.module.css";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { TextField, Button, Typography } from "@mui/material";
import { getForms, submitForm } from "../../../lib/api";

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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [agendaOptions, setAgendaOptions] = useState<
    { id: string; title: string }[]
  >([]);

  useEffect(() => {
    if (formSubmitted) return;
    const isformOneValid =
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.company &&
      formData.role &&
      formData.location;

    const isformTwoValid = formData.agenda && formData.agenda.length > 0;

    if (id === "2" && !isformOneValid) {
      router.push("/register/1");
    }
    if (id === "3") {
      if (!isformOneValid) {
        router.push("/register/1");
      } else if (!isformTwoValid) {
        router.push("/register/2");
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

  useEffect(() => {
    const fetchAgendaOptions = async () => {
      try {
        const options = await getForms();
        setAgendaOptions(options);
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
      await submitForm(formData);
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
      <h1 className={styles.title}>Registration Step {id}</h1>
      <form>
        <div className={styles.formSection}>
          {id === "1" && (
            <>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!error.name}
                helperText={error.name}
                margin="normal"
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!error.email}
                helperText={error.email}
                margin="normal"
              />

              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!error.phone}
                helperText={error.phone}
                margin="normal"
              />

              <TextField
                label="Company"
                variant="outlined"
                fullWidth
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                error={!!error.company}
                helperText={error.company}
                margin="normal"
              />

              <TextField
                label="Role"
                variant="outlined"
                fullWidth
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={!!error.role}
                helperText={error.role}
                margin="normal"
              />

              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={!!error.location}
                helperText={error.location}
                margin="normal"
              />
            </>
          )}

          {id === "2" && (
            <>
              <Typography className={styles.label}>
                Select Agenda Items:
              </Typography>

              <div className={styles.agendaGrid}>
                {agendaOptions.map((item) => (
                  <Button
                    className={styles.agendaButton}
                    key={item.id}
                    variant={
                      agenda.includes(item.id) ? "contained" : "outlined"
                    }
                    color={agenda.includes(item.id) ? "primary" : "info"}
                    onClick={() => toggleAgenda(item.id)}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
              {error.agenda && (
                <Typography variant="body2" color="error">
                  {error.agenda}
                </Typography>
              )}
            </>
          )}

          {id === "3" && (
            <div className={styles.summaryBox}>
              <Typography
                variant="h5"
                fontSize={"1.25rem"}
                fontWeight={"800"}
                color="#222"
                className={styles.summaryTitle}
              >
                Review Your Info:
              </Typography>
              <div className={styles.infoBox}>
                <Typography variant="inherit" gutterBottom>
                  <strong>Name:</strong> {formData.name}
                </Typography>
                <Typography variant="inherit" gutterBottom>
                  <strong>Email:</strong> {formData.email}
                </Typography>
                <Typography variant="inherit" gutterBottom>
                  <strong>Phone Number:</strong> {formData.phone}
                </Typography>
                <Typography variant="inherit" gutterBottom>
                  <strong>Company:</strong> {formData.company}
                </Typography>
                <Typography variant="inherit" gutterBottom>
                  <strong>Role:</strong> {formData.role}
                </Typography>
                <Typography variant="inherit" gutterBottom>
                  <strong>Location:</strong> {formData.location}
                </Typography>

                <Typography variant="inherit" gutterBottom>
                  <strong>Agenda:</strong>
                  {formData.agenda
                    .map((id) => {
                      const match = agendaOptions.find(
                        (item) => item.id === id
                      );
                      return match ? match.title : id;
                    })
                    .join(", ")}
                </Typography>
                <TextField
                  label="What are you hoping to learn?:"
                  name="summary"
                  value={formData.summary}
                  variant="outlined"
                  fullWidth
                  id="summary"
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={4}
                  className={styles.summary}
                />
              </div>
              <Button
                color="primary"
                variant="contained"
                className={styles.submitButton}
                onClick={handleSubmit}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
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
          {id !== "3" && (
            <Button
              color="primary"
              variant="contained"
              className={styles.button}
              onClick={handleNext}
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
