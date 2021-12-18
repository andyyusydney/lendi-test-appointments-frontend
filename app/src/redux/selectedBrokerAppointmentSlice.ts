import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedBrokerAppointment {
  brokerName: string;
  appointmentDate: string;
}

const initialState = {} as SelectedBrokerAppointment;

const selectedBrokerAppointmentSlice = createSlice({
  name: "selectedBrokerAppointment",
  initialState,
  reducers: {
    setSelectedBrokerAppointment(
      state,
      action: PayloadAction<SelectedBrokerAppointment>
    ) {
      return { ...action.payload };
    },
  },
});

export const { setSelectedBrokerAppointment } =
  selectedBrokerAppointmentSlice.actions;
export default selectedBrokerAppointmentSlice.reducer;
