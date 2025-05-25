// src/components/Sidebar.tsx
import {
  FaHome, FaChartBar, FaWallet, FaCreditCard, FaBell, FaCog, FaSignOutAlt
} from "react-icons/fa";

const menuItems = [
  { icon: <FaHome />, label: "Home" },
  { icon: <FaChartBar />, label: "Analytics" },
  { icon: <FaWallet />, label: "Wallet" },
  { icon: <FaCreditCard />, label: "Cards" },
  { icon: <FaBell />, label: "Notifications" },
  { icon: <FaCog />, label: "Settings" },
];

export default function Sidebar() {
  return (
    <div className="w-20 h-screen bg-white border-r flex flex-col justify-between items-center py-6">
      {/* Top Section - Menu */}
      <div className="flex flex-col items-center space-y-8">
        {menuItems.map((item, index) => (
          <div key={index} className="text-xl text-gray-600 hover:text-blue-500 cursor-pointer">
            {item.icon}
          </div>
        ))}
      </div>

      {/* Bottom Section - Logout */}
      <div className="text-xl text-red-500 hover:text-red-700 cursor-pointer">
        <FaSignOutAlt />
      </div>
    </div>
  );
}
