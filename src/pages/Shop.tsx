import HPagination from '@/components/HPagination';
import PageHeader from '@/components/PageHeader';
import { useFetchAllShopsQuery } from '@/redux/features/shops/shops.api';
import { TShop } from '@/types/shop.types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
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
            ? null
            : shops?.data?.map((shop: TShop) => (
                <div className="flex size-full flex-col items-center space-y-1 rounded-lg bg-athens-gray-50 p-4">
                  <div className="size-24">
                    <img
                      className="size-full object-contain"
                      src={shop.logo}
                      alt={shop.name}
                    />
                  </div>
                  <Link
                    to={`/shop/${shop.id}`}
                    className="text-lg font-bold text-h-black"
                  >
                    {shop.name}
                  </Link>
                  <h4 className="text-sm text-athens-gray-700">
                    {shop.status}
                  </h4>
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
