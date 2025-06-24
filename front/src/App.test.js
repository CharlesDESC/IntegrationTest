import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App component", () => {
	it("affiche les liens de navigation", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText("Accueil")).toBeInTheDocument();
		expect(screen.getByText("S'inscrire")).toBeInTheDocument();
		expect(screen.getByText("Utilisateurs")).toBeInTheDocument();
	});

	it("affiche la page d'accueil par défaut", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText(/accueil/i)).toBeInTheDocument();
	});

	it("affiche la page d'inscription", () => {
		render(
			<MemoryRouter initialEntries={["/register"]}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText(/inscription/i)).toBeInTheDocument();
	});

	it("affiche la page des utilisateurs", () => {
		render(
			<MemoryRouter initialEntries={["/users"]}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText(/utilisateur/i)).toBeInTheDocument();
	});
});
