import { useFetchProfileInfoQuery } from '@/redux/features/user/user.api';
import { useAppSelector } from '@/redux/hooks';

const useUser = () => {
  const user = useAppSelector((state) => state.auth.user);
  const {
    data: profileInfo,
    isLoading,
    isFetching,
  } = useFetchProfileInfoQuery(user?.id as string, {
    skip: !user?.id,
  });

  return { ...profileInfo?.data, isLoading, isFetching };
};

export default useUser;
