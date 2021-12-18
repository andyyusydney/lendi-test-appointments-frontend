import React, { useState } from "react";
import { Appointment, BrokerAppointment } from "../AppointmentSelect";

export interface BrokerProps {
  broker: BrokerAppointment;
  onSelect: (arg0: number, arg1: number) => void
}

const Broker = ({ broker, onSelect }: BrokerProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const toggle = () => setIsShow(!isShow);

  return (
    <li>
      {broker.name}
      <br />
      {broker.appointments.length > 0 && (
        <>
          appointments:
          <button onClick={toggle} data-testid={isShow ? 'broker-hide-appointments-button' : 'broker-show-appointments-button'}>
            {isShow ? "Hide" : "Show"} appointments
          </button>
          {isShow && (
            <ul data-testid="broker-appointments-list">
              {broker.appointments.length > 0 &&
                broker.appointments.map((appointment: Appointment) => (
                  <li onClick={() => onSelect(broker.id, appointment.id)} key={appointment.id}>{appointment.date}</li>
                ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
};

export default Broker;
