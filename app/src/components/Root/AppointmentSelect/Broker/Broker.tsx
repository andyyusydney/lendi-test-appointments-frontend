import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedBrokerAppointment } from "../../../../redux/selectedBrokerAppointmentSlice";
import { AppDispatch } from "../../../../redux/store";
import { Appointment, BrokerAppointment } from "../AppointmentSelect";

export interface BrokerProps {
  broker: BrokerAppointment;
}

const Broker = ({ broker }: BrokerProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const toggle = () => setIsShow(!isShow);

  const dispatch = useDispatch<AppDispatch>();

  const onSelect = (appointmentId: number) => {
      const selectedAppointment = broker.appointments.find(
        (appointment: Appointment) => appointment.id === appointmentId
      );

      if (selectedAppointment) {
        dispatch(
          setSelectedBrokerAppointment({
            brokerName: broker.name,
            appointmentDate: selectedAppointment.date,
          })
        );
      }
  };

  return (
    <li>
      {broker.name}
      <br />
      {broker.appointments.length > 0 && (
        <>
          appointments:
          <button
            onClick={toggle}
            data-testid={
              isShow
                ? "broker-hide-appointments-button"
                : "broker-show-appointments-button"
            }
          >
            {isShow ? "Hide" : "Show"} appointments
          </button>
          {isShow && (
            <ul data-testid="broker-appointments-list">
              {broker.appointments.map((appointment: Appointment) => (
                <li
                  onClick={() => onSelect(appointment.id)}
                  key={appointment.id}
                >
                  {appointment.date}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
};

export default Broker;
