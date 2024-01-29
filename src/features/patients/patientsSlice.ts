import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../common/constants";
import { AsyncThunkStatus } from "../../common/types";
import { IPatient } from "./types";

interface PatientsState {
  patients: IPatient[];
  status: AsyncThunkStatus;
  error?: string;
  idOfPatientToEdit: string;
}

const initialState: PatientsState = {
  patients: [],
  status: "idle",
  error: undefined,
  idOfPatientToEdit: "",
};

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await fetch(`${API_ENDPOINT}/users`);
    const data = await response.json();

    return data;
  }
);

export const fetchPatientById = createAsyncThunk<IPatient, string>(
  "patients/fetchPatientById",
  async (id) => {
    const response = await fetch(`${API_ENDPOINT}/users/${id}`);
    const data = await response.json();
    return data;
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setIdOfPatientToEdit(state, action: PayloadAction<string>) {
      state.idOfPatientToEdit = action.payload;
    },
    updatePatientLocally(state, action: PayloadAction<IPatient>) {
      const index = state.patients.findIndex(
        (patient) => patient.id === action.payload.id
      );
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPatients.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setIdOfPatientToEdit, updatePatientLocally } =
  patientSlice.actions;
export default patientSlice.reducer;
