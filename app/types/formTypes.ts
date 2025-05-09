export interface FormState {
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

export interface Error {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  location: string;
  agenda: string;
  gender: string;
}

export interface formOneProps {
  formData: FormState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error: Error;
}

interface Agenda {
  id: string;
  title: string;
}

type AgendaOptions = Agenda[];

export interface FormTwoProps {
  agendaOptions: AgendaOptions;
  toggleAgenda: (id: string) => void;
  error: Error;
  agenda: string[];
}

export interface formThreeProps {
  onChangeRadioButton: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: Error;
  gender: string;
}

export interface formFourProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  agendaOptions: AgendaOptions;
  formData: FormState;
  handleSubmit: () => void;
  isLoading: boolean;
}

export interface ModalProps {
  message: string;
  onClose: () => void;
}
