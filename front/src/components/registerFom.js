import React, { useState } from "react";

export const RegisterForm = ({ onSubmit }) => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit(form);
		}
		setForm({ username: "", email: "", password: "" });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>
					Username:
					<input
						type='text'
						name='username'
						value={form.username}
						onChange={handleChange}
						required
						autoComplete='username'
					/>
				</label>
			</div>
			<div>
				<label>
					Email:
					<input
						type='email'
						name='email'
						value={form.email}
						onChange={handleChange}
						required
						autoComplete='email'
					/>
				</label>
			</div>
			<div>
				<label>
					Password:
					<input
						type='password'
						name='password'
						value={form.password}
						onChange={handleChange}
						required
						autoComplete='new-password'
					/>
				</label>
			</div>
			<button type='submit'>Register</button>
		</form>
	);
};
