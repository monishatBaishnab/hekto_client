import ShopProfileForm from '@/components/dashboard/settings/ShopProfileInfo';
import UserProfileForm from '@/components/dashboard/settings/UserProfileForm';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import { cn } from '@/lib/utils';
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

const DSettings = () => {
  const userData = useUser();
  const [mode, setMode] = useState<TMode>('personal');
  const [searchQueries] = useSearchParams();
  const modeFromQuery = searchQueries.get('mode');
  if (userData.role === 'VENDOR') {
    settingContent.shop = <ShopProfileForm />;
  }
  useEffect(() => {
    if (modeFromQuery) {
      setMode(modeFromQuery as TMode);
    }
  }, [modeFromQuery]);
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-b-athens-gray-100 pb-4 ">
        <h2 className="text-2xl font-semibold text-h-black">
          Profile Settings
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
          {userData?.role === 'VENDOR' ? (
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
  );
};

DSettings.InfoWrapper = InfoWrapper;

export default DSettings;
