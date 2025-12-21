import { useLocation } from 'react-router-dom';
import type { AuthUser } from '../types/user';

const pageTitles: Record<string, string> = {
	'/dashboard': 'Dashboard',
	'/analytics': 'Analytics',
	'/wallet': 'Wallet',
	'/cards': 'Cards',
	'/notifications': 'Notifications',
	'/settings': 'Settings',
};

const formatDate = () =>
	new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	}).format(new Date());

const getGreeting = () => {
	const hour = new Date().getHours();

	if (hour < 12) return 'Good morning';
	if (hour < 18) return 'Good afternoon';
	return 'Good evening';
};

interface TopbarProps {
	user: AuthUser | null;
}

export default function Topbar({ user }: TopbarProps) {
	const location = useLocation();
	const pageTitle = pageTitles[location.pathname] || 'Page';
	const greeting = getGreeting();
	const today = formatDate();
	const firstName = user?.name?.split(' ')[0] ?? 'there';
	const initials = user?.name
		? user.name
				.split(' ')
				.map((part) => part[0])
				.join('')
				.slice(0, 2)
				.toUpperCase()
		: 'HI';

	return (
		<header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur">
			<div className="flex items-center justify-between gap-6 px-6 py-4">
				<div className="space-y-1">
					<div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-indigo-500">
						<span className="h-px w-5 bg-indigo-500/30" />
						<span>{today}</span>
					</div>
					<div>
						<h1 className="text-2xl font-semibold text-gray-900">
							{pageTitle}
						</h1>
						<p className="text-sm text-gray-500">
							{greeting}, {firstName} — stay on top of your finances.
						</p>
					</div>
				</div>

				<div className="flex flex-1 items-center justify-end gap-4">
					<div className="hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 shadow-inner focus-within:border-indigo-300 focus-within:bg-white focus-within:text-gray-700 md:flex">
						<svg
							className="h-4 w-4 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-4.35-4.35m0 0A6.65 6.65 0 1010 16.65a6.65 6.65 0 006.65-6.65z"
							/>
						</svg>
						<input
							type="text"
							placeholder="Search reports, cards, wallets..."
							className="w-full bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
						/>
					</div>

					<button className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-indigo-300 hover:text-indigo-600">
						<span>Quick Actions</span>
						<svg
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 5v14m7-7H5"
							/>
						</svg>
					</button>

					<div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm">
						<div className="text-right">
							<p className="text-sm font-semibold text-gray-900">
								{user?.name ?? 'Guest'}
							</p>
							<p className="text-xs text-gray-500">
								{user?.email ?? 'Welcome back'}
							</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-center text-sm font-semibold uppercase text-white leading-10">
							{initials}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
