import {
  FaHome, FaChartBar, FaWallet, FaCreditCard, FaBell, FaCog, FaSignOutAlt
} from "react-icons/fa";

const menuItems = [
  { icon: <FaHome />, label: "Home"},
  { icon: <FaChartBar />, label: "Analytics"},
  { icon: <FaWallet />, label: "Wallet"},
  { icon: <FaCreditCard />, label: "Cards"},
  { icon: <FaBell />, label: "Notifications"},
  { icon: <FaCog />, label: "settings"},
];

export default function Sidebar() {
  return (
    <div className="w-20 h-screen bg-white border-r flex-col justify-between items-center py-6">
      <div className="space-y-8">
        {menuItems.map((item, index) => (
          <div key={index} className="text-xl text-gray-600 hover:text-blue-500 cursor-pointer">
            {item.icon}
          </div>
        ))}
      </div>
      <div className="text-xl text-red-500 hover:text-red-700 cursor-pointer">
      <FaSignOutAlt />
      </div>
    </div>
  );
}