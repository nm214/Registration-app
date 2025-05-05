import { Button, TextField, Typography } from "@mui/material";
import styles from "./Register.module.css";

interface formFourProps {
  handleChange: any;
  agendaOptions: any;
  formData: any;
  handleSubmit: any;
  isLoading: any;
}

const FormFour: React.FC<formFourProps> = ({
  handleChange,
  agendaOptions,
  formData,
  handleSubmit,
  isLoading,
}) => {
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
            .map((id: string) => {
              const match = agendaOptions.find(
                (item: { id: string }) => item.id === id
              );
              return match ? match.title : id;
            })
            .join(", ")}
        </Typography>
        <Typography variant="inherit" gutterBottom>
          <strong>Gender:</strong> {formData.gender}
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
