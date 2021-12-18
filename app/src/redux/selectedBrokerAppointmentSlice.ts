import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedBrokerAppointmentSlice {
  brokerName: string;
  appointmentDate: string;
}

const initialState = {} as SelectedBrokerAppointmentSlice;

const selectedBrokerAppointmentSlice = createSlice({
  name: "selectedBrokerAppointment",
  initialState,
  reducers: {
    setSelectedBrokerAppointment(
      state,
      action: PayloadAction<SelectedBrokerAppointmentSlice>
    ) {
      return { ...action.payload };
    },
  },
});

export const { setSelectedBrokerAppointment } =
  selectedBrokerAppointmentSlice.actions;
export default selectedBrokerAppointmentSlice.reducer;
