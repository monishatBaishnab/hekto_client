import { useUserDashboardContext } from '@/layouts/UserDashboard';
import { PanelLeft } from 'lucide-react';
import { Button } from '../ui/button';

const DTitle = ({ title }: { title: string }) => {
  const { setOpenDrawer } = useUserDashboardContext() || {};
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setOpenDrawer && setOpenDrawer(true)}
        className="rounded-md lg:hidden"
        size="icon"
        variant="light"
      >
        <PanelLeft />
      </Button>
      <h3 className="text-2xl font-bold text-h-black">{title}</h3>
    </div>
  );
};

export default DTitle;
