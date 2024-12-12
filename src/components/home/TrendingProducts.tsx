import { cn } from '@/lib/utils';
import PCard from '../products/PCard';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import { TProduct } from '@/types/products.types';
import { user_actions } from '@/constants/products.constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useAlert } from '@/hooks/useAlert';
import { addToCart } from '@/redux/features/cart/cart.slice';
import { toast } from 'sonner';
import ProductEmpty from '../empty/ProductEmpty';
import { Link } from 'react-router-dom';

export const CardSkeleton = () => {
  return (
    <div className="group bg-white p-5 shadow-md">
      {/* Skeleton Image Container */}
      <div className="relative mb-5 h-[280px] w-full animate-pulse overflow-hidden rounded-lg bg-athens-gray-200 transition-all"></div>

      {/* Skeleton Text Container */}
      <div className="space-y-2">
        {/* Skeleton Title */}
        <div className="mx-auto h-6 w-3/4 animate-pulse rounded bg-athens-gray-200"></div>

        {/* Skeleton Price */}
        <div className="flex items-center justify-center gap-2.5">
          <div className="h-4 w-12 animate-pulse rounded bg-athens-gray-200"></div>
          <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export const Card = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.carts);
  const { showAlert, AlertComponent } = useAlert();
  const handleAction = (key: string) => {
    if (key == 'cart') {
      const cartInfo = { productId: product?.id, shopId: product?.shop_id };
      carts?.forEach(async (cart) => {
        if (cart.shopId !== cartInfo.shopId) {
          const result = await showAlert(
            'Replace Cart with New Product(s)',
            'Retain the current cart and cancel the addition.'
          );

          if (result) {
            dispatch(addToCart(cartInfo));
            return;
          }
        } else if (cart.productId === cartInfo.productId) {
          toast.error('Product already added.');
        }
      });

      dispatch(addToCart(cartInfo));
      return;
    }
  };
  
  return (
    <div className="group bg-white p-5 shadow-md">
      {AlertComponent}
      <div
        className={cn(
          'transition-all relative overflow-hidden h-[280px] w-full mb-5',
          'bg-athens-gray-50 p-7  group-hover:bg-dark-blue-100/70'
        )}
      >
        <img
          className="size-full object-contain"
          src={product.images}
          alt={product.name}
        />

        {/* Card Icons */}
        <div
          className={cn(
            'flex items-center flex-col gap-2 transition-all duration-300',
            'absolute left-3 bottom-1 invisible opacity-0',
            'group-hover:bottom-3 group-hover:opacity-100 group-hover:visible'
          )}
        >
          <PCard.CardActions
            actions={user_actions}
            variant={'grid'}
            onClick={handleAction}
            product={product}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Link
          to={`/products/${product.id}`}
          className={cn(
            'font-bold block text-deep-koamaru-900 text-lg text-center'
          )}
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-center gap-2.5">
          <span className="text-h-black">${product.price}</span>
          {product?.discount ? (
            <span className="text-rose-600 line-through">
              ${product?.discount + product.price}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const TrendingProducts = () => {
  const {
    data: trendingProducts,
    isLoading: pLoading,
    isFetching: pFetching,
  } = useFetchAllProductsQuery([
    { name: 'page', value: '1' },
    { name: 'limit', value: '4' },
  ]);

  return (
    <div className="container !pt-0">
      <h2 className="mb-8 text-center text-4xl font-bold text-h-black">
        Trending Products
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pLoading || pFetching ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : !trendingProducts || trendingProducts?.length < 1 ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ProductEmpty action={<></>} />
          </div>
        ) : (
          (trendingProducts?.data as TProduct[])?.map((product) => (
            <Card key={product?.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;
