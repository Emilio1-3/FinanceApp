import { useEffect, useMemo, useState } from 'react';
import {
	FaExchangeAlt,
	FaPaperPlane,
	FaArrowDown,
	FaArrowUp,
	FaChartLine,
	FaPiggyBank,
	FaShieldAlt,
	FaCoins,
} from 'react-icons/fa';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import CountUp from 'react-countup';
import type { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import visaLogo from '../assets/Visa_Logo.png';
import mastercardLogo from '../assets/Mastercard-logo.svg';
import chipImg from '../assets/emv-chip.jpg';
import wifiImg from '../assets/contactless symbol.webp';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Tooltip,
	Legend
);

const lineOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: { legend: { display: false } },
	scales: {
		y: {
			beginAtZero: true,
			ticks: { color: '#64748b' },
			grid: { color: '#e2e8f0' },
		},
		x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
	},
};

type CalValue = CalendarProps['value'];
type CalOnChange = CalendarProps['onChange'];

const cards = [
	{
		id: 1,
		bank: 'KCB Platinum',
		number: '1234 5678 9012 3456',
		name: 'Emilio Karuga',
		expiry: '12/27',
		balance: 5420.67,
		limit: 12000,
		currency: 'USD',
		status: 'Primary',
		type: 'visa',
		bgColor: 'from-violet-600/90 via-indigo-500 to-sky-500',
	},
	{
		id: 2,
		bank: 'Barclays Elite',
		number: '9876 5432 1098 7645',
		name: 'Emilio Karuga',
		expiry: '11/27',
		balance: 2378.11,
		limit: 8000,
		currency: 'USD',
		status: 'Travel',
		type: 'mastercard',
		bgColor: 'from-amber-500 via-orange-500 to-rose-500',
	},
];

const statHighlights = [
	{
		label: 'Net Worth',
		value: 48230,
		change: '+8.4%',
		positive: true,
		prefix: '$',
		icon: <FaChartLine className="text-indigo-300" />,
	},
	{
		label: 'Cash on Hand',
		value: 12500,
		change: '+$1,230',
		positive: true,
		prefix: '$',
		icon: <FaCoins className="text-emerald-300" />,
	},
	{
		label: 'Card Utilization',
		value: 32,
		suffix: '%',
		change: '-4.2%',
		positive: true,
		prefix: '',
		icon: <FaShieldAlt className="text-sky-300" />,
	},
];

const spendingBreakdown = [
	{
		label: 'Dining & Leisure',
		amount: 520,
		percent: 32,
		color: 'bg-indigo-500',
	},
	{ label: 'Transport', amount: 310, percent: 19, color: 'bg-emerald-500' },
	{ label: 'Subscriptions', amount: 210, percent: 13, color: 'bg-amber-500' },
	{ label: 'Wellness', amount: 160, percent: 10, color: 'bg-rose-500' },
];

const upcomingBills = [
	{ label: 'Rent - Highline Apartments', due: '4 days', amount: 980 },
	{ label: 'Apple Card Autopay', due: '8 days', amount: 245 },
	{ label: 'Internet - Zuku Fibre', due: '12 days', amount: 65 },
];

const transactions = [
	{
		name: 'Airbnb stay',
		type: 'Travel',
		amount: -185.5,
		time: 'Today • 13:20',
	},
	{ name: 'Uber', type: 'Transport', amount: -14.75, time: 'Today • 10:05' },
	{
		name: 'Spotify',
		type: 'Subscriptions',
		amount: -6.99,
		time: 'Yesterday • 22:10',
	},
	{ name: 'Salary', type: 'Income', amount: 4200, time: 'May 23 • 08:15' },
	{ name: 'Side Project', type: 'Income', amount: 860, time: 'May 20 • 18:42' },
];

