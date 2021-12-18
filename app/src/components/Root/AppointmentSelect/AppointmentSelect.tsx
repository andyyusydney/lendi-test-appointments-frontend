import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setbrokersAppointments } from "../../../redux/brokersAppointmentsSlice";
import { setSelectedBrokerAppointment } from "../../../redux/selectedBrokerAppointmentSlice";
import { AppDispatch, RootState } from "../../../redux/store";

import Broker from "./Broker";

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 250px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
  display: block;
  font-size: 20px;
`;

export interface Broker {
  id: number;
  name: string;
}

export interface Appointment {
  id: number;
  brokerId: number;
  date: string;
}

export interface BrokerAppointment extends Broker {
  appointments: Appointment[];
}

const AppointmentSelect = () => {
  const appState = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/brokers"),
      axios.get("http://localhost:8080/appointments"),
    ]).then(([brokersData, appointmentsData]) => {
      if (brokersData?.data?.length > 0) {
        const brokerAppointmentsData: BrokerAppointment[] =
          brokersData.data.map((broker: Broker) => ({
            id: broker.id,
            name: broker.name,
            appointments:
              appointmentsData?.data?.length > 0 &&
              appointmentsData.data.filter(
                (appointment: Appointment) => appointment.brokerId === broker.id
              ),
          }));

        dispatch(setbrokersAppointments(brokerAppointmentsData));
      }
    });
  }, []);

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          {appState.brokersAppointments.length > 0 &&
            appState.brokersAppointments.map((broker: BrokerAppointment) => (
              <Broker key={broker.id} broker={broker} />
            ))}
        </ul>
      </SideBar>
      <div>
        <Heading>Appointment details</Heading>
        {appState.selectedBrokerAppointment && (
          <>
            <p>Broker's name: {appState.selectedBrokerAppointment?.brokerName}</p>
            <p>
              Appointment Date: {appState.selectedBrokerAppointment?.appointmentDate}
            </p>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
