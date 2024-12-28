import HPagination from '@/components/HPagination';
import PageHeader from '@/components/PageHeader';
import { useFetchAllShopsQuery } from '@/redux/features/shops/shops.api';
import { TShop } from '@/types/shop.types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const {
    data: shops,
    isLoading,
    isFetching,
  } = useFetchAllShopsQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '10' },
  ]);

  return (
    <div>
      <PageHeader title="Explore All Stores" />
      <div className="container space-y-7">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading || isFetching
            ? Array.from({ length: 4 }).map((_, id) => (
                <div
                  key={id}
                  className="flex size-full animate-pulse items-center gap-4 space-y-1 rounded-lg bg-athens-gray-50 p-4"
                >
                  <div className="size-24 shrink-0 rounded-full bg-athens-gray-300"></div>
                  <div className="w-full grow space-y-2">
                    <div className="h-4 w-full rounded bg-athens-gray-300"></div>
                    <div className="h-3 w-full rounded bg-athens-gray-300"></div>
                    <div className="h-3 w-full rounded bg-athens-gray-300"></div>
                  </div>
                </div>
              ))
            : shops?.data?.map((shop: TShop) => (
                <div
                  onClick={() => navigate(`/shop/${shop.id}`)}
                  className="flex size-full cursor-pointer items-center gap-3 space-y-1 rounded-lg bg-athens-gray-50 p-4"
                >
                  <div className="size-24">
                    <img
                      className="size-full rounded-lg bg-white object-contain"
                      src={shop.logo}
                      alt={shop.name}
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-h-black">
                      {shop.name}
                    </h4>
                    <h4 className="text-sm text-athens-gray-700">
                      {shop.status}
                    </h4>
                    <p className="text-sm text-athens-gray-700">
                      Products : {shop?.product?.length}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        <HPagination
          page={page}
          setPage={setPage}
          totalPage={Math.ceil(
            Number(shops?.meta?.total) / Number(shops?.meta?.limit)
          )}
        />
      </div>
    </div>
  );
};

export default Shop;
