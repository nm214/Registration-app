import { TextField } from "@mui/material";

interface formOneProps {
  formData: any;
  handleChange: any;
  error: any;
}

const FormOne: React.FC<formOneProps> = ({ formData, handleChange, error }) => {
  return (
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
  );
};

export default FormOne;
