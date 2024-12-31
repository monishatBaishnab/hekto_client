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
import { useFetchMyOrdersQuery } from '@/redux/features/order/order.api';
import { TOrder } from '@/types/order.types';

import moment from 'moment';
import DTitle from '@/components/dashboard/DTitle';
import useUser from '@/hooks/useUser';
import DTableImage from '@/components/dashboard/DTableImage';
import { FolderOpen } from 'lucide-react';
const Orders = () => {
  const [page, setPage] = useState(1);
  const user = useUser();

  const queries = [
    { name: 'page', value: String(page) },
    { name: 'limit', value: '6' },
  ];

  const {
    data: orders,
    isLoading,
    isFetching,
  } = useFetchMyOrdersQuery(queries, { skip: user?.isLoading });

  return (
    <div className="w-full space-y-8">
      <DTitle title="My Orders" />
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
            {isLoading || isFetching ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
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
            ) : !orders?.data?.length ? (
              <TableRow>
                <TableCell colSpan={5} className="hover:bg-white">
                  <div className="flex flex-col items-center justify-center py-5 text-base font-medium text-athens-gray-700">
                    <FolderOpen className="size-10 stroke-athens-gray-500" />
                    <span>No data found</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orders?.data?.map((order: TOrder) => {
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
              })
            )}
          </TableBody>
        </Table>
      </div>
      {orders?.data?.length ? (
        <HPagination
          page={page}
          setPage={setPage}
          totalPage={Math.ceil(
            Number(orders?.meta?.total) / Number(orders?.meta?.limit)
          )}
        />
      ) : null}
    </div>
  );
};

export default Orders;
