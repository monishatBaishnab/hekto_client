import AdminTitle from '@/components/dashboard/admin/AdminTitle';
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

const AShops = () => {
  const [page, setPage] = useState(1);
  const {
    data: shops,
    isLoading,
    isFetching,
  } = useFetchAllShopsQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '10' },
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
      <AdminTitle title="Users" />
      <div className="block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shop Name</TableHead>
              <TableHead className="text-center">User Name</TableHead>
              <TableHead className="text-center">User Email</TableHead>
              <TableHead className="text-center">Shop Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching
              ? null
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
                      <TableCell>{shop.name}</TableCell>
                      <TableCell className="text-center">
                        {(shop?.user as TUser)?.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {(shop?.user as TUser)?.email}
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

export default AShops;
