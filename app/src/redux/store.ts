import { configureStore } from "@reduxjs/toolkit";
import selectedBrokerAppointmentReducer from './selectedBrokerAppointmentSlice'

export const store = configureStore({
	reducer: {
		selectedBrokerAppointment: selectedBrokerAppointmentReducer
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

