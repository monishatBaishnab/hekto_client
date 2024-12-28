import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ban, Circle } from 'lucide-react';
import TableAction from '@/components/dashboard/admin/TableAction';
import { TUser } from '@/types/user.types';
import HPagination from '@/components/HPagination';
import { useState } from 'react';
import {
  useFetchAllShopsQuery,
  useUpdateShopMutation,
} from '@/redux/features/shops/shops.api';
import { TShop } from '@/types/shop.types';
import { toast } from 'sonner';
import DTableImage from '@/components/dashboard/DTableImage';

const DStores = () => {
  const [page, setPage] = useState(1);
  const {
    data: shops,
    isLoading,
    isFetching,
  } = useFetchAllShopsQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '6' },
  ]);
  const [updateShop] = useUpdateShopMutation();

  const handleAction = async (key: string, shop: TShop) => {
    if (key === 'block') {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ status: 'BLOCKED' }));
      const result = await updateShop({ formData, id: shop.id });
      if (result?.data?.success) {
        toast.success(`Shop ${key}.`);
      }
    } else if (key === 'unblock') {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ status: 'ACTIVE' }));
      const result = await updateShop({ formData, id: shop.id });
      if (result?.data?.success) {
        toast.success(`Shop ${key}.`);
      }
    }
  };
  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-semibold text-h-black">Vendor Stores</h2>
      <div className="block">
        <Table>
          <TableHeader className='bg-athens-gray-100'>
            <TableRow>
              <TableHead>Shop</TableHead>
              <TableHead className="text-center">Owner</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
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
                    <TableCell className="text-right">
                      <div className="flex w-full items-center justify-center">
                        <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
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
              : shops?.data?.map((shop: TShop) => {
                  let actions = [
                    {
                      key: 'block',
                      label: 'Block',
                      icon: Ban,
                    },
                  ];
                  if (shop.status === 'BLOCKED') {
                    actions = [
                      {
                        key: 'unblock',
                        label: 'Unblock',
                        icon: Circle,
                      },
                    ];
                  }
                  return (
                    <TableRow key={shop.id}>
                      <TableCell>
                        <DTableImage
                          image={shop.logo as string}
                          title={shop.name}
                          helper={(shop.user as TUser)?.email}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {(shop?.user as TUser)?.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {shop?.status}
                      </TableCell>
                      <TableCell className="text-right">
                        <TableAction<TShop>
                          onClick={handleAction}
                          item={shop}
                          actions={actions}
                        />
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
          Number(shops?.meta?.total) / Number(shops?.meta?.limit)
        )}
      />
    </div>
  );
};

export default DStores;
