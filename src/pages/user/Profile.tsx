import DTitle from '@/components/dashboard/DTitle';
import ProductEmpty from '@/components/empty/ProductEmpty';
import PCard from '@/components/products/PCard';
import PCardSkeleton from '@/components/skeletons/PCardSkeleton';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import { TProduct } from '@/types/products.types';
import {
  ChevronRight,
  IdCard,
  Mail,
  MapPin,
  Plus,
  UserPen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const userData = useUser();
  const {
    data: products,
    isLoading,
    isFetching,
  } = useFetchAllProductsQuery(
    [
      { name: 'page', value: '1' },
      { name: 'limit', value: '2' },
      { name: 'shop_id', value: String(userData?.shop?.id) },
    ],
    { skip: !userData?.shop?.id }
  );
  const { name, profilePhoto, email, address, role, shop } = userData;

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
                src={profilePhoto}
                alt={name}
              />
            </div>
          ) : null}
        </div>

        {/* Profile Info */}
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-h-black">
            {name}{' '}
            {role !== 'USER' && shop ? (
              <span className="text-athens-gray-600">
                Owner of {shop?.name}
              </span>
            ) : null}
          </h4>
          <div className="flex flex-wrap items-center gap-4">
            {profile_info?.map(({ icon: Icon, label }) => (
              <span className="flex items-center gap-2 text-athens-gray-600">
                <Icon className="size-4" />
                {label}
              </span>
            ))}
          </div>
          <p className="text-athens-gray-600">{shop?.description}</p>
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

      {/* My Listings */}
      {userData.role !== 'CUSTOMER' ? (
        <div className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-h-black">My Listings</h3>
            <button
              onClick={() => navigate('/user/listing')}
              className="flex items-center gap-1 text-athens-gray-600 hover:text-athens-gray-800"
            >
              Vew all
              <ChevronRight className="mt-1 size-4" />
            </button>
          </div>

          <div className="space-y-5">
            {isLoading || isFetching ? (
              Array.from({ length: 2 }).map((_, index) => (
                <PCardSkeleton
                  disabledDesc
                  disabledShop
                  classNames={{ imgWrapper: 'size-32' }}
                  variant={'list'}
                  key={index}
                />
              ))
            ) : !products || products?.data?.length < 1 ? (
              <ProductEmpty
                action={
                  <Button
                    variant="light"
                    className="rounded-full text-athens-gray-700"
                    size="sm"
                    onClick={() => {
                      navigate('/user/listing');
                    }}
                  >
                    <Plus className="size-3" />
                    Create
                  </Button>
                }
              />
            ) : (
              products?.data?.map((product: TProduct) => (
                <div className="flex items-center gap-3" key={product.id}>
                  <div className="w-full">
                    <PCard
                      disabledDesc
                      disabledShop
                      classNames={{ imgWrapper: 'size-32' }}
                      varient="list"
                      product={product}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
