import { admin_route_config } from '@/constants/routes.constants';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const sidebar_links = admin_route_config;

  return (
    <div>
      <div className="border-b border-b-athens-gray-100 p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 overflow-hidden">
            <img
              className="size-full object-contain"
              src="/public/hekto-logo.png"
              alt="Hekto Logo"
            />
          </div>
          <h2 className="text-3xl font-bold text-h-black">Hekto</h2>
        </Link>
      </div>
      {/* Profile Navigation Links */}
      <div className="space-y-2">
        {sidebar_links
          ?.filter((config) => config.label && config.icon)
          ?.map(({ label, icon: Icon, path }) => {
            return (
              <NavLink
                key={path}
                className={({ isActive }) =>
                  cn(
                    'group rounded-md px-3 py-2.5 flex items-center gap-2 text-athens-gray-600 transition-all hover:bg-athens-gray-50 active:bg-athens-gray-100/70 hover:text-athens-gray-950',
                    isActive ? 'bg-athens-gray-50 text-athens-gray-950' : ''
                  )
                }
                to={`/admin${path}`}
              >
                {Icon && <Icon className="size-5" />}
                {label}
              </NavLink>
            );
          })}

        {/* Button for logout */}
        <button
          className="group flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-athens-gray-600 transition-all hover:bg-rose-50 hover:text-rose-600 active:bg-athens-gray-100/70"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
