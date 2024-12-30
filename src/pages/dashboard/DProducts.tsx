import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FolderOpen, Plus, Trash2 } from 'lucide-react';
import TableAction from '@/components/dashboard/admin/TableAction';
import HPagination from '@/components/HPagination';
import { useState } from 'react';
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from '@/redux/features/products/products.api';
import { TProduct } from '@/types/products.types';
import { TCategory } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import DTableImage from '@/components/dashboard/DTableImage';
import useUser from '@/hooks/useUser';

const actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const DProducts = () => {
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
    data: products,
    isLoading,
    isFetching,
  } = useFetchAllProductsQuery(queries);
  const [deleteProduct] = useDeleteProductMutation();

  const handleAction = async (key: string, product: TProduct) => {
    if (key === 'delete') {
      const result = await deleteProduct(product.id);
      if (result.data?.success) {
        toast.error('Product Deleted.');
      }
    }
  };

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-h-black">Products</h2>
        <Button
          variant="rose"
          className="bg-red-500 hover:bg-red-400 active:bg-red-500"
        >
          Create new <Plus />
        </Button>
      </div>
      <div className="block">
        <Table>
          <TableHeader className="bg-athens-gray-100">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Shop Name</TableHead>
              <TableHead className="text-center">Discount</TableHead>
              <TableHead className="text-right">Action</TableHead>
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
            ) : !products?.data?.length ? (
              <TableRow>
                <TableCell colSpan={5} className="hover:bg-white">
                  <div className="flex flex-col items-center justify-center py-5 text-base font-medium text-athens-gray-700">
                    <FolderOpen className="size-10 stroke-athens-gray-500" />
                    <span>No data found</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products?.data?.map((product: TProduct) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <DTableImage
                      image={product.images?.[0] as string}
                      title={product.name}
                      helper={
                        product?.categories?.length
                          ? (product?.categories?.[0] as TCategory)?.name
                          : ''
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">{product.price}</TableCell>
                  <TableCell className="text-center">
                    {product?.shop?.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {product?.discount || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <TableAction<TProduct>
                      onClick={handleAction}
                      item={product}
                      actions={actions}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {products?.data?.length ? (
        <HPagination
          page={page}
          setPage={setPage}
          totalPage={Math.ceil(
            Number(products?.meta?.total) / Number(products?.meta?.limit)
          )}
        />
      ) : null}
    </div>
  );
};

export default DProducts;
