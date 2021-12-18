import { configureStore } from "@reduxjs/toolkit";
import selectedBrokerAppointmentReducer from './selectedBrokerAppointmentSlice'
import brokersAppointmentsReducer from './brokersAppointmentsSlice'

export const store = configureStore({
	reducer: {
		selectedBrokerAppointment: selectedBrokerAppointmentReducer,
		brokersAppointments: brokersAppointmentsReducer
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

