import Sidebar from './Sidebar';
import Topbar from './Topbar';
import type { AuthUser } from '../types/user';

interface LayoutProps {
	children: React.ReactNode;
	setIsAuthenticated: (auth: boolean) => void;
	user: AuthUser | null;
	setUser: (user: AuthUser | null) => void;
}

export default function Layout({
	children,
	setIsAuthenticated,
	user,
	setUser,
}: LayoutProps) {
	return (
		<div className="flex h-screen">
			<Sidebar setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
			<div className="flex-1 flex flex-col overflow-auto bg-gray-50">
				<Topbar user={user} />
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
}
