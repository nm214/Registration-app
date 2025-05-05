import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  location: string;
  agenda: string[];
  summary: string;
  gender: string;
}

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
