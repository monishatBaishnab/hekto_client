import { TCategory, TQueries } from '@/types';
import { TProduct } from '@/types/products.types';
import { FolderOpen, LucideProps } from 'lucide-react';
import TableAction from '../dashboard/admin/TableAction';
import DTableImage from '../dashboard/DTableImage';
import HPagination from '../HPagination';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '../ui/table';
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import useUser from '@/hooks/useUser';

type PTableProps = {
  handleAction: (action: string, item: TProduct) => void;
  actions: {
    key: string;
    label: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >;
  }[];
  queries?: TQueries;
};

const PTable = ({
  handleAction,
  actions,
  queries = [],
}: PTableProps) => {
  const { shop } = useUser();
   const [page, setPage] = useState(1);
  const {
    data: products,
    isLoading,
    isFetching,
  } = useFetchAllProductsQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '6' },
    ...(shop?.id ? [{ name: 'shop_id', value: shop.id }] : []),
    ...queries,
  ]);

  return (
    <div>

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

export default PTable;
