import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import AddressPage from "./components/AddressPage";
import AddressCard from "./components/AddressCard";


const testData = {
  firstName: 'John',
  lastName: 'Doe',
  img: 'path/to/image',
  phoneNumber: '123-456-7890',
  address: '123 Main St',
  title: 'Mr.',
  cell: '987-654-3210',
  email: 'john.doe@example.com',
  imgBg: 'path/to/backgroundImage',
};

describe('AddressPage Component', () => {
  test("AddressPage renders without errors", () => {
    render(<AddressPage/>);
  });

  test("AddressPage fetches data and renders AddressCards", async () => {
    render(<AddressPage/>);

    await waitFor(() => {
      const addressCards = screen.getAllByTestId("address-card");
      console.log(addressCards)
      expect(addressCards.length).toBe(50);
    });
  });
});

describe('AddressCard Component', () => {
  test('renders the button with correct text', () => {
    render(<AddressCard {...testData} />);
    const buttonElement = screen.getByTestId('address-card-btn');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('John');
    expect(buttonElement).toHaveTextContent('Doe');
  });

  test('dialog opens and displays information correctly when the button is clicked', () => {
    render(<AddressCard {...testData} />);
    const buttonElement = screen.getByTestId('address-card-btn');

    const dialogElement = screen.queryByRole('dialog');
    expect(dialogElement).toBeNull();

    fireEvent.click(buttonElement);

    const dialogTitle = screen.getByText('Mr. John Doe');
    const addressText = screen.getByText('Address: 123 Main St');
    const phoneNumberText = screen.getByText('Phone Number: 123-456-7890');
    const cellText = screen.getByText('Cellphone Number: 987-654-3210');
    const emailText = screen.getByText('Email: john.doe@example.com');

    expect(dialogTitle).toBeInTheDocument();
    expect(addressText).toBeInTheDocument();
    expect(phoneNumberText).toBeInTheDocument();
    expect(cellText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
  });

  test('dialog closes when the close button is clicked', async () => {
    render(<AddressCard {...testData} />);
    const buttonElement = screen.getByTestId('address-card-btn');

    fireEvent.click(buttonElement);

    const dialogElement = screen.getByTestId('address-card-dialog');
    expect(dialogElement).toBeInTheDocument();

    const closeButton = screen.getByTestId('address-card-close-btn');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(dialogElement).not.toBeInTheDocument();
    });
  });
});
