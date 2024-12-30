import DTitle from '@/components/dashboard/DTitle';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import {
  IdCard,
  Mail,
  MapPin,
  UserPen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const userData = useUser();
  const { name, profilePhoto, bio, email, address, role } = userData;

  const profile_info = [
    {
      label: email,
      icon: Mail,
    },
    {
      label: <span className="text-rose-600">{role?.toLowerCase()}</span>,
      icon: IdCard,
    },
    {
      label: address,
      icon: MapPin,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="w-full space-y-8">
        <DTitle title="My Profile" />

        <div className="flex flex-wrap items-center gap-8">
          {profilePhoto ? (
            <div className="size-32 shrink-0 overflow-hidden rounded-md">
              <img
                className="size-full object-cover"
                src={
                  profilePhoto ||
                  'https://i.ibb.co.com/TPKTRBc/istockphoto-1300845620-612x612.jpg'
                }
                alt={name}
              />
            </div>
          ) : null}
        </div>

        {/* Profile Info */}
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-h-black">{name}</h4>
          <div className="flex flex-wrap items-center gap-4">
            {profile_info?.map(({ icon: Icon, label }) => (
              <span className="flex items-center gap-2 text-athens-gray-600">
                <Icon className="size-4" />
                {label}
              </span>
            ))}
          </div>
          <p className="text-athens-gray-600">{bio}</p>
        </div>

        <div>
          <Button
            onClick={() => navigate('/user/settings')}
            variant="light"
            className="rounded-md text-athens-gray-700"
          >
            <UserPen />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
