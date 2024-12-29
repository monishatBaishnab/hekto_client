import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import NavbarProfile from '@/components/NavbarProfile';
import { Button } from '@/components/ui/button';
import { DrawerContent, Drawer } from '@/components/ui/drawer';
import { Menu } from 'lucide-react';
import { createContext, useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
type TContext = {
  openDrawer: boolean;
  setOpenDrawer: (key: boolean) => void;
};

const AdminDashboardContext = createContext<TContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminDashboardContext = () => {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    return;
  }
  return context as TContext;
};
const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <AdminDashboardContext.Provider
      value={{ openDrawer: open, setOpenDrawer: setOpen }}
    >
      <div className="relative mx-auto max-w-screen-2xl">
        <div className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-b-athens-gray-100 bg-white pr-10">
          <div className="p-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="size-7 overflow-hidden">
                <img
                  className="size-full object-contain"
                  src="https://i.ibb.co.com/PTSxVm0/hekto-logo.png"
                  alt="Hekto Logo"
                />
              </div>
              <h2 className="text-2xl font-bold text-h-black">Hekto</h2>
            </Link>
          </div>
          <div className='flex items-center gap-3'>
            <Button
              onClick={() => setOpen(true)}
              size="icon"
              variant="light"
              // className="rounded-md lg:hidden"
            >
              <Menu />
            </Button>
            <NavbarProfile />
          </div>
        </div>
        <div className="fixed bottom-0 top-16 hidden w-64 bg-white lg:block">
          <AdminSidebar />
        </div>
        <div className="ml-0 mt-16 min-h-[calc(100vh_-_64px)] bg-athens-gray-50 p-10 lg:ml-64">
          <div className="rounded-md bg-white p-5">
            <Outlet />
          </div>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerContent className="left-0 top-0 my-0 w-64 flex-col items-start rounded-none">
          <div className="w-full">
            <AdminSidebar />
          </div>
        </DrawerContent>
      </Drawer>
    </AdminDashboardContext.Provider>
  );
};

export default DashboardLayout;
