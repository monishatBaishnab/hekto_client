import useRouter from '@/hooks/useRouter';
import useUser from '@/hooks/useUser';
import { useAdminDashboardContext } from '@/layouts/DashboardLayout';
import { cn } from '@/lib/utils';
import { logout } from '@/redux/features/auth/auth.slice';
import { clearCart } from '@/redux/features/cart/cart.slice';
import { clearRecent } from '@/redux/features/recent/recent.slice';
import { useAppDispatch } from '@/redux/hooks';
import { LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const { dashboard_config } = useRouter();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useUser();
  const { setOpenDrawer } = useAdminDashboardContext() ?? {};

  const { role } = userData;

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(clearRecent());
    if (!role) {
      return navigate('/login');
    } else if (role) {
      // Then, log out the user after invalidating the cache
      dispatch(logout());

      // Optionally, redirect to another page after logout
      navigate('/login');
    }
  };
  return (
    <div>
      {/* Profile Navigation Links */}
      <div id='dashboard-sidebar' className="h-[calc(100vh_-_66px)] space-y-1 overflow-y-auto">
        {dashboard_config
          ?.filter((config) => config.label && config.icon)
          ?.map(({ label, icon: Icon, path }) => {
            return (
              <NavLink
                key={path}
                className={({ isActive }) =>
                  cn(
                    'group px-5 py-2.5 flex items-center gap-2 text-athens-gray-600 transition-all hover:bg-athens-gray-50 active:bg-athens-gray-100/70 hover:text-athens-gray-950',
                    isActive ? 'bg-athens-gray-50 text-athens-gray-950' : ''
                  )
                }
                onClick={() => setOpenDrawer && setOpenDrawer(false)}
                to={`/dashboard${path}`}
              >
                {Icon && <Icon className="size-5" />}
                {label}
              </NavLink>
            );
          })}

        {/* Button for logout */}
        <button
          onClick={handleLogout}
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
