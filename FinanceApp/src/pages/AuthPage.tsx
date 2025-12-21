import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import type { AuthUser } from '../types/user';

interface AuthPageProps {
	setIsAuthenticated: (auth: boolean) => void;
	setUser: (user: AuthUser | null) => void;
}

export default function AuthPage({
	setIsAuthenticated,
	setUser,
}: AuthPageProps) {
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch(
				`http://localhost:5000/api/auth/${isSignUp ? 'register' : 'login'}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password, ...(isSignUp && { name }) }),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.message || 'Authentication failed.');
			} else {
				localStorage.setItem('token', data.token);
				localStorage.setItem('user', JSON.stringify(data.user));
				setIsAuthenticated(true);
				setUser(data.user);
				toast.success(
					`${isSignUp ? 'Sign Up' : 'Login'} successful! Redirecting...`,
					{
						position: 'top-right',
						autoClose: 2000,
					}
				);

				setTimeout(() => {
					navigate('/dashboard');
				}, 2200);
			}
		} catch (error) {
			toast.error('Server error.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
			<motion.div
				className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
					{isSignUp ? 'Create an Account' : 'Welcome Back'}
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					{isSignUp && (
						<input
							type="text"
							placeholder="Name"
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					)}

					<input
						type="email"
						placeholder="Email"
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<input
						type="password"
						placeholder="password"
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<button
						type="submit"
						disabled={loading}
						className={`w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${
							loading
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-blue-600 hover:bg-blue-700'
						}`}>
						{loading ? 'loading...' : isSignUp ? 'Sign Up' : 'Login'}
					</button>
				</form>

				<p className="text-sm text-center mt-4 text-gray-500">
					{isSignUp ? 'Already have an account?' : "Don't have an account?"}
					{''}
					<span
						onClick={() => setIsSignUp(!isSignUp)}
						className="text-blue-600 cursor-pointer hover:underline">
						{isSignUp ? 'Login here' : 'Sign up'}
					</span>
				</p>
			</motion.div>

			<ToastContainer position="top-right" autoClose={3000} />
		</div>
	);
}
