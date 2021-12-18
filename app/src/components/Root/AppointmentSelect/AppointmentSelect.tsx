import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

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

interface SelectedBrokerAppointment extends Broker {
  appointment: Appointment | undefined;
}

const AppointmentSelect = () => {
  const [brokerAppointments, setBrokerAppointments] = useState<
    BrokerAppointment[]
  >([]);
  const [selectedBrokerAppointment, setSelectedBrokerAppointment] =
    useState<SelectedBrokerAppointment>();

  const onSelect = (brokerId: number, appointmentId: number) => {
    const selectedBroker = brokerAppointments.find(
      (brokerAppointment: BrokerAppointment) =>
        brokerAppointment.id === brokerId
    );

    const selectedAppointment = selectedBroker?.appointments.find(
      (appointment: Appointment) => appointment.id === appointmentId
    );

    if (selectedBroker) {
      setSelectedBrokerAppointment({
        id: selectedBroker.id,
        name: selectedBroker.name,
        appointment: selectedAppointment,
      });
    }
  };

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
        setBrokerAppointments(brokerAppointmentsData);
      }
    });
  }, []);

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          {brokerAppointments.length > 0 &&
            brokerAppointments.map((broker: BrokerAppointment) => (
              <Broker key={broker.id} broker={broker} onSelect={onSelect} />
            ))}
        </ul>
      </SideBar>
      <div>
        <Heading>Appointment details</Heading>
        {selectedBrokerAppointment && (
          <>
            <p>Broker's name: {selectedBrokerAppointment.name}</p>
            <p>
              Appointment Date: {selectedBrokerAppointment?.appointment?.date}
            </p>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
