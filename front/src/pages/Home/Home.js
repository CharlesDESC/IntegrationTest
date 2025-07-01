import React, { useState, useEffect } from "react";

export const Home = () => {
	const [usersCount, setUsersCount] = useState([]);
	const [users, setUsers] = useState([]);
	const port = process.env.REACT_APP_SERVER_PORT;

	useEffect(() => {
		async function countUsers() {
			try {
				const response = await fetch(`http://localhost:${port}/users/public`);
				const data = await response.json();
				setUsersCount(data.utilisateurs.length);
				setUsers(data.utilisateurs);
			} catch (error) {
				console.error("Error fetching user count:", error);
			}
		}
		countUsers();
	}, []);
	return (
		<header className='App-header'>
			<h1>Users manager</h1>
			<p>Total users: {usersCount}</p>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.username}</li>
				))}
			</ul>
		</header>
	);
};
