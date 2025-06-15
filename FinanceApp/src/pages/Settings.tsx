import { FiUser, FiLock, FiBell, FiChevronRight } from "react-icons/fi";

export default function Settings() {
  const settings = [
    {
      title: "Account",
      description: "Manage your account information",
      icon: <FiUser className="text-blue-600 text-xl" />,
      action: () => alert("Navigate to Account Settings"),
    },
    {
      title: "Security",
      description: "Change password or enable 2FA",
      icon: <FiLock className="text-green-600 text-xl" />,
      action: () => alert("Navigate to Security Settings"),
    },
    {
      title: "Notifications",
      description: "Customize notifications preferences",
      icon: <FiBell className="text-yellow-600 text-xl" />,
      action: () => alert("Navigate to Notification Settings"),
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow-md divide-y">
        {settings.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition"
            onClick={item.action}
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-full">{item.icon}</div>
                <div>
                  <h2 className="text-md font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
            </div>
            <FiChevronRight className="text-gray-400" />
            </div>
        ))}
      </div>
    </div>
  );
}