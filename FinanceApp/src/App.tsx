import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import './index.css';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <Topbar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;