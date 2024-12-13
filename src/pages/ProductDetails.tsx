import ProductEmpty from '@/components/empty/ProductEmpty';
import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import HTextarea from '@/components/form/HTextarea';
import { Card, CardSkeleton } from '@/components/home/FPContainer';
import RCard from '@/components/reviews/RCard';
import PDetailsSkeleton from '@/components/skeletons/PDetailsSkeleton';
import { Button } from '@/components/ui/button';
import { useAlert } from '@/hooks/useAlert';
import { cn } from '@/lib/utils';
import { addToCart } from '@/redux/features/cart/cart.slice';
import { useFetchMyOrdersQuery } from '@/redux/features/order/order.api';
import {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
} from '@/redux/features/products/products.api';
import { useCreateReviewMutation } from '@/redux/features/review/review.api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TCategory } from '@/types';
import { TOrder } from '@/types/order.types';
import { TProduct } from '@/types/products.types';
import { DollarSign, Tag } from 'lucide-react';
import moment from 'moment';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useFetchProductByIdQuery(
    id as string,
    { skip: !id }
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const carts = useAppSelector((state) => state.cart.carts);
  const product: TProduct = data?.data || {};
  const { showAlert, AlertComponent } = useAlert();
  const { data: orders } = useFetchMyOrdersQuery([]);
  const [createReview] = useCreateReviewMutation();

  const {
    data: products,
    isLoading: pLoading,
    isFetching: pFetching,
  } = useFetchAllProductsQuery(
    [
      {
        name: 'categories',
        value: (product?.categories?.[0] as TCategory)?.id,
      },
    ],
    {
      skip: !(product?.categories?.[0] as TCategory)?.id,
    }
  );

  const filteredOrders = orders?.data?.find(
    (order: TOrder) =>
      order.orderProduct?.find((orderp) => orderp.product.id === product.id)
        ?.product.id === product.id
  );

  const moreProducts = products?.data?.filter(
    (item: TProduct) => item.id !== product.id
  );

  if (isLoading || isFetching) {
    return <PDetailsSkeleton />;
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login first.');
      return;
    }

    const cartInfo = {
      productId: product.id,
      shopId: product.shop_id,
      product,
    };

    if (carts && carts.length > 0) {
      for (const cart of carts) {
        if (cart.shopId !== cartInfo.shopId) {
          const result = await showAlert(
            'Replace Cart with New Product(s)',
            'Retain the current cart and cancel the addition.'
          );

          if (result === true) {
            dispatch(addToCart(cartInfo));
            toast.success('Product added to the cart.');
            return;
          } else {
            toast.info('Current cart retained.');
            return;
          }
        } else if (cart.productId === cartInfo.productId) {
          toast.error('Product already added.');
          return;
        }
      }
    }

    // Add product if no conflicts
    dispatch(addToCart(cartInfo));
    toast.success('Product added to the cart.');
  };

  const handleCreateReview: SubmitHandler<FieldValues> = async (data) => {
    const result = await createReview({
      ...data,
      product_id: product?.id,
    }).unwrap();
    if (result.success) {
      toast.success('Review Posted.');
    }
  };

  return (
    <div>
      {AlertComponent}
      <section>
        <div className="container grid grid-cols-1 gap-7 md:grid-cols-2">
          <div>
            <div className="h-60 w-full overflow-hidden border border-slate-200 bg-slate-50 p-5 sm:h-96">
              <img
                className="size-full object-contain"
                src={product?.images}
                alt={product?.name}
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-1 border-b border-athens-gray-200 pb-3">
              <h3 className="text-3xl font-semibold">{product?.name}</h3>
            </div>
            <div className="space-y-2 border-b border-b-athens-gray-200 pb-3">
              <div className="flex items-center gap-1 text-sm font-medium">
                <DollarSign className="mt-[1.5px] text-lg text-athens-gray-500" />
                <h4 className="text-2xl font-bold text-rose-600">
                  {product?.price}
                </h4>
              </div>
              <p className="text-athens-gray-600">{product.description}</p>
            </div>
            <div>
              <div className="mb-4">
                <Button onClick={handleAddToCart}>Add to cart</Button>
              </div>
              <h5 className="mb-2 font-semibold text-athens-gray-950">
                Category
              </h5>
              <div className="flex items-center gap-2">
                {(product?.categories as TCategory[])?.map(({ id, name }) => (
                  <Button key={id} variant="light" size="sm" className="h-7">
                    <Tag className="!size-[13px]" />
                    {name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-athens-gray-100">
              <div className={cn('flex items-center justify-between pt-2')}>
                <div className={cn('flex items-center gap-2')}>
                  <div className="size-8 overflow-hidden rounded-md">
                    <img
                      className="size-full object-cover"
                      src={product?.shop?.logo}
                      alt={product?.shop?.name}
                    />
                  </div>
                  <div className="">
                    <Link
                      to={`/shop/${product?.shop_id}`}
                      className="-mb-1 block font-bold text-h-black"
                    >
                      {product?.shop?.name}
                    </Link>
                    <span className="text-xs text-athens-gray-600">
                      {moment(product?.shop?.createdAt).format('DD MMM, YYYY')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container space-y-10 !py-0">
        <div>
          <div className="space-y-5">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-h-black">
                Leave a Review:
              </h3>

              <p className="text-athens-gray-600">
                {!orders?.data?.length
                  ? 'Please write review after purchase product.'
                  : 'Required fields are marked*'}
              </p>
            </div>
            <HForm onSubmit={handleCreateReview}>
              <div className="space-y-5">
                <HInput
                  disabled={!filteredOrders}
                  name="rating"
                  placeholder="Write your rating (4.5)"
                />
                <HTextarea
                  disabled={!filteredOrders}
                  rows={8}
                  name="comment"
                  placeholder="Write your comment hare."
                />

                <Button disabled={!filteredOrders}>Post Review</Button>
              </div>
            </HForm>
          </div>
        </div>
        {product?.review?.map ? (
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-h-black">Reviews</h3>
            <div className="space-y-5">
              {product?.review?.map((item) => (
                <RCard key={item.id} review={item} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
      <section className="container space-y-10">
        <h3 className="text-2xl font-bold text-h-black">
          More From This Category
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pLoading || pFetching ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : moreProducts < 1 ? (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <ProductEmpty action={<></>} />
            </div>
          ) : (
            moreProducts?.map((product: TProduct) => (
              <Card key={product?.id} product={product} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
