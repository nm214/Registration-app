import { Button, TextField, Typography } from "@mui/material";
import styles from "./Register.module.css";
import { formFourProps, FormState } from "@/app/types/formTypes";

const FormFour: React.FC<formFourProps> = ({
  handleChange,
  agendaOptions,
  formData,
  handleSubmit,
  isLoading,
}) => {
  const requiredFields = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone Number" },
    { name: "company", label: "Company" },
    { name: "role", label: "Role" },
    { name: "location", label: "Location" },
    { name: "gender", label: "Gender" },
  ];
  return (
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
        {requiredFields.map((field) => (
          <Typography key={field.name} variant="inherit" gutterBottom>
            <strong>{field.label}:</strong>
            {formData[field.name as keyof FormState]}
          </Typography>
        ))}

        <Typography variant="inherit" gutterBottom>
          <strong>Agenda:</strong>
          {formData.agenda
            .map((id: string) => {
              const match = agendaOptions.find(
                (item: { id: string }) => item.id === id
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
  );
};

export default FormFour;
