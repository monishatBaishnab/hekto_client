import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Copy, FilePenLine, FolderOpen, Plus, Trash2 } from 'lucide-react';
import TableAction from '@/components/dashboard/admin/TableAction';
import HPagination from '@/components/HPagination';
import { useEffect, useState } from 'react';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useFetchAllProductsQuery,
  useUpdateProductMutation,
} from '@/redux/features/products/products.api';
import { TProduct } from '@/types/products.types';
import { TCategory } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import DTableImage from '@/components/dashboard/DTableImage';
import useUser from '@/hooks/useUser';
import { useAlert } from '@/hooks/useAlert';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import CreateProduct from '@/components/dashboard/CreateProduct';

const admin_actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];
const vendor_actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
  {
    key: 'duplicate',
    label: 'Duplicate',
    icon: Copy,
  },
  {
    key: 'edit',
    label: 'Edit',
    icon: FilePenLine,
  },
];

const DProducts = () => {
  const { AlertComponent, showAlert } = useAlert();
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState<TProduct>();
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [page, setPage] = useState(1);
  const { role, shop } = useUser();

  const actions = role === 'VENDOR' ? vendor_actions : admin_actions;

  const queries = [
    { name: 'page', value: String(page) },
    { name: 'limit', value: '6' },
  ];

  useEffect(() => {
    if (role === 'VENDOR') {
      queries?.push({ name: 'shop_id', value: shop?.id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const {
    data: products,
    isLoading,
    isFetching,
  } = useFetchAllProductsQuery(queries);

  let modalTitle = 'Create Product';

  if (product && isDuplicate) {
    modalTitle = 'Duplicate Product';
  } else if (product && !isDuplicate) {
    modalTitle = 'Update Product';
  }

  const handleAction = async (key: string, product: TProduct) => {
    if (key === 'edit') {
      setProduct(product);
      setOpenModal(true);
      setIsDuplicate(false);
    } else if (key === 'delete') {
      const isConfirmed = await showAlert(
        'Are you sure.',
        'You have not access this after delete.'
      );
      if (isConfirmed) {
        const deletedData = await deleteProduct(product.id);
        if (deletedData?.data?.success) {
          setOpenModal(false);
          toast.success('Product Deleted.');
        }
      }
    } else if (key === 'duplicate') {
      setProduct(product);
      setOpenModal(true);
      setIsDuplicate(true);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const categories = [];
    const previousCategories = product?.categories?.[0] as TCategory;
    if (previousCategories?.id !== data.categories) {
      if (previousCategories) {
        categories?.push({ isDeleted: true, id: previousCategories?.id });
        categories?.push({ isDeleted: false, id: data?.categories });
      } else {
        categories?.push({ isDeleted: false, id: data?.categories });
      }
    } else if (!product || isDuplicate) {
      categories?.push({ isDeleted: false, id: data?.categories });
    }

    const productData = {
      name: data?.name,
      price: data?.price,
      quantity: data?.quantity,
      description: data?.description,
      discount: data?.discount,
      categories: categories,
      ...(data?.prev_images ? { images: data?.prev_images } : {}),
    };

    const formData = new FormData();

    formData.append('data', JSON.stringify({ ...productData }));
    Array.from(data.images).forEach((file) => {
      formData.append('files', file as File);
    });

    if (product && !isDuplicate) {
      const updatedData = await updateProduct({ formData, id: product.id });
      if (updatedData?.data?.success) {
        setOpenModal(false);
        toast.success('Product Updated.');
      }
      return;
    } else if (!product || isDuplicate) {
      const createdData = await createProduct(formData);
      console.log(createdData);
      if (createdData?.data?.success) {
        setOpenModal(false);
        toast.success('Product Created.');
      }
    }
  };

  return (
    <div className="space-y-7">
      {AlertComponent}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-h-black">Products</h2>
        {role === 'VENDOR' ? (
          <Button
            onClick={() => {
              setProduct(undefined);
              setOpenModal(true);
              setIsDuplicate(false);
            }}
            variant="rose"
            className="bg-red-500 hover:bg-red-400 active:bg-red-500"
          >
            Create new <Plus />
          </Button>
        ) : null}
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

      <CreateProduct
        onSubmit={handleSubmit}
        title={modalTitle}
        setOpen={setOpenModal}
        open={openModal}
        product={product}
        isLoading={creating || updating}
      />
    </div>
  );
};

export default DProducts;
