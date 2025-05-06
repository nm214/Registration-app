import { TextField } from "@mui/material";

interface formOneProps {
  formData: any;
  handleChange: any;
  error: any;
}

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
          value={formData[field.name]}
          onChange={handleChange}
          error={!!error[field.name]}
          helperText={error[field.name]}
          margin="normal"
        />
      ))}
    </>
  );
};

export default FormOne;
