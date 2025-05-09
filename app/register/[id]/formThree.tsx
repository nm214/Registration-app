import { Radio, Typography } from "@mui/material";
import styles from "./Register.module.css";
import { formThreeProps } from "@/app/types/formTypes";

const FormThree: React.FC<formThreeProps> = ({
  onChangeRadioButton,
  error,
  gender,
}) => {
  return (
    <div className={styles.radio}>
      <Typography className={styles.label}>Select Gender:</Typography>
      <div>
        <div className={styles.radioLabel}>
          <Radio
            checked={gender === "female"}
            onChange={onChangeRadioButton}
            value="female"
            name="radio"
          />
          <Typography marginTop={"0.5rem"}>Female</Typography>
        </div>
        <div className={styles.radioLabel}>
          <Radio
            checked={gender === "male"}
            value="male"
            onChange={onChangeRadioButton}
            name="radio"
          />
          <Typography marginTop={"0.5rem"}>Male</Typography>
        </div>
      </div>
      {error.gender && (
        <Typography variant="body2" color="error">
          {error.gender}
        </Typography>
      )}
    </div>
  );
};

export default FormThree;
