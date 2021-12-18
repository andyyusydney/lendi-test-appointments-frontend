import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../redux/store";

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
  const [brokersAppointments, setBrokersAppointments] = useState<
    BrokerAppointment[]
  >([]);
  const selectedBrokerAppointment = useSelector(
    (state: RootState) => state.selectedBrokerAppointment
  );

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/brokers"),
      axios.get("http://localhost:8080/appointments"),
    ]).then(([brokersData, appointmentsData]) => {
      if (brokersData.data?.length > 0) {
        const brokersAppointmentsData: BrokerAppointment[] =
          brokersData.data.map((broker: Broker) => ({
            id: broker.id,
            name: broker.name,
            appointments:
              appointmentsData.data?.length > 0 &&
              appointmentsData.data.filter(
                (appointment: Appointment) => appointment.brokerId === broker.id
              ),
          }));

        setBrokersAppointments(brokersAppointmentsData);
      }
    });
  }, []);

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          {brokersAppointments.length > 0 &&
            brokersAppointments.map((broker: BrokerAppointment) => (
              <Broker key={broker.id} broker={broker} />
            ))}
        </ul>
      </SideBar>
      <div>
        <Heading>Appointment details</Heading>
        {selectedBrokerAppointment && (
          <>
            <p>Broker's name: {selectedBrokerAppointment.brokerName}</p>
            <p>
              Appointment Date: {selectedBrokerAppointment.appointmentDate}
            </p>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
