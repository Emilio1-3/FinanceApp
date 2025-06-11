// src/components/Sidebar.tsx
import {
  FaHome, FaChartBar, FaWallet, FaCreditCard, FaBell, FaCog, FaSignOutAlt
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { icon: <FaHome />, label: "Home", path: "/dashboard" },
  { icon: <FaChartBar />, label: "Analytics", path: "/analytics"},
  { icon: <FaWallet />, label: "Wallet", path:"/wallet"},
  { icon: <FaCreditCard />, label: "Cards", path: "/cards" },
  { icon: <FaBell />, label: "Notifications", path:"/notifications"},
  { icon: <FaCog />, label: "Settings", path:"settings"},
];

export default function Sidebar({ setIsAuthenticated }: { setIsAuthenticated: (auth: boolean) => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="w-20 h-screen bg-white border-r flex flex-col justify-between items-center py-6">
      {/* Top Section - Menu */}
      <div className="flex flex-col items-center space-y-8">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`text-xl cursor-pointer ${
              location.pathname === item.path
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => navigate(item.path)}
            title={item.label}>
            {item.icon}
          </div>
        ))}
      </div>

      {/* Bottom Section - Logout */}
      <div 
        className="text-xl text-red-500 hover:text-red-700 cursor-pointer"
        onClick={handleLogout}
        title="sign Out"
        >
        <FaSignOutAlt />
      </div>
    </div>
  );
}
