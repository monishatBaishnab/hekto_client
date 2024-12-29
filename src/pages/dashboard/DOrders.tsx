import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import HPagination from '@/components/HPagination';
import { useState } from 'react';
import { useFetchAllOrdersQuery } from '@/redux/features/order/order.api';
import { TOrder } from '@/types/order.types';

import moment from 'moment';
import DTableImage from '@/components/dashboard/DTableImage';
import useUser from '@/hooks/useUser';
const DOrders = () => {
  const [page, setPage] = useState(1);
  const { role, shop } = useUser();

  const queries = [
    { name: 'page', value: String(page) },
    { name: 'limit', value: '6' },
  ];

  if (role === 'VENDOR') {
    queries?.push({ name: 'shop_id', value: shop?.id as string });
  }
  const {
    data: orders,
    isLoading,
    isFetching,
  } = useFetchAllOrdersQuery(queries);

  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-semibold text-h-black">Orders</h2>
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
            {isLoading || isFetching
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
      <HPagination
        page={page}
        setPage={setPage}
        totalPage={Math.ceil(
          Number(orders?.meta?.total) / Number(orders?.meta?.limit)
        )}
      />
    </div>
  );
};

export default DOrders;
