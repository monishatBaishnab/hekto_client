import AdminTitle from '@/components/dashboard/admin/AdminTitle';
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
import { FolderOpen } from 'lucide-react';
const AOrder = () => {
  const [page, setPage] = useState(1);
  const {
    data: orders,
    isLoading,
    isFetching,
  } = useFetchAllOrdersQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '10' },
  ]);

  return (
    <div className="space-y-7">
      <AdminTitle title="Users" />
      <div className="block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
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
                    <div className="h-4 w-24 animate-pulse rounded bg-athens-gray-300"></div>
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
            ) : orders?.data?.length ? (
              <TableRow>
                <TableCell colSpan={4} className="hover:bg-white">
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
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell className="text-center">
                      {order.total_price}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.transaction_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {order?.orderProduct?.length}
                    </TableCell>
                    <TableCell className="text-center">
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

export default AOrder;
