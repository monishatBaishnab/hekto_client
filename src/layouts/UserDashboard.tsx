import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProfileDrawer from '@/components/profile/ProfileDrawer';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

type TContext = {
  openDrawer: boolean;
  setOpenDrawer: (key: boolean) => void;
};

const UserDashboardContext = createContext<TContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useUserDashboardContext = () => {
  const context = useContext(UserDashboardContext);
  if (!context) {
    return;
  }
  return context as TContext;
};

const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <UserDashboardContext.Provider
        value={{ openDrawer: open, setOpenDrawer: setOpen }}
      >
        <div className="relative">
          {/* Navbar */}
          <Navbar />
          <div className="container flex gap-10 !pt-10">
            {/* Sidebar for user profile */}
            <ProfileSidebar />
            <div className="w-full lg:w-[calc(100%_-_296px)]">
              {/* Main Contents */}
              <Outlet />
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </UserDashboardContext.Provider>
      <ProfileDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserDashboard;
