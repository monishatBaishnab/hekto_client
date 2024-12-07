import PCard from '@/components/products/PCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Mail, MapPin, Phone, UserPen } from 'lucide-react';

const profile_info = [
  {
    label: 'baishnabmonishat@gmail.com',
    icon: Mail,
  },
  {
    label: '0182983829',
    icon: Phone,
  },
  {
    label: 'New York, Brooklyn',
    icon: MapPin,
  },
];

const Profile = () => {
  return (
    <div className="space-y-10">
      <div className="w-full space-y-8">
        <h3 className="text-2xl font-bold text-h-black">My Profile</h3>
        <div className="flex items-center gap-8">
          <div className="size-32 shrink-0 overflow-hidden rounded-md">
            <img
              className="size-full object-cover"
              src="https://i.ibb.co.com/5G1XTfb/customer.webp"
              alt=""
            />
          </div>
          {/* Profile completion states */}
          <div className="min-w-80 space-y-2 rounded-md bg-rose-50 p-5">
            <span className="block text-athens-gray-600">
              Total Order Amount
            </span>
            <h4 className="text-lg font-bold text-h-black">$0.00</h4>
            <button className="flex items-center gap-2 text-rose-600">
              Brows Products
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-h-black">Monishat Baishnab</h4>
          <div className="flex flex-wrap items-center gap-4">
            {profile_info?.map(({ icon: Icon, label }) => (
              <span className="flex items-center gap-2 text-athens-gray-600">
                <Icon className="size-4" />
                {label}
              </span>
            ))}
          </div>
          <p className="text-athens-gray-600">
            Extensive experience in rentals and a vast database means I can
            quickly find the options that are right for you. Looking for a
            seamless and exciting rental experience? Contact me today – I
            promise it won’t be boring! Your perfect home is just a call away.
          </p>
        </div>

        <div>
          <Button variant="light" className="rounded-md text-athens-gray-700">
            {' '}
            <UserPen />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* My Listings */}
      <div className="w-full space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-h-black">My Listings</h3>
          <button className="flex items-center gap-1 text-athens-gray-600 hover:text-athens-gray-800">
            Vew all
            <ChevronRight className="mt-1 size-4" />
          </button>
        </div>

        <div className="space-y-5">
          <PCard
            disabledDesc
            disabledShop
            classNames={{ imgWrapper: 'size-32' }}
            varient="list"
          />
          <PCard
            disabledDesc
            disabledShop
            classNames={{ imgWrapper: 'size-32' }}
            varient="list"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
