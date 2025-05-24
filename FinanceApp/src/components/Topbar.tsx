export default function Topbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
    <div>
      <h1 className="text-2x1 font-semibold">Dashboard</h1>
      <p className="text-gray-500 text-sm">Welcome Emilio</p>
    </div>
    <div className="text-right">
      <span className="text-gray-700 font-medium">Emilio K</span>
    </div>
    </div>
  );
}