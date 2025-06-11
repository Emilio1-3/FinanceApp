import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function Layout({ children, setIsAuthenticated  }: { children: React.ReactNode; setIsAuthenticated: (auth: boolean) => void  }) {
  return (
    <div className="flex h-screen">
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <Topbar />
          <div className="p-4">{children}</div>
      </div>
    </div>
  );
}