import { useFetchProfileInfoQuery } from '@/redux/features/user/user.api';
import { useAppSelector } from '@/redux/hooks';
import { TUser } from '@/types/user.types';
import { useEffect, useState } from 'react';

const useUser = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState<Partial<TUser>>({});
  const {
    data: profileInfo,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useFetchProfileInfoQuery(user?.id as string, { skip: !user?.id });
  
  useEffect(() => {
    if (isSuccess && !isLoading && !isFetching) {
      setUserInfo(profileInfo?.data);
    }
  }, [isLoading, isFetching, profileInfo, isSuccess, user]);

  useEffect(() => {
    if (user === null) {
      setUserInfo({});
    }
  }, [user]);
  
  return { ...userInfo, isLoading, isFetching, refetch };
};

export default useUser;
