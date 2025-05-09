import { FormState } from "@/app/types/formTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  location: "",
  agenda: [],
  summary: "",
  gender: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { updateForm, resetForm } = formSlice.actions;

export default formSlice.reducer;
