import AdminTitle from '@/components/dashboard/admin/AdminTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
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

const actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const AProducts = () => {
  const [page, setPage] = useState(1);
  const {
    data: products,
    isLoading,
    isFetching,
  } = useFetchAllProductsQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '10' },
  ]);
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
      <AdminTitle title="Products" />
      <div className="block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Shop Name</TableHead>
              <TableHead className="text-center">Discount</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching
              ? null
              : products?.data?.map((product: TProduct) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-center">
                      {product.price}
                    </TableCell>
                    <TableCell className="text-center">
                      {product?.shop?.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {product?.discount || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {product?.categories?.length
                        ? (product?.categories?.[0] as TCategory)?.name
                        : null}
                    </TableCell>
                    <TableCell className="text-right">
                      <TableAction<TProduct>
                        onClick={handleAction}
                        item={product}
                        actions={actions}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <HPagination
        page={page}
        setPage={setPage}
        totalPage={Math.ceil(
          Number(products?.meta?.total) / Number(products?.meta?.limit)
        )}
      />
    </div>
  );
};

export default AProducts;
