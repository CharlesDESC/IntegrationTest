// src/RegisterForm.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RegisterForm } from "./registerFom";

describe("RegisterForm component", () => {
	test("renders all input fields and submit button", () => {
		render(<RegisterForm />);

		expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /register/i })
		).toBeInTheDocument();
	});

	test("calls onSubmit with form values when submitted", () => {
		const mockOnSubmit = jest.fn();
		render(<RegisterForm onSubmit={mockOnSubmit} />);

		fireEvent.change(screen.getByLabelText(/username/i), {
			target: { value: "charles", name: "username" },
		});
		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: "charles@example.com", name: "email" },
		});
		fireEvent.change(screen.getByLabelText(/password/i), {
			target: { value: "mypassword", name: "password" },
		});

		fireEvent.click(screen.getByRole("button", { name: /register/i }));

		expect(mockOnSubmit).toHaveBeenCalledWith({
			username: "charles",
			email: "charles@example.com",
			password: "mypassword",
		});

		expect(mockOnSubmit).toHaveBeenCalledTimes(1);
	});

	test("clears the form after submission", () => {
		const mockOnSubmit = jest.fn();
		render(<RegisterForm onSubmit={mockOnSubmit} />);

		const usernameInput = screen.getByLabelText(/username/i);
		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const button = screen.getByRole("button", { name: /register/i });

		fireEvent.change(usernameInput, {
			target: { value: "charles", name: "username" },
		});
		fireEvent.change(emailInput, {
			target: { value: "charles@example.com", name: "email" },
		});
		fireEvent.change(passwordInput, {
			target: { value: "mypassword", name: "password" },
		});

		fireEvent.click(button);

		expect(usernameInput.value).toBe("");
		expect(emailInput.value).toBe("");
		expect(passwordInput.value).toBe("");
	});
});
