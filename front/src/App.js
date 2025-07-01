import "./App.css";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Users } from "./pages/Users";
import { Routes, Route, Link } from "react-router-dom";

function App() {
	return (
		<div className='App'>
			<nav>
				<ul>
					<li>
						<Link to='/IntegrationTest'>Accueil</Link>
					</li>
					<li>
						<Link to='/register'>S'inscrire</Link>
					</li>
					<li>
						<Link to='/users'>Utilisateurs</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path='/IntegrationTest' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/users' element={<Users />} />
			</Routes>
		</div>
	);
}

export default App;
