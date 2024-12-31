import ShopProfileForm from '@/components/dashboard/settings/ShopProfileInfo';
import UserProfileForm from '@/components/dashboard/settings/UserProfileForm';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { IdCard, Mail, MapPin } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const InfoWrapper = ({
  title,
  helper,
  children,
}: {
  title: string;
  helper: string;
  children: ReactNode;
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 border-b border-b-[#E8E8E8] py-7 md:grid-cols-2">
      <div className="space-y-1">
        <h4 className="text-lg font-semibold text-h-black">{title}</h4>
        <p className="text-athens-gray-700">{helper}</p>
      </div>
      <div className="space-y-12">{children}</div>
    </div>
  );
};
const settingContent: Record<string, ReactNode> = {
  personal: <UserProfileForm />,
};

type TMode = 'personal' | 'shop';

const DProfile = () => {
  const { role, shop, bio, followers, name, profilePhoto, email, address } =
    useUser();

  const [mode, setMode] = useState<TMode>('personal');
  const [searchQueries] = useSearchParams();
  const modeFromQuery = searchQueries.get('mode');
  if (role === 'VENDOR') {
    settingContent.shop = <ShopProfileForm />;
  }
  useEffect(() => {
    if (modeFromQuery) {
      setMode(modeFromQuery as TMode);
    }
  }, [modeFromQuery]);

  const queries = [
    { name: 'page', value: '1' },
    { name: 'limit', value: '3' },
  ];

  if (role === 'VENDOR') {
    queries?.push({ name: 'shop_id', value: shop?.id as string });
  }

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
      <div className="space-y-7">
        <h2 className="text-2xl font-semibold text-h-black">My Profile</h2>

        <div className="flex items-center gap-5">
          <div className="flex flex-wrap items-center gap-8">
            {profilePhoto ? (
              <div className="size-32 shrink-0 overflow-hidden rounded-md border border-athens-gray-100">
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
          <div className="grow space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-h-black">
                {name}
                {role !== 'USER' && shop ? (
                  <span className="text-athens-gray-600">
                    Owner of {shop?.name}
                  </span>
                ) : null}
              </h4>
              {role === 'VENDOR' && (
                <span className="rounded-md border border-athens-gray-100 px-2 py-1 text-sm font-medium text-athens-gray-800">
                  {followers} Followers
                </span>
              )}
            </div>
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
        </div>
      </div>

      <div className="space-y-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-b-athens-gray-100 pb-4 ">
          <h2 className="text-xl font-semibold text-h-black">
            Customize Profile
          </h2>
          <div className="flex items-center justify-end gap-3 overflow-x-scroll md:overflow-x-hidden">
            <Button
              size="sm"
              variant="light"
              onClick={() => setMode('personal')}
              className={cn(
                'rounded-full',
                mode === 'personal'
                  ? 'bg-athens-gray-50 active:bg-athens-gray-50'
                  : 'text-athens-gray-800 hover:text-athens-gray-950'
              )}
            >
              Personal Info
            </Button>
            {role === 'VENDOR' ? (
              <Button
                size="sm"
                variant="light"
                onClick={() => setMode('shop')}
                className={cn(
                  'rounded-full',
                  mode === 'shop'
                    ? 'bg-athens-gray-50 active:bg-athens-gray-50'
                    : 'text-athens-gray-800 hover:text-athens-gray-950'
                )}
              >
                Shop Info
              </Button>
            ) : null}
          </div>
        </div>
        <div>{settingContent?.[mode]}</div>
      </div>
    </div>
  );
};

DProfile.InfoWrapper = InfoWrapper;

export default DProfile;
