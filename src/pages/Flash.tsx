import ProductEmpty from '@/components/empty/ProductEmpty';
import { Card, CardSkeleton } from '@/components/home/FPContainer';
import PageHeader from '@/components/PageHeader';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import { TProduct } from '@/types/products.types';

const Flash = () => {
  const {
    data: flashSaleProducts,
    isLoading: pLoading,
    isFetching: pFetching,
  } = useFetchAllProductsQuery([
    { name: 'page', value: '1' },
    { name: 'limit', value: '4' },
  ]);

  return (
    <div className='space-y-10'>
      <PageHeader title="Flash Sale Products" />
      <div className="container !pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pLoading || pFetching ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : !flashSaleProducts || flashSaleProducts?.length < 1 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <ProductEmpty action={<></>} />
            </div>
          ) : (
            (flashSaleProducts?.data as TProduct[])?.map((product) => (
              <Card key={product?.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Flash;
