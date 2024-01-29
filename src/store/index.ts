import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "features/patients/patientsSlice";

export const store = configureStore({
  reducer: {
    patients: patientReducer,
  },
});
