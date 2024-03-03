import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/features/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setLoading(false));
	}, []);

	return !loading ? (
		<div>
			<Header />
			<main>
				<h1 className="text-3xl font-bold underline">Hello world!</h1>
				<Outlet />
			</main>
			<Footer />
		</div>
	) : (
		<div>Loading...</div>
	);
}

export default App;
