import DTableImage from '@/components/dashboard/DTableImage';
import ProductEmpty from '@/components/empty/ProductEmpty';
import PCard from '@/components/products/PCard';
import PCardSkeleton from '@/components/skeletons/PCardSkeleton';
import { Button } from '@/components/ui/button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import useUser from '@/hooks/useUser';
import { useFetchAllOrdersQuery } from '@/redux/features/order/order.api';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import { TOrder } from '@/types/order.types';
import { TProduct } from '@/types/products.types';
import {
  ChevronRight,
  IdCard,
  Mail,
  MapPin,
  Plus,
  UserPen,
} from 'lucide-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { role, shop, bio, name, profilePhoto, email, address } = useUser();

  const queries = [
    { name: 'page', value: '1' },
    { name: 'limit', value: '3' },
  ];

  if (role === 'VENDOR') {
    queries?.push({ name: 'shop_id', value: shop?.id as string });
  }
  const {
    data: products,
    isLoading,
    isFetching,
  } = useFetchAllProductsQuery(queries, { skip: !!shop?.id });

  const {
    data: orders,
    isLoading: oLoading,
    isFetching: oFetching,
  } = useFetchAllOrdersQuery(queries, { skip: !!shop?.id });

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
            <p className="text-athens-gray-600">{bio}</p>
          </div>
        </div>

        <div>
          <Button
            onClick={() => navigate('/dashboard/settings')}
            variant="light"
            className="rounded-md text-athens-gray-700"
          >
            <UserPen />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Recent Products */}
      <div className="w-full space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-h-black">
            Recent Products
          </h3>
          <button
            onClick={() => navigate('/dashboard/products')}
            className="flex items-center gap-1 text-athens-gray-600 hover:text-athens-gray-800"
          >
            Vew all
            <ChevronRight className="mt-1 size-4" />
          </button>
        </div>

        <div className="space-y-5">
          {!shop?.id || isLoading || isFetching ? (
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
                    navigate('/dashboard/products');
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

      {/* Recent Orders */}
      <div className="w-full space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-h-black">Recent Orders</h3>
          <button
            onClick={() => navigate('/dashboard/orders')}
            className="flex items-center gap-1 text-athens-gray-600 hover:text-athens-gray-800"
          >
            Vew all
            <ChevronRight className="mt-1 size-4" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="block">
            <Table>
              <TableHeader className="bg-athens-gray-100">
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="text-center">Total Price</TableHead>
                  <TableHead className="text-center">Transaction Id</TableHead>
                  <TableHead className="text-center">Product Count</TableHead>
                  <TableHead className="text-end">Order Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {oLoading || oFetching
                  ? Array.from({ length: 5 }).map((_, rowIndex) => (
                      <TableRow key={rowIndex}>
                        <TableCell>
                          <div className="flex gap-2">
                            <div className="size-10 animate-pulse rounded-lg bg-athens-gray-300"></div>
                            <div className="space-y-1">
                              <div className="h-4 w-24 animate-pulse rounded bg-athens-gray-300"></div>
                              <div className="h-3 w-32 animate-pulse rounded bg-athens-gray-300"></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex w-full items-center justify-center">
                            <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex w-full items-center justify-center">
                            <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex w-full items-center justify-center">
                            <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex w-full items-center justify-end">
                            <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : orders?.data?.map((order: TOrder) => {
                      console.log(order);
                      return (
                        <TableRow key={order.id}>
                          <TableCell>
                            <DTableImage
                              image={order?.user.profilePhoto as string}
                              title={order?.user.name}
                              helper={order?.user?.email}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            {order.total_price}
                          </TableCell>
                          <TableCell className="text-center">
                            {order.transaction_id}
                          </TableCell>
                          <TableCell className="text-center">
                            {order?.orderProduct?.length}
                          </TableCell>
                          <TableCell className="text-right">
                            {moment(order?.createdAt).format(
                              'DD MMM, YYYY - HH:MM:SS A'
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
