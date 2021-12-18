import {
  screen,
  render,
  fireEvent,
  within,
} from "@testing-library/react";

import Broker from "./Broker";

const testBroker = {
  name: "bob",
  id: 1,
  appointments: [{ brokerId: 1, date: "24/11/2021", id: 1 }],
};

describe("Broker Component", () => {
  beforeEach(() => {
    render(<Broker broker={testBroker} onSelect={jest.fn()} />);
  });

  test("should hide and show appointments on button click", () => {
    let appointmentsList = screen.queryByTestId("broker-appointments-list");
    expect(appointmentsList).toBeNull();

    const showAppointmentsButton = screen.getByTestId(
      "broker-show-appointments-button"
    );

    fireEvent.click(showAppointmentsButton);

    appointmentsList = screen.getByTestId("broker-appointments-list");
    const { getAllByRole } = within(appointmentsList);
    const items = getAllByRole("listitem");

    expect(items.length).toBe(1);
    expect(items[0].textContent).toEqual("24/11/2021");
  });
});
