import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import Analytics from './pages/Analytics';
import Wallet from './pages/Wallet';
import Cards from './pages/Cards';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import { useEffect, useState } from 'react';
import './index.css';
import type { AuthUser } from './types/user';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		() => !!localStorage.getItem('token')
	);
	const [user, setUser] = useState<AuthUser | null>(() => {
		const stored = localStorage.getItem('user');
		return stored ? JSON.parse(stored) : null;
	});

	useEffect(() => {
		const syncAuthState = () => {
			const token = localStorage.getItem('token');
			const storedUser = localStorage.getItem('user');
			setIsAuthenticated(!!token);
			setUser(storedUser ? JSON.parse(storedUser) : null);
		};
		window.addEventListener('storage', syncAuthState);
		return () => window.removeEventListener('storage', syncAuthState);
	}, []);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						isAuthenticated ? (
							<Navigate to="/dashboard" />
						) : (
							<AuthPage
								setIsAuthenticated={setIsAuthenticated}
								setUser={setUser}
							/>
						)
					}
				/>

				<Route
					path="/dashboard"
					element={
						isAuthenticated ? (
							<Layout
								setIsAuthenticated={setIsAuthenticated}
								user={user}
								setUser={setUser}>
								<Dashboard />
							</Layout>
						) : (
							<Navigate to="/" />
						)
					}
				/>

				<Route
					path="/analytics"
					element={
						isAuthenticated ? (
							<Layout
								setIsAuthenticated={setIsAuthenticated}
								user={user}
								setUser={setUser}>
								<Analytics />
							</Layout>
						) : (
							<Navigate to="/" />
						)
					}
				/>

				<Route
					path="/wallet"
					element={
						isAuthenticated ? (
							<Layout
								setIsAuthenticated={setIsAuthenticated}
								user={user}
								setUser={setUser}>
								<Wallet />
							</Layout>
						) : (
							<Navigate to="/" />
						)
					}
				/>

				<Route
					path="/cards"
					element={
						isAuthenticated ? (
							<Layout
								setIsAuthenticated={setIsAuthenticated}
								user={user}
								setUser={setUser}>
								<Cards />
							</Layout>
						) : (
							<Navigate to="/" />
						)
					}
				/>

				<Route
					path="/notifications"
					element={
						isAuthenticated ? (
							<Layout
								setIsAuthenticated={setIsAuthenticated}
								user={user}
								setUser={setUser}>
								<Notifications />
							</Layout>
						) : (
							<Navigate to="/" />
						)
					}
				/>

				<Route
					path="/settings"
					element={
						isAuthenticated ? (
							<Layout
								setIsAuthenticated={setIsAuthenticated}
								user={user}
								setUser={setUser}>
								<Settings />
							</Layout>
						) : (
							<Navigate to="/" />
						)
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
