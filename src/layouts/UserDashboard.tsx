import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <div className="relative">
        {/* Navbar */}
        <Navbar />
        <div className="container flex gap-10 !pt-10">
          {/* Sidebar for user profile */}
          <ProfileSidebar />
          <div className='w-[calc(100%_-_296px)]'>
            {/* Main Contents */}
            <Outlet />
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;
