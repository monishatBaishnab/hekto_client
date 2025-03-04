import { useEffect, useMemo, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Grid2X2, List } from 'lucide-react';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductEmpty from '../empty/ProductEmpty';
import HPagination from '../HPagination';
import HPaginationSkeleton from '../skeletons/HPaginationSkeleton';
const sortOptions = [
  { key: 'createdAt', label: 'Default' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
];

type PContainerProps = {
  sidebar?: boolean;
  limit?: string;
  fetchMode?: 'infinity' | 'pagination';
};

const PContainer = ({
  sidebar = false,
  fetchMode = 'infinity',
  limit,
}: PContainerProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const carts = useAppSelector((state) => state.cart.carts);
  const { showAlert, AlertComponent } = useAlert();
  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get('category');

  const { ref, inView } = useInView();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string>('createdAt');
  const [maxLimit, setMaxLimit] = useState<string>(
    limit ? limit : sidebar ? '8' : '10'
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string | number>(0);
  const [maxPrice, setMaxPrice] = useState<string | number>(1000);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [products, setProducts] = useState<TProduct[]>([]); // State for storing fetched products

  const limitOptions = Array.from({ length: 4 })?.map((_, index) => {
    return {
      label: (index + 1) * (limit ? Number(limit) : sidebar ? 8 : 10),
      key: (index + 1) * (limit ? Number(limit) : sidebar ? 8 : 10),
    };
  });

  // Fetching products data using the query hook
  const {
    data: productsData,
    isLoading,
    isSuccess,
    isFetching,
  } = useFetchAllProductsQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: maxLimit },
    { name: 'sortBy', value: sort },
    { name: 'sortOrder', value: 'desc' },
    { name: 'min_price', value: String(minPrice) },
    { name: 'max_price', value: String(maxPrice) },
    { name: 'searchTerm', value: String(searchTerm) },
    { name: 'categories', value: categories.join(', ') },
  ]);

  const productsArr = fetchMode === 'infinity' ? products : productsData?.data;

  const handleAction = async (key: string, product: TProduct) => {
    if (key === 'details') {
      navigate(`/products/${product.id}`);
    }
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
    }
  };

  // Calculate total pages and check if more products can be fetched
  const totalPage =
    Math.ceil(
      Number(productsData?.meta?.total) / Number(productsData?.meta?.limit)
    ) ?? 1;

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
    if (fetchMode === 'pagination') return;
    setPage(1);
    setProducts([]);
  }, [categories, minPrice, maxPrice, searchTerm, sort, fetchMode]);

  // Effect to update products when new data is fetched
  useEffect(() => {
    if (fetchMode === 'pagination') return;
    if (isSuccess && !isLoading) {
      if (page > 1) {
        setProducts((prev) => [...prev, ...(productsData?.data as TProduct[])]);
      } else {
        setProducts(productsData?.data as TProduct[]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isLoading, productsData, fetchMode]);

  // Effect for infinite scroll: Load more products when the user reaches the bottom
  useEffect(() => {
    if (fetchMode === 'pagination') return;
    if (page < totalPage) {
      if (inView && isSuccess && !isFetching && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [inView, page, totalPage, isSuccess, isLoading, isFetching, fetchMode]);

  return (
    <div className="space-y-8">
      {AlertComponent}
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-10">
        <div>
          <h4 className="text-xl font-bold text-h-black">
            Your Next Favorite Product Awaits
          </h4>
          <p className="text-athens-gray-600">
            Showing Approx {productsData?.meta?.total} Results
          </p>
        </div>

        {/* Sorting and View Mode */}
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap md:gap-5">
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

          <div className="flex items-center gap-2">
            <span className="text-athens-gray-700">Show:</span>
            <Select defaultValue={maxLimit} onValueChange={setMaxLimit}>
              <SelectTrigger className="h-7 w-[100px] rounded-sm outline-none focus:ring-0">
                <SelectValue placeholder="8" />
              </SelectTrigger>
              <SelectContent>
                {limitOptions.map(({ key, label }) => (
                  <SelectItem key={label} value={String(key)}>
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
                ? 'col-span-1 md:col-span-2  lg:col-span-4'
                : 'col-span-1 sm:col-span-2 md:col-span-3  lg:col-span-5'
              : sidebar
                ? 'space-y-5 col-span-4'
                : 'space-y-5 col-span-5'
          )}
        >
          <div
            className={cn(
              viewMode === 'grid'
                ? sidebar
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4'
                  : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-5'
                : sidebar
                  ? 'space-y-5 col-span-4'
                  : 'space-y-5 col-span-5'
            )}
          >
            {isLoading || isFetching ? (
              Array.from({ length: Number(maxLimit) }).map((_, index) => (
                <PCardSkeleton
                  disabledShop
                  disabledDesc={viewMode === 'grid'}
                  variant={viewMode}
                  key={index}
                />
              ))
            ) : !productsArr || productsArr?.length < 1 ? (
              <div
                className={cn(
                  viewMode === 'grid'
                    ? sidebar
                      ? 'col-span-1 md:col-span-2  lg:col-span-4'
                      : 'col-span-1 sm:col-span-2 md:col-span-3  lg:col-span-5'
                    : sidebar
                      ? 'space-y-5 col-span-4'
                      : 'space-y-5 col-span-5'
                )}
              >
                <ProductEmpty action={<></>} />
              </div>
            ) : (
              (productsArr as TProduct[])?.map((product) => (
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
              ))
            )}
          </div>

          {/* Loader for Infinite Scroll */}
          {products?.length && (isFetching || canFetchMore) ? (
            <div
              ref={ref}
              className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <PCardSkeleton
                  disabledShop
                  disabledDesc={viewMode === 'grid'}
                  variant={viewMode}
                  key={index}
                />
              ))}
            </div>
          ) : null}
          {fetchMode === 'pagination' ? (
            !productsArr?.length && isLoading ? (
              <HPaginationSkeleton />
            ) : (
              <div
                className={cn(
                  'mt-5',
                  sidebar
                    ? 'col-span-1 md:col-span-2  lg:col-span-4'
                    : 'col-span-1 sm:col-span-2 md:col-span-3  lg:col-span-5'
                )}
              >
                <HPagination
                  page={page}
                  setPage={setPage}
                  totalPage={Math.ceil(
                    Number(productsData?.meta?.total) /
                      Number(productsData?.meta?.limit)
                  )}
                />
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PContainer;
