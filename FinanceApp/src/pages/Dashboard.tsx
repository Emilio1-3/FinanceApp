// imports
import { useState } from "react";
import {
  FaExchangeAlt,
  FaPaperPlane,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import visaLogo from "../assets/Visa_Logo.png";
import mastercardLogo from "../assets/Mastercard-logo.svg";
import chipImg from "../assets/emv-chip.jpg";
import wifiImg from "../assets/contactless symbol.webp";

// chart registration
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

// chart data
const pieData = {
  labels: ["Food", "Transport", "Entertainment"],
  datasets: [
    {
      data: [300, 150, 200],
      backgroundColor: ["#6366F1", "#10B981", "#F59E0B"],
    },
  ],
};

const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Spending ($)",
      data: [120, 190, 220, 140, 180, 90, 160],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      tension: 0.4,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } },
};

// data
type CalValue = CalendarProps["value"];
type CalOnChange = CalendarProps["onChange"];

const cards = [
  {
    id: 1,
    bank: "KCB",
    number: "1234 5678 9012 3456",
    name: "Emilio Karuga",
    expiry: "12/27",
    type: "visa",
    bgColor: "bg-gradient-to-r from-indigo-500 to-blue-600",
  },
  {
    id: 2,
    bank: "BARCLAYS",
    number: "9876 5432 1098 7645",
    name: "Emilio Karuga",
    expiry: "11/27",
    type: "mastercard",
    bgColor: "bg-gradient-to-r from-yellow-500 to-orange-600",
  },
];

const transactions = [
  { name: "KFC", type: "Food", amount: -15.0, time: "Today, 1:35 PM" },
  { name: "Uber", type: "Transport", amount: -8.5, time: "Today, 11:10 AM" },
  { name: "Spotify", type: "Entertainment", amount: -6.99, time: "Yesterday, 9:45 PM" },
  { name: "Salary", type: "Income", amount: 2000, time: "May 23, 2:00 PM" },
  { name: "Freelance Project", type: "Income", amount: 500, time: "May 20, 5:00 PM" },
];

// component
const Dashboard = () => {
  const [date, setDate] = useState<NonNullable<CalValue>>(new Date());
  const handleChange: CalOnChange = (value) => {
    const single = Array.isArray(value) ? value[0] : value;
    if (single) setDate(single);
  };

  const [frontCardId, setFrontCardId] = useState(1);
  const [selectedTab, setSelectedTab] = useState("All");

  const filteredTransactions = transactions.filter((txn) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Expenses") return txn.amount < 0;
    if (selectedTab === "Income") return txn.amount > 0;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Balance and buttons */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-gray-500 text-sm uppercase mb-2">Total Balance</h2>
        <p className="text-3xl font-semibold text-gray-800 mb-6">$12,500.00</p>
        <div className="flex gap-4">
          <div className="flex-1 bg-gray-100 p-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-400 cursor-pointer">
            <FaExchangeAlt className="text-xl text-blue-600" />
            <span className="font-medium">Transfer</span>
          </div>
          <div className="flex-1 bg-gray-100 p-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-400 cursor-pointer">
            <FaPaperPlane className="text-xl text-green-600" />
            <span className="font-medium">Request</span>
          </div>
        </div>
      </div>

      {/* Cards and Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cards */}
        <div className="bg-white p-4 rounded-xl shadow-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Cards</h2>
            <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
              <p className="text-xl font-bold">+</p>
            </button>
          </div>
          <div className="relative h-[220px] w-full justify-center items-center">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`absolute w-[300px] h-[180px] rounded-xl text-white shadow-lg transform transition-all duration-500 cursor-pointer ${
                  frontCardId === card.id ? "z-10 scale-90" : "z-20 scale-100 translate-x-8 translate-y-14"
                } ${card.bgColor}`}
                onClick={() => setFrontCardId(card.id)}
                style={{ fontFamily: "OCR A Std, monospace" }}
              >
                <div className="flex justify-between px-4 pt-4">
                  <img src={chipImg} alt="chip" className="w-8 h-6 object-contain" />
                  <img src={wifiImg} alt="wifi" className="w-6 h-6 object-contain" />
                </div>
                <div className="px-4 pt-6 text-xl tracking-widest">{card.number}</div>
                <div className="flex justify-between items-end px-4 pt-6 text-sm" style={{ fontFamily: "OCR B Std, monospace" }}>
                  <div>
                    <div className="text-xs">VALID THRU</div>
                    {card.expiry}
                  </div>
                  <div className="text-base">{card.name}</div>
                </div>
                <div className="absolute bottom-2 right-2 w-[35px] h-[35px]">
                  <img src={card.type === "visa" ? visaLogo : mastercardLogo} alt={card.type} className="object-contain w-full h-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white p-6 rounded-xl shadow-md h-80">
          <h2 className="text-gray-700 text-lg font-semibold mb-4">Budget</h2>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium flex items-center space-x-2">
                  <FaArrowUp className="text-green-500" />
                  <span>Income</span>
                </td>
                <td className="py-2 text-green-600 font-semibold">$3,200</td>
              </tr>
              <tr>
                <td className="py-2 font-medium flex items-center space-x-2">
                  <FaArrowDown className="text-red-500" />
                  <span>Expenses</span>
                </td>
                <td className="py-2 text-red-600 font-semibold">-$1,400</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calendar */}
        <div className="bg-white p-6 rounded-xl shadow-md h-80 flex flex-col">
          <h2 className="text-gray-700 text-lg font-semibold mb-4">Scheduler</h2>
          <div className="flex-1 overflow-auto">
            <Calendar
              selectRange={false}
              onChange={handleChange}
              value={date}
              showNeighboringMonth={false}
              className="w-full border-none text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Spending Breakdown with Pie + Line */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full">
        <h2 className="text-lg font-semibold mb-4">Spending Chart</h2>
        <div className="flex flex-col md:flex-row gap-6 h-80">
          <div className="w-full md:w-1/2">
            <Pie data={pieData} />
          </div>
          <div className="w-full md:w-1/2">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white p-4 rounded-xl shadow-md w-full">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="flex space-x-4 mb-4">
          {["All", "Expenses", "Income"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1 text-sm font-medium rounded-full border ${
                selectedTab === tab ? "bg-blue-500 text-white border-blue-500" : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <ul className="divide-y divide-gray-200 text-sm">
          {filteredTransactions.map((txn, index) => (
            <li key={index} className="py-2 flex justify-between items-center">
              <div>
                <p className="font-medium">{txn.name}</p>
                <p className="text-xs text-gray-500">{txn.time}</p>
              </div>
              <span className={`font-semibold ${txn.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                {txn.amount < 0 ? `-$${Math.abs(txn.amount).toFixed(2)}` : `+$${txn.amount.toFixed(2)}`}
              </span>
            </li>
          ))}
          {filteredTransactions.length === 0 && (
            <li className="text-gray-500 text-sm py-4 text-center">No {selectedTab.toLowerCase()} transactions.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
