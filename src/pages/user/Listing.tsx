import PCard from '@/components/products/PCard';
import { Button } from '@/components/ui/button';
import { vendor_actions } from '@/constants/products.constants';
import { TProduct } from '@/types/products.types';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useFetchAllProductsQuery,
  useUpdateProductMutation,
} from '@/redux/features/products/products.api';
import DTitle from '@/components/dashboard/DTitle';
import { Plus } from 'lucide-react';
import PCardSkeleton from '@/components/skeletons/PCardSkeleton';
import { useEffect, useState } from 'react';
import CreateProduct from '@/components/dashboard/CreateProduct';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import useUser from '@/hooks/useUser';
import ProductEmpty from '@/components/empty/ProductEmpty';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { TCategory } from '@/types';
import { useAlert } from '@/hooks/useAlert';
import HPagination from '@/components/HPagination';
const Listing = () => {
  const navigate = useNavigate();
  const { AlertComponent, showAlert } = useAlert();
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState<TProduct>();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const userData = useUser();
  const limit = 5;
  const [page, setPage] = useState(1);
  const {
    data: products,
    isLoading,
    isFetching,
  } = useFetchAllProductsQuery(
    [
      { name: 'page', value: String(page) },
      { name: 'limit', value: String(limit) },
      { name: 'shop_id', value: String(userData?.shop?.id) },
    ],
    { skip: !userData?.shop?.id }
  );

  // Function for handle Product Action
  const handleAction = async (key: string, product: TProduct) => {
    if (key === 'edit') {
      setProduct(product);
      setOpenModal(true);
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
      console.log('Duplicate Product');
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
    } else if (!product) {
      categories?.push({ isDeleted: false, id: data?.categories });
    }

    const productData = {
      name: data?.name,
      price: data?.price,
      quantity: data?.quantity,
      description: data?.description,
      discount: data?.discount,
      categories: categories,
    };

    const formData = new FormData();

    formData.append('data', JSON.stringify({ ...productData }));

    if (data.images) {
      formData.append('file', data.images);
    }
    if (product) {
      const updatedData = await updateProduct({ formData, id: product.id });
      if (updatedData?.data?.success) {
        setOpenModal(false);
        toast.success('Product Updated.');
      }
    } else {
      const createdData = await createProduct(formData);
      if (createdData?.data?.success) {
        setOpenModal(false);
        toast.success('Product Created.');
      }
    }
  };
  useEffect(() => {
    if (!userData.isFetching && !userData?.isLoading && !userData.shop) {
      toast.error('Please create a shop for create product.');
      navigate('/user/settings');
      return;
    }
  }, [userData, navigate]);

  return (
    <div className="w-full space-y-8">
      {AlertComponent}
      <div className="flex items-center justify-between">
        <DTitle title="My Listings" />

        <Button
          variant="light"
          className="rounded-full text-athens-gray-700"
          size="sm"
          onClick={() => {
            setProduct(undefined);
            setOpenModal(true);
          }}
        >
          <Plus className="size-3" />
          Create
        </Button>
      </div>
      <div className="space-y-5">
        {isLoading || isFetching ? (
          Array.from({ length: 2 }).map((_, index) => (
            <PCardSkeleton
              disabledDesc
              disabledShop
              classNames={{ imgWrapper: 'size-32' }}
              variant={'list'}
              key={index}
            />
          ))
        ) : !products || products?.data?.length < 1 ? (
          <ProductEmpty
            action={
              <Button
                variant="light"
                className="rounded-full text-athens-gray-700"
                size="sm"
                onClick={() => {
                  navigate('/user/listing');
                }}
              >
                <Plus className="size-3" />
                Create
              </Button>
            }
          />
        ) : (
          products?.data?.map((product: TProduct) => (
            <div className="flex items-center gap-3" key={product.id}>
              <div className="w-full">
                <PCard
                  disabledDesc
                  disabledShop
                  classNames={{ imgWrapper: 'size-32' }}
                  varient="list"
                  product={product}
                  actions={
                    <PCard.CardActions
                      product={product}
                      onClick={handleAction}
                      actions={vendor_actions}
                      variant="list"
                    />
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>

      <HPagination
        page={page}
        setPage={setPage}
        totalPage={Math.ceil(
          Number(products?.meta?.total) / Number(products?.meta?.limit)
        )}
      />

      <CreateProduct
        onSubmit={handleSubmit}
        title="Create Product"
        setOpen={setOpenModal}
        open={openModal}
        product={product}
      />
    </div>
  );
};

export default Listing;
