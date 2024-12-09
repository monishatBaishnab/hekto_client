import { cn } from '@/lib/utils';
import PCard from '../products/PCard';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import { TProduct } from '@/types/products.types';

const Skeleton = () => {
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

const Card = ({ product }: { product: TProduct }) => {
  return (
    <div className="group bg-white p-5 shadow-md">
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
          <PCard.CardAction />
        </div>
      </div>
      <div className="space-y-2">
        <h4
          className={cn('font-bold text-deep-koamaru-900 text-lg text-center')}
        >
          {product.name}
        </h4>
        <div className="flex items-center justify-center gap-2.5">
          <span className="text-h-black">{product.price}</span>
          <span className="text-rose-600 line-through">$28.00</span>
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
        {pLoading || pFetching
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : (trendingProducts?.data as TProduct[])?.map((product) => (
              <Card key={product?.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
