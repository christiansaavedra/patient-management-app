import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../common/constants";
import { AsyncThunkStatus } from "../../common/types";
import { IPatients } from "./types";

interface PatientsState {
  patients: IPatients[];
  status: AsyncThunkStatus;
  error?: string;
}

const initialState: PatientsState = {
  patients: [],
  status: "idle",
  error: undefined,
};

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await fetch(`${API_ENDPOINT}/users`);
    const data = response.json();
    console.log("data", data);
    return data;
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
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

export default patientSlice.reducer;
