import ProductEmpty from '@/components/empty/ProductEmpty';
import { Card, CardSkeleton } from '@/components/home/FPContainer';
import HPagination from '@/components/HPagination';
import PageHeader from '@/components/PageHeader';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import { TProduct } from '@/types/products.types';
import { useState } from 'react';

const Flash = () => {
  const [page, setPage] = useState(1);
  const {
    data: flashSaleProducts,
    isLoading: pLoading,
    isFetching: pFetching,
  } = useFetchAllProductsQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '10' },
    { name: 'flash_sale', value: 'true' },
  ]);

  return (
    <div className="space-y-10">
      <PageHeader title="Flash Sale Products" />
      <div className="container space-y-10 !pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {pLoading || pFetching ? (
            Array.from({ length: 5 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : !flashSaleProducts?.data || flashSaleProducts?.data?.length < 1 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-5">
              <ProductEmpty action={<></>} />
            </div>
          ) : (
            (flashSaleProducts?.data as TProduct[])?.map((product) => (
              <Card key={product?.id} product={product} />
            ))
          )}
        </div>
        {flashSaleProducts?.data?.length ? (
          <HPagination
            page={page}
            setPage={setPage}
            totalPage={Math.ceil(
              Number(flashSaleProducts?.meta?.total) /
                Number(flashSaleProducts?.meta?.limit)
            )}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Flash;
