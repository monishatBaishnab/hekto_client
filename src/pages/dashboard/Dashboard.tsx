import DTableImage from '@/components/dashboard/DTableImage';
import SalesReport from '@/components/dashboard/SalesReport';
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
import { TOrder } from '@/types/order.types';
import {
  BadgePercent,
  ChevronRight,
  PackageOpen,
  ShoppingCart,
} from 'lucide-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { role, shop } = useUser();
  const orderQueries = [
    { name: 'page', value: '1' },
    { name: 'limit', value: '3' },
  ];

  if (role === 'VENDOR') {
    orderQueries?.push({ name: 'shop_id', value: shop?.id as string });
  }

  const {
    data: orders,
    isLoading: oLoading,
    isFetching: oFetching,
  } = useFetchAllOrdersQuery(orderQueries, {skip: !!shop?.id});
  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-semibold text-h-black">Site Overview</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {/* Product */}
        <div className="flex items-center justify-between gap-3 rounded-md border border-athens-gray-100 p-4">
          <div className="space-y-1">
            <h4 className="text-athens-gray-800">Total Products</h4>
            <h2 className="text-2xl font-bold text-h-black">20</h2>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-green-100 bg-green-50 p-4">
            <PackageOpen className="size-7 text-blue-500" />
          </div>
        </div>
        {/* Sales */}
        <div className="flex items-center justify-between gap-3 rounded-md border border-athens-gray-100 p-4">
          <div className="space-y-1">
            <h4 className="text-athens-gray-800">Total Sales</h4>
            <h2 className="text-2xl font-bold text-h-black">340</h2>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-green-100 bg-green-50 p-4">
            <ShoppingCart className="size-7 text-green-500" />
          </div>
        </div>
        {/* Revenue */}
        <div className="flex items-center justify-between gap-3 rounded-md border border-athens-gray-100 p-4">
          <div className="space-y-1">
            <h4 className="text-athens-gray-800">Total Revenue</h4>
            <h2 className="text-2xl font-bold text-h-black">$2,340</h2>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-purple-100 bg-purple-50 p-4">
            <BadgePercent className="size-7 text-purple-500" />
          </div>
        </div>
      </div>

      <SalesReport />

      {/* Recent Sales */}
      <div className="w-full space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-h-black">Recent Sales</h3>
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

export default Dashboard;
