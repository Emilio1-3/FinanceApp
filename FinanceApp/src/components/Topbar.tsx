import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/analytics": "Analytics",
  "/wallet": "Wallet",
  "/cards": "Cards",
  "/notifications": "Notifications",
  "/settings": "Settings",
};

export default function Topbar() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Page";

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
    <div>
      <h1 className="text-2xl font-semibold">{pageTitle}</h1>
      <p className="text-gray-500 text-sm">Welcome Emilio</p>
    </div>
    <div className="text-right">
      <span className="text-gray-700 font-medium">Emilio K</span>
    </div>
    </div>
  );
}