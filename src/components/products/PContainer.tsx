import { useEffect, useMemo, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Grid2X2, List, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import PCard from './PCard';
import PFilters from './PFilters';
import { TProduct } from '@/types/products.types';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import PCardSkeleton from '../skeletons/PCardSkeleton';
import { useInView } from 'react-intersection-observer';
import { user_actions } from '@/constants/products.constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart } from '@/redux/features/cart/cart.slice';
import { useAlert } from '@/hooks/useAlert';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';

const sortOptions = [
  { key: 'createdAt', label: 'Default' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
];

type PContainerProps = {
  sidebar?: boolean;
  limit?: number;
};

const PContainer = ({ sidebar = false, limit }: PContainerProps) => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.carts);
  const { showAlert, AlertComponent } = useAlert();
  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get('category');

  const { ref, inView } = useInView();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string>('createdAt');
  const [categories, setCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string | number>(0);
  const [maxPrice, setMaxPrice] = useState<string | number>(1000);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [products, setProducts] = useState<TProduct[]>([]); // State for storing fetched products

  // Fetching products data using the query hook
  const {
    data: productsData,
    isLoading,
    isSuccess,
    isFetching,
  } = useFetchAllProductsQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: limit ? String(limit) : '4' },
    { name: 'sortBy', value: sort },
    { name: 'sortOrder', value: 'desc' },
    { name: 'min_price', value: String(minPrice) },
    { name: 'max_price', value: String(maxPrice) },
    { name: 'searchTerm', value: String(searchTerm) },
    { name: 'categories', value: categories.join(', ') },
  ]);

  const handleAction = (key: string, product: TProduct) => {
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
    } else if (key == 'compere') {
      console.log('Your are clicked for compere product.');
      return;
    }
  };

  // Calculate total pages and check if more products can be fetched
  const totalPage = productsData?.meta?.total ?? 1;
  const canFetchMore = useMemo(
    () => products.length < productsData?.meta?.total,
    [products, productsData]
  );

  useEffect(() => {
    if (searchCategory) {
      setCategories([searchCategory]);
    }
  }, [searchCategory]);

  // Effect to refetch products when filter values change
  useEffect(() => {
    setPage(1);
    setProducts([]);
  }, [categories, minPrice, maxPrice, searchTerm, sort]);

  // Effect to update products when new data is fetched
  useEffect(() => {
    if (isSuccess && !isLoading) {
      if (page > 1) {
        setProducts((prev) => [...prev, ...(productsData?.data as TProduct[])]);
      } else {
        setProducts(productsData?.data as TProduct[]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isLoading, productsData]);

  // Effect for infinite scroll: Load more products when the user reaches the bottom
  useEffect(() => {
    if (inView && page < totalPage) {
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
      }, 2000);
    }
  }, [inView, page, totalPage]);

  return (
    <div className="space-y-8">
      {AlertComponent}
      {/* Header Section */}
      <div className="flex items-center justify-between gap-10">
        <div>
          <h4 className="text-xl font-bold text-h-black">
            Your Next Favorite Product Awaits
          </h4>
          <p className="text-athens-gray-600">Showing 116 Results</p>
        </div>

        {/* Sorting and View Mode */}
        <div className="flex items-center gap-6">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-athens-gray-700">Sort By:</span>
            <Select defaultValue={sort} onValueChange={setSort}>
              <SelectTrigger className="h-7 w-[100px] rounded-sm outline-none focus:ring-0">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(({ key, label }) => (
                  <SelectItem key={label} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-athens-gray-700">View:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className="outline-none focus:outline-none"
              >
                <Grid2X2
                  className={cn(
                    'size-5',
                    viewMode === 'grid'
                      ? 'stroke-h-black'
                      : 'stroke-athens-gray-600'
                  )}
                />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="outline-none focus:outline-none"
              >
                <List
                  className={cn(
                    'size-5',
                    viewMode === 'list'
                      ? 'stroke-h-black'
                      : 'stroke-athens-gray-600'
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className={cn(
          'grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        )}
      >
        {/* Sidebar Filters */}
        {sidebar && (
          <PFilters
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setSearchTerm={setSearchTerm}
            setCategories={setCategories}
            categories={categories}
          />
        )}

        {/* Product Cards */}
        <div
          className={cn(
            viewMode === 'grid'
              ? sidebar
                ? 'col-span-1 md:col-span-2  lg:col-span-3 '
                : 'col-span-1 sm:col-span-2 md:col-span-3  lg:col-span-4'
              : sidebar
                ? 'space-y-5 col-span-3'
                : 'space-y-5 col-span-4'
          )}
        >
          <div
            className={cn(
              viewMode === 'grid'
                ? sidebar
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3'
                  : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4'
                : sidebar
                  ? 'space-y-5 col-span-3'
                  : 'space-y-5 col-span-4'
            )}
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <PCardSkeleton varient={viewMode} key={index} />
                ))
              : (products as TProduct[])?.map((product) => (
                  <div>
                    <PCard
                      product={product}
                      varient={viewMode}
                      key={product.id}
                      actions={
                        <PCard.CardActions
                          actions={user_actions}
                          variant={viewMode}
                          onClick={handleAction}
                          product={product}
                        />
                      }
                    />
                  </div>
                ))}
          </div>
          {/* Loader for Infinite Scroll */}
          {isFetching || canFetchMore ? (
            <div
              ref={ref}
              className="mt-5 flex h-20 w-full animate-pulse items-center justify-center bg-gradient-to-l from-white via-athens-gray-50 to-white"
            >
              <LoaderCircle className="size-10 animate-spin stroke-athens-gray-600" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PContainer;
