import { useState } from "react";

const dummyNotifications = [
  { id: 1, message: "Welcome to the app!", read: false },
  { id: 2, message: "Your balance was updated.", read: false },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const markAsRead = (id: number) => {
    setNotifications((prev) => 
      prev.map((n) => 
      n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={'p-4 rounded shadow ${n.read ? "bg-gray-100" : "bg-white"}'}
              >
                <div className="flex justify-between items-center">
                  <p>{n.message}</p>
                  {!n.read && (
                    <button
                    onClick={() => markAsRead(n.id)}
                    className="text-sm text-blue-600">
                      Mark as Read
                    </button>
                  )}
                </div>
              </li>
          ))}
        </ul>
      )}
    </div>
  );


}