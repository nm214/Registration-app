import { Button, Typography } from "@mui/material";
import styles from "./Register.module.css";

interface formTwoProps {
  agendaOptions: any;
  toggleAgenda: any;
  error: any;
  agenda: any;
}

const FormTwo: React.FC<formTwoProps> = ({
  agendaOptions,
  toggleAgenda,
  error,
  agenda,
}) => {
  return (
    <>
      <Typography className={styles.label}>Select Agenda Items:</Typography>

      <div className={styles.agendaGrid}>
        {agendaOptions.map((item: any) => (
          <Button
            className={styles.agendaButton}
            key={item.id}
            variant={agenda.includes(item.id) ? "contained" : "outlined"}
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
  );
};

export default FormTwo;
