import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "features/patients/patientsSlice";

export const store = configureStore({
  reducer: {
    patients: patientReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
