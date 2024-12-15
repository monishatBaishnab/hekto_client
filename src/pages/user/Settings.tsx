import DTitle from '@/components/dashboard/DTitle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import UserForm from '../../components/dashboard/UserForm';
import ShopForm from '../../components/dashboard/ShopForm';
import PasswordResetForm from '../../components/dashboard/PasswordResetForm';
import { useSearchParams } from 'react-router-dom';
import useUser from '@/hooks/useUser';

const settingContent = {
  personal: <UserForm />,
  shop: <ShopForm />,
  password: <PasswordResetForm />,
};

type TMode = 'personal' | 'shop' | 'password';

const Settings = () => {
  const userData = useUser();
  const [mode, setMode] = useState<TMode>('personal');
  const [searchQueries] = useSearchParams();
  const modeFromQuery = searchQueries.get('mode');

  useEffect(() => {
    if (modeFromQuery) {
      setMode(modeFromQuery as TMode);
    }
  }, [modeFromQuery]);

  return (
    <div className="w-full space-y-8">
      <DTitle title="User Settings" />
      <div className="flex w-full items-center gap-3 overflow-x-scroll md:overflow-x-hidden">
        <Button
          variant="light"
          onClick={() => setMode('personal')}
          className={cn(
            'rounded-full',
            mode === 'personal'
              ? 'bg-athens-gray-50 active:bg-athens-gray-50'
              : ''
          )}
        >
          Personal Info
        </Button>
        {userData?.role !== 'CUSTOMER' ? (
          <Button
            variant="light"
            onClick={() => setMode('shop')}
            className={cn(
              'rounded-full',
              mode === 'shop'
                ? 'bg-athens-gray-50 active:bg-athens-gray-50'
                : ''
            )}
          >
            Shop Info
          </Button>
        ) : null}
        <Button
          variant="light"
          onClick={() => setMode('password')}
          className={cn(
            'rounded-full',
            mode === 'password'
              ? 'bg-athens-gray-50 active:bg-athens-gray-50'
              : ''
          )}
        >
          Password and Security
        </Button>
      </div>

      {settingContent?.[mode]}
    </div>
  );
};

export default Settings;
