import { Copy, FilePenLine, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '@/redux/features/products/products.api';
import { TProduct } from '@/types/products.types';
import { TCategory } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAlert } from '@/hooks/useAlert';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import CreateProduct from '@/components/dashboard/CreateProduct';
import PTable from '@/components/tables/PTable';

const actions = [
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

const DVendorProducts = () => {
  const { AlertComponent, showAlert } = useAlert();
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState<TProduct>();
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

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
      </div>

      <PTable actions={actions} handleAction={handleAction} />

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

export default DVendorProducts;
