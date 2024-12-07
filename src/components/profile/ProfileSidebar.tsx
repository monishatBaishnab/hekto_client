import { profile_routes_config } from '@/constants/routes.constants';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const ProfileSidebar = () => {
  return (
    <div className="w-64 shrink-0 space-y-4">
      {/* Profile Info */}
      <div className="size-16 overflow-hidden">
        <img
          className="size-full rounded-full object-cover"
          src="https://i.ibb.co.com/5G1XTfb/customer.webp"
          alt=""
        />
      </div>
      <div>
        <h5 className="text-lg font-bold text-h-black">Monishat Baishnab</h5>
        <span className="text-athens-gray-600">baishnabmonishat@gmail.com</span>
      </div>

      {/* Profile Navigation Links */}
      <div className="space-y-2">
        {profile_routes_config
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
                to={`/user${path}`}
              >
                {Icon && <Icon className="size-5" />}
                {label}
              </NavLink>
            );
          })}

        {/* Button for logout */}
        <button className="group flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-athens-gray-600 transition-all hover:bg-athens-gray-50 hover:text-athens-gray-950 active:bg-athens-gray-100/70">
          <LogOut className="size-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
