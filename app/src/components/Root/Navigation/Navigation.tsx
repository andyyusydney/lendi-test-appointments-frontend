import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../redux/store";

const Wrapper = styled.div`
  background-color: #e7e7e7;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  padding: 24px 48px;
  box-shadow: 1px 1px 1px #b8b8b8;
  margin-bottom: 48px;
`;

const Navigation = () => {
  const selectedBrokerAppointment = useSelector(
    (state: RootState) => state.selectedBrokerAppointment
  );

  return (
    <Wrapper>
      <strong>
        Currently selected appointment:
        {selectedBrokerAppointment.appointmentDate &&
          selectedBrokerAppointment.brokerName && (
            <>
              {selectedBrokerAppointment.appointmentDate} with {selectedBrokerAppointment.brokerName}
            </>
          )}
      </strong>
      <strong>Welcome to Lendi</strong>
    </Wrapper>
  );
};

export default Navigation;
