import useUser from '@/hooks/useUser';
import { useAppSelector } from '@/redux/hooks';
import { Loader } from 'lucide-react';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoute = ({ children }: { children: ReactNode }): JSX.Element => {
  const token = useAppSelector((state) => state?.auth.token);
  const user = useUser();
  if (user.isLoading || user.isFetching) {
    return (
      <div className="flex h-screen w-screen animate-pulse items-center justify-center bg-white">
        <Loader className="size-16 animate-spin text-athens-gray-900" />
      </div>
    );
  }
  if (!token) {
    toast.error('You are not authorized.');
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
