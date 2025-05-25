import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Calendar, { type CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

type CalValue = CalendarProps["value"];
type CalOnChange = CalendarProps["onChange"];

const pieData = [
  { name: "Food", value: 450},
  { name: "Transport", value: 120 },
  { name: "Entertainment", value: 300 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];
export default function Dashboard() {
  const [date, setDate] = useState<NonNullable<CalValue>>(new Date());

  const handleChange: CalOnChange = (value) => {
    const single = Array.isArray(value) ? value[0] : value;
    if (single) setDate(single);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Balance and summary cards*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500 text-sm">Total Balance</h2>
          <p className="text-2x1 font-semibold text-gray-800 mt-2">$12,500.00</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500 text-sm">Income</h2>
          <p className="text-xl text-green-500 font-semibold mt-2">+$3,200.00</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500 text-sm">Expenses</h2>
          <p className="text-xl text-red-500 font-semibold mt-2">-$1,400.00</p>
        </div>
      </div>

      {/*cards and calendar*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/*bank cards*/}
        <div className="bg-white p-6 rounded-xl shadow-md h-80"></div>

        {/*budget*/}
        <div className="bg-white p-6 rounded-xl shadow-md h-80"></div>

        {/*calendar*/}
        <div className="bg-white p-6 rounded-xl shadow-md h-80 flex flex-col">
          <h2 className="text-gray-700 dark:text-gray-900 text-lg font-semibold mb-4">
            Scheduler
          </h2>
          <div className="flex-1 overflow-auto">
          <Calendar
          selectRange={false}
          onChange={handleChange}
          value={date}
          showNeighboringMonth={false}
          className="w-full border-none text-gray-800 dark:text-gray-800" />
          </div>
        </div>
      </div>

      {/* Spending Breakdown*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
        {/* placeholder chart card */}
         <div className="bg-white dark:bg-gray-200 p-6 rounded-xl shadow-md h-80">
          <h2 className="text-lg font-semibold mb-4">Spending Chart</h2>
        {/* Make it responsive */}
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie 
                data={pieData}
                cx="35%"
                cy="50%"
                outerRadius={70}
                labelLine={false}
                label={({ name, percent }) => 
                  `${name}: ${(percent! * 100). toFixed(0)}%`
                }
                dataKey="value"
              >
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value}`} />

                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="square"
                  wrapperStyle={{ right: 0, top: 0, lineHeight: "24px" }} 
                ></Legend>
            </PieChart>
        </ResponsiveContainer>
    </div>

        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-gray-700 text-lg font-semibold mb-4">Spending Categories</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Food & Groceries</span>
              <span>$450</span>
            </li>
            <li className="flex justify-between">
              <span>Transport</span>
              <span>$120</span>
            </li>
            <li className="flex justify-between">
              <span>Entertainment</span>
              <span>$300</span>
            </li>
            <li className="flex justify-between font-semibold text-gray-700">
              <span>Total</span>
              <span>$870</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}