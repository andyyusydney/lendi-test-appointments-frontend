import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BrokerAppointment } from "../components/Root/AppointmentSelect/AppointmentSelect";

const initialState = [] as BrokerAppointment[];

const brokersAppointmentsSlice = createSlice({
  name: "brokersAppointments",
  initialState,
  reducers: {
    setbrokersAppointments(
      state,
      action: PayloadAction<BrokerAppointment[]>
    ) {
      return [...action.payload]
    },
  },
});

export const { setbrokersAppointments } =
brokersAppointmentsSlice.actions;
export default brokersAppointmentsSlice.reducer;
