import CountUp from 'react-countup';

export default function  Wallet() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/*balance*/}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500 mb-2">Available Balance</p>
          <h2 className="text-3xl font-bold text-blue-600">
            <CountUp end={8750.45} duration={2.5} prefix="$" separator="," decimals={2} />
          </h2>
        </div>

        {/*income*/}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500 mb-2">Monthly Income</p>
          <h2 className="text-3xl font-bold text-green-500">
            <CountUp end={4300} duration={2.5} prefix="$" separator="," decimals={2} />
          </h2>
        </div>

        {/*expenses*/}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500 mb-2">Monthly Expenses</p>
          <h2 className="text-3xl font-bold text-red-500">
            <CountUp end={1950} duration={2.5} prefix="$" separator="," decimals={2} />
          </h2>
        </div>
      </div>

      {/*wallet details*/}
      <div className="bg-white mt-8 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h3>
        <ul className="space-y-4">

          <li className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Payment from John Doe</span>
            <span className="text-green-600  font-medium">
              +<CountUp end={500} duration={2.5} prefix="$" separator="," decimals={2} />
            </span>
          </li>

          <li className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Grocery Shopping</span>
            <span className="text-red-500 font-medium">
              -<CountUp end={120} duration={2.5} prefix="$" separator="," decimals={2} />
            </span>
          </li>

          <li className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Electricity Bill</span>
            <span className="text-red-500 font-medium">
              -<CountUp end={85} duration={2.5} prefix="$" separator="," decimals={2} />
            </span>
          </li>

        </ul>
      </div>
    </div>
  );
}