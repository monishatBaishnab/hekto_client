import DTitle from '@/components/dashboard/DTitle';
import UserProfile from '@/components/dashboard/settings/UserProfile';

const Settings = () => {
  return (
    <div className="w-full space-y-8">
      <DTitle title="User Settings" />

      <UserProfile />
    </div>
  );
};

export default Settings;
