"use client";

import { progressProps } from "@/app/types/formTypes";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import styles from "./Register.module.css";

const Progress: React.FC<progressProps> = ({ formData }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let totalFields = 8;
    let filledFields = 0;

    const requiredFields = [
      "name",
      "email",
      "phone",
      "company",
      "role",
      "location",
      "agenda",
      "gender",
    ];

    {
      requiredFields.forEach((feild) => {
        const value = formData[feild as keyof typeof formData];
        if (
          (Array.isArray(value) && value.length > 0) ||
          (typeof value === "string" && value !== "")
        )
          filledFields++;
      });
    }

    const formProgress = (filledFields / totalFields) * 100;
    setProgress(formProgress);
  }, [formData]);

  return (
    <div className={styles.progressBarAlignment}>
      <LinearProgress
        variant="determinate"
        color={
          progress < 77
            ? "error"
            : progress > 77 && progress < 90
            ? "primary"
            : "success"
        }
        value={progress}
        className={styles.progressBar}
      />
      {Math.round(progress)}%
    </div>
  );
};

export default Progress;
