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
import { Link, useNavigate } from 'react-router-dom';
import { addToRecent } from '@/redux/features/recent/recent.slice';
import { MoveRight } from 'lucide-react';

export const CardSkeleton = () => {
  return (
    <div className="group rounded-md bg-white p-5 shadow-md">
      {/* Skeleton Image Container */}
      <div className="relative mb-5 h-[200px] w-full animate-pulse overflow-hidden rounded-lg bg-athens-gray-200 transition-all"></div>

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

export const Card = ({ product, isFlash=false }: { product: TProduct; isFlash?:boolean }) => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.cart.carts);

  const user = useAppSelector((state) => state.auth.user);
  const { showAlert, AlertComponent } = useAlert();
  const handleAddToRecent = () => {
    dispatch(addToRecent({ product } as { product: TProduct }));
  };

  const handleAction = async (key: string, product: TProduct) => {
    if (!user) {
      toast.error('Please login first.');
      return;
    }

    if (key === 'cart') {
      const cartInfo = {
        productId: product.id,
        shopId: product.shop_id,
        product,
        quantity: 1,
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
            if (cart.quantity + cartInfo.quantity < 4) {
              dispatch(addToCart(cartInfo));
              toast.error('Product added to the cart.');
              return;
            } else {
              toast.error('Cannot add more than 5 units of this product.');
              return;
            }
          }
        }
      }

      // Add product if no conflicts
      dispatch(addToCart(cartInfo));
      toast.success('Product added to the cart.');
    } else if (key === 'compare') {
      console.log('You clicked to compare the product.');
    }
  };

  return (
    <div className="group rounded-md bg-white p-5 shadow-md">
      {AlertComponent}
      <div
        className={cn(
          'transition-all relative overflow-hidden h-[200px] w-full mb-5',
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
        {/* Flash */}
        {isFlash && <div
          className={cn(
            'absolute left-3 top-3 text-sm bg-electric-violet-700 rounded-md px-2 text-white pb-0.5'
          )}
        >
          <span>Flash Sale</span>
        </div>}
      </div>
      <div className="space-y-2">
        <Link
          onClick={handleAddToRecent}
          to={`/products/${product.id}`}
          className={cn(
            'font-bold block text-deep-koamaru-900 text-lg text-center'
          )}
        >
          {Number(product?.name?.length) > 17
            ? product?.name?.slice(0, 17) + '..'
            : product?.name}
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

const FPContainer = () => {
  const navigate = useNavigate();
  const {
    data: flashProducts,
    isLoading,
    isFetching,
  } = useFetchAllProductsQuery([
    { name: 'page', value: '1' },
    { name: 'limit', value: '5' },
  ]);

  return (
    <div className="container !pt-0">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-h-black sm:text-4xl">
          Flash Sale
        </h2>
        <button
          onClick={() => navigate('/flash')}
          className="flex items-center gap-3 rounded-md text-athens-gray-700 transition-all hover:text-athens-gray-900"
        >
          See All <MoveRight className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {isLoading || isFetching ? (
          Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : !flashProducts || flashProducts?.length < 1 ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ProductEmpty action={<></>} />
          </div>
        ) : (
          (flashProducts?.data as TProduct[])?.map((product) => (
            <Card key={product?.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default FPContainer;
