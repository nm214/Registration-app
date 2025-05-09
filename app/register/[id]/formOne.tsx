import { formOneProps, FormState, Error } from "@/app/types/formTypes";
import { TextField } from "@mui/material";

const FormOne: React.FC<formOneProps> = ({ formData, handleChange, error }) => {
  const requiredFields = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone Number" },
    { name: "company", label: "Company" },
    { name: "role", label: "Role" },
    { name: "location", label: "Location" },
  ];
  return (
    <>
      {requiredFields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          variant="outlined"
          fullWidth
          id={field.name}
          name={field.name}
          value={formData[field.name as keyof FormState]}
          onChange={handleChange}
          error={!!error[field.name as keyof Error]}
          helperText={error[field.name as keyof Error]}
          margin="normal"
        />
      ))}
    </>
  );
};

export default FormOne;