const Dashboard = () => {
	const [date, setDate] = useState<NonNullable<CalValue>>(new Date());
	const handleChange: CalOnChange = (value) => {
		const single = Array.isArray(value) ? value[0] : value;
		if (single) setDate(single);
	};

	const [frontCardId, setFrontCardId] = useState(1);
	const [selectedTab, setSelectedTab] = useState<'All' | 'Expenses' | 'Income'>(
		'All'
	);
	const activeCard = cards.find((card) => card.id === frontCardId) ?? cards[0];
	const activeUtilization = Math.round(
		(activeCard.balance / activeCard.limit) * 100
	);
	const [userName, setUserName] = useState('there');

	useEffect(() => {
		const stored = localStorage.getItem('user');
		if (!stored) return;
		try {
			const parsed = JSON.parse(stored);
			if (parsed?.name) setUserName(parsed.name);
		} catch {
			// ignore
		}
	}, []);
	const firstName = userName.split(' ')[0] || 'there';

	const filteredTransactions = useMemo(
		() =>
			transactions.filter((txn) => {
				if (selectedTab === 'All') return true;
				if (selectedTab === 'Expenses') return txn.amount < 0;
				return txn.amount > 0;
			}),
		[selectedTab]
	);

	const pieData = {
		labels: ['Food', 'Transport', 'Entertainment'],
		datasets: [
			{
				data: [300, 150, 200],
				backgroundColor: ['#6366F1', '#10B981', '#F59E0B'],
				borderWidth: 0,
			},
		],
	};

	const lineData = {
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		datasets: [
			{
				label: 'Cash Flow',
				data: [520, 690, 420, 840, 610, 390, 760],
				borderColor: '#6366f1',
				backgroundColor: 'rgba(99, 102, 241, 0.12)',
				borderWidth: 3,
				tension: 0.5,
				fill: true,
				pointRadius: 0,
			},
		],
	};

	return (
		<div className="p-6 space-y-8">
			<section className="grid gap-6 xl:grid-cols-[2fr,1fr]">
				<div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-8 shadow-2xl overflow-hidden relative">
					<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom,_rgba(99,102,241,0.4),_transparent_55%)] pointer-events-none" />
					<div className="relative z-10">
						<div className="flex flex-wrap items-start justify-between gap-6">
							<div>
								<p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
									Liquid assets
								</p>
								<h2 className="mt-3 text-4xl font-semibold tracking-tight">
									<CountUp end={12500} prefix="$" separator="," decimals={2} />
								</h2>
								<p className="mt-1 text-base text-slate-200">
									Welcome back, {firstName}.
								</p>
								<p className="text-sm text-slate-300">
									In 4 accounts • last update 5 mins ago
								</p>
							</div>
							<div className="flex gap-3">
								<button className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/20 transition">
									<FaExchangeAlt />
									Transfer
								</button>
								<button className="flex items-center gap-2 rounded-full bg-white text-slate-900 px-5 py-2 text-sm font-semibold hover:bg-indigo-50 transition">
									<FaPaperPlane className="text-indigo-500" />
									Request
								</button>
							</div>
						</div>

						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							{statHighlights.map((stat) => (
								<div
									key={stat.label}
									className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner backdrop-blur-sm">
									<div className="flex items-center justify-between text-xs uppercase text-indigo-200 tracking-wide">
										<span>{stat.label}</span>
										{stat.icon}
									</div>
									<p className="mt-3 text-2xl font-semibold">
										{stat.prefix}
										<CountUp
											end={stat.value}
											suffix={stat.suffix}
											separator=","
										/>
									</p>
									<p
										className={`text-sm font-medium ${
											stat.positive ? 'text-emerald-300' : 'text-rose-300'
										}`}>
										{stat.change} vs last month
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-6 flex flex-col justify-between">
					<div>
						<div className="flex items-center justify-between">
							<h3 className="text-base font-semibold text-slate-900">
								Automations
							</h3>
							<span className="text-xs uppercase tracking-[0.2em] text-slate-400">
								Safe • On
							</span>
						</div>
						<p className="mt-1 text-sm text-slate-500">
							Smart saves, insurance and rainy-day fund are scheduled for this
							week.
						</p>
						<div className="mt-5 space-y-4">
							<div className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
								<div>
									<p className="text-sm font-semibold text-slate-900">
										Emergency fund sweep
									</p>
									<p className="text-xs text-slate-500">
										Every Friday • capped at $1,200
									</p>
								</div>
								<span className="text-sm font-semibold text-emerald-500">
									Active
								</span>
							</div>
							<div className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
								<div>
									<p className="text-sm font-semibold text-slate-900">
										Credit shield
									</p>
									<p className="text-xs text-slate-500">
										Keeps utilization below 35%
									</p>
								</div>
								<span className="text-sm font-semibold text-indigo-500">
									On track
								</span>
							</div>
						</div>
					</div>
					<div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-3 text-white flex items-center justify-between shadow-lg">
						<div>
							<p className="text-xs uppercase tracking-[0.25em] text-white/70">
								Savings pulse
							</p>
							<p className="text-lg font-semibold">
								<CountUp end={780} prefix="$" /> auto-saved
							</p>
							<p className="text-xs text-white/80">in the last 30 days</p>
						</div>
						<FaPiggyBank className="text-4xl text-white/70" />
					</div>
				</div>
			</section>

			<section className="grid gap-6 xl:grid-cols-[1.4fr,1fr]">
				<div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
					<div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs uppercase tracking-[0.3em] text-slate-400">
									Wallet
								</p>
								<h3 className="text-lg font-semibold text-slate-900">
									Signature cards
								</h3>
							</div>
							<button className="rounded-full border border-slate-200 px-4 py-1 text-xs font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600">
								New card
							</button>
						</div>
						<div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr,0.8fr] items-center">
							<div className="relative h-[320px] flex items-center justify-center">
								{cards.map((card, index) => {
									const isActive = frontCardId === card.id;
									const spread = 46;
									const centeredOffset =
										(index - (cards.length - 1) / 2) * spread;
									return (
										<div
											key={card.id}
											className={`absolute w-[380px] max-w-full rounded-[36px] shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-r ${card.bgColor}`}
											style={{
												fontFamily: 'OCR A Std, monospace',
												transform: `translateX(${centeredOffset}px) translateY(${
													isActive ? 0 : Math.abs(centeredOffset) / 3
												}px) scale(${isActive ? 1.05 : 0.9}) rotate(${
													isActive ? 0 : centeredOffset < 0 ? -5 : 5
												}deg)`,
												zIndex: isActive ? 50 : 40 - index,
											}}
											onClick={() => setFrontCardId(card.id)}>
											<div className="flex items-center justify-between px-6 pt-6 text-white/80 text-sm">
												<span>{card.bank}</span>
												<span className="rounded-full border border-white/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
													{card.status}
												</span>
											</div>
											<div className="flex justify-between px-6 pt-6">
												<img
													src={chipImg}
													alt="chip"
													className="w-12 h-9 object-contain"
												/>
												<img
													src={wifiImg}
													alt="wifi"
													className="w-9 h-9 object-contain opacity-80"
												/>
											</div>
											<p className="mt-6 px-6 text-3xl tracking-[0.35em] text-white">
												{card.number}
											</p>
											<div className="mt-8 grid grid-cols-3 gap-4 px-6 text-white/90 text-xs">
												<div>
													<p className="text-[10px] uppercase tracking-[0.2em]">
														Cardholder
													</p>
													<p className="text-sm">{card.name}</p>
												</div>
												<div>
													<p className="text-[10px] uppercase tracking-[0.2em]">
														Valid
													</p>
													<p className="text-sm">{card.expiry}</p>
												</div>
												<div className="text-right">
													<p className="text-[10px] uppercase tracking-[0.2em]">
														Balance
													</p>
													<p className="text-sm font-semibold">
														<CountUp
															end={card.balance}
															prefix="$"
															separator=","
															decimals={2}
														/>
													</p>
												</div>
											</div>
											<img
												src={card.type === 'visa' ? visaLogo : mastercardLogo}
												alt={card.type}
												className="absolute bottom-6 right-7 w-16 object-contain"
											/>
										</div>
									);
								})}
							</div>

							<div className="space-y-4">
								<div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/40">
									<p className="text-xs uppercase tracking-[0.3em] text-slate-400">
										Card overview
									</p>
									<p className="mt-1 text-lg font-semibold text-slate-900">
										{activeCard.bank}
									</p>
									<p className="text-sm text-slate-500">{activeCard.number}</p>
									<div className="mt-4 space-y-3 text-sm text-slate-600">
										<div className="flex items-center justify-between">
											<span>Available credit</span>
											<span className="font-semibold text-slate-900">
												<CountUp
													end={activeCard.limit - activeCard.balance}
													prefix="$"
													separator=","
													decimals={0}
												/>
											</span>
										</div>
										<div>
											<div className="flex items-center justify-between text-xs text-slate-500 mb-1">
												<span>Utilization</span>
												<span>{activeUtilization}%</span>
											</div>
											<div className="h-1.5 rounded-full bg-slate-200">
												<div
													className="h-full rounded-full bg-indigo-500"
													style={{ width: `${activeUtilization}%` }}
												/>
											</div>
										</div>
										<div className="flex items-center justify-between">
											<span>Billing cycle</span>
											<span className="font-medium text-slate-900">
												15 days left
											</span>
										</div>
									</div>
								</div>

								<div className="space-y-3">
									{cards.map((card) => {
										const utilization = Math.round(
											(card.balance / card.limit) * 100
										);
										const isActive = card.id === frontCardId;
										return (
											<button
												key={card.id}
												onClick={() => setFrontCardId(card.id)}
												className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
													isActive
														? 'border-indigo-300 bg-indigo-50 shadow-sm'
														: 'border-slate-200 hover:border-indigo-200'
												}`}>
												<p className="text-sm font-semibold text-slate-900">
													{card.bank}
												</p>
												<p className="text-xs text-slate-500">
													{card.status} • {card.type}
												</p>
												<div className="mt-2 flex items-center justify-between text-xs text-slate-600">
													<span>
														<CountUp
															end={card.balance}
															prefix="$"
															separator=","
															decimals={0}
														/>
													</span>
													<span>Limit ${card.limit.toLocaleString()}</span>
												</div>
												<div className="mt-2 h-1 rounded-full bg-slate-200">
													<div
														className={`h-full rounded-full ${
															isActive ? 'bg-indigo-500' : 'bg-slate-400'
														}`}
														style={{ width: `${utilization}%` }}
													/>
												</div>
											</button>
										);
									})}
								</div>
							</div>
						</div>
					</div>
					<div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-100 flex flex-col gap-6">
						<div>
							<h3 className="text-base font-semibold text-slate-900">
								Budget Snapshot
							</h3>
							<p className="text-sm text-slate-500">Month-to-date cash flow</p>
						</div>
						<div className="space-y-4">
							<div className="rounded-2xl border border-slate-100 p-4">
								<div className="flex items-center justify-between text-sm text-slate-500">
									<span className="flex items-center gap-2 font-medium text-slate-700">
										<FaArrowUp className="text-emerald-500" /> Income
									</span>
									<span className="font-semibold text-slate-900">
										<CountUp end={6400} prefix="$" separator="," decimals={0} />
									</span>
								</div>
								<div className="mt-3 h-2 rounded-full bg-slate-100">
									<div className="h-full w-[78%] rounded-full bg-emerald-400" />
								</div>
							</div>
							<div className="rounded-2xl border border-slate-100 p-4">
								<div className="flex items-center justify-between text-sm text-slate-500">
									<span className="flex items-center gap-2 font-medium text-slate-700">
										<FaArrowDown className="text-rose-500" /> Expenses
									</span>
									<span className="font-semibold text-slate-900">
										<CountUp end={3140} prefix="$" separator="," decimals={0} />
									</span>
								</div>
								<div className="mt-3 h-2 rounded-full bg-slate-100">
									<div className="h-full w-[49%] rounded-full bg-rose-400" />
								</div>
							</div>
						</div>
						<div className="rounded-2xl border border-dashed border-slate-200 p-4">
							<p className="text-xs uppercase tracking-[0.3em] text-slate-400">
								Upcoming payments
							</p>
							<div className="mt-3 space-y-3">
								{upcomingBills.map((bill) => (
									<div
										key={bill.label}
										className="flex items-center justify-between text-sm">
										<div>
											<p className="font-medium text-slate-800">{bill.label}</p>
											<p className="text-xs text-slate-500">
												due in {bill.due}
											</p>
										</div>
										<p className="text-sm font-semibold text-slate-900">
											<CountUp end={bill.amount} prefix="$" separator="," />
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col">
					<h3 className="text-lg font-semibold text-slate-900">Scheduler</h3>
					<p className="text-sm text-slate-500 mb-4">
						Sync your cash calendar with autopay
					</p>
					<div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
						<Calendar
							selectRange={false}
							onChange={handleChange}
							value={date}
							showNeighboringMonth={false}
							className="w-full border-none bg-white rounded-2xl p-2"
						/>
					</div>
				</div>
			</section>

			<section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
				<div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div>
							<h3 className="text-lg font-semibold text-slate-900">
								Spending analytics
							</h3>
							<p className="text-sm text-slate-500">
								Last 7 days cash flow & breakdown
							</p>
						</div>
						<div className="flex rounded-full border border-slate-200 p-1 text-xs font-medium">
							{['Daily', 'Weekly', 'Monthly'].map((range) => (
								<button
									key={range}
									className={`rounded-full px-3 py-1 ${
										range === 'Weekly'
											? 'bg-indigo-600 text-white shadow'
											: 'text-slate-500'
									}`}>
									{range}
								</button>
							))}
						</div>
					</div>
					<div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr,1fr]">
						<div className="h-64">
							<Line data={lineData} options={lineOptions} />
						</div>
						<div className="rounded-2xl border border-slate-100 p-4 bg-slate-50/40">
							<div className="h-48 flex items-center justify-center">
								<Pie data={pieData} />
							</div>
							<div className="mt-4 space-y-3">
								{spendingBreakdown.map((item) => (
									<div
										key={item.label}
										className="flex items-center justify-between text-sm">
										<div className="flex items-center gap-3">
											<span className={`h-2 w-2 rounded-full ${item.color}`} />
											<p className="font-medium text-slate-700">{item.label}</p>
										</div>
										<div className="text-right text-slate-600">
											<p className="font-semibold">
												<CountUp end={item.amount} prefix="$" />
											</p>
											<p className="text-xs text-slate-400">
												{item.percent}% of spend
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-slate-900">
							Recent activity
						</h3>
						<div className="flex gap-2 rounded-full border border-slate-200 p-1 text-xs font-medium">
							{['All', 'Expenses', 'Income'].map((tab) => (
								<button
									key={tab}
									className={`rounded-full px-3 py-1 ${
										selectedTab === tab
											? 'bg-indigo-600 text-white shadow'
											: 'text-slate-500'
									}`}
									onClick={() => setSelectedTab(tab as typeof selectedTab)}>
									{tab}
								</button>
							))}
						</div>
					</div>
					<ul className="mt-6 space-y-3">
						{filteredTransactions.map((txn, index) => (
							<li
								key={index}
								className="rounded-2xl border border-slate-100 px-4 py-3 flex items-center justify-between">
								<div>
									<p className="text-sm font-semibold text-slate-900">
										{txn.name}
									</p>
									<p className="text-xs text-slate-500">{txn.time}</p>
								</div>
								<div className="text-right">
									<p
										className={`text-sm font-semibold ${
											txn.amount < 0 ? 'text-rose-500' : 'text-emerald-500'
										}`}>
										{txn.amount < 0
											? `-$${Math.abs(txn.amount).toFixed(2)}`
											: `+$${txn.amount.toFixed(2)}`}
									</p>
									<span className="text-xs text-slate-400">{txn.type}</span>
								</div>
							</li>
						))}
						{filteredTransactions.length === 0 && (
							<li className="text-center text-sm text-slate-400 py-6 rounded-2xl border border-dashed border-slate-200">
								No {selectedTab.toLowerCase()} transactions.
							</li>
						)}
					</ul>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
