import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <Topbar />
          <div className="p-4">{children}</div>
      </div>
    </div>
  );
}