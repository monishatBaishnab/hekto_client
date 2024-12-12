import ProductEmpty from '@/components/empty/ProductEmpty';
import { Card, CardSkeleton } from '@/components/home/TrendingProducts';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import { useFetchSingleShopQuery } from '@/redux/features/shops/shops.api';
import { TProduct } from '@/types/products.types';
import { Rss } from 'lucide-react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const ShopDetails = () => {
  const { id: paramsId } = useParams();
  const { data: shopDetails } = useFetchSingleShopQuery(paramsId as string, {
    skip: !paramsId,
  });
  const { name, logo, description, id, createdAt } = shopDetails?.data || {};

  const { data, isLoading, isFetching } = useFetchAllProductsQuery(
    [{ name: 'shop_id', value: id }],
    {
      skip: !id,
    }
  );

  return (
    <div>
      <PageHeader title={`${name}`} />
      <div className="container">
        <div>
          <div className="mb-5 flex items-center gap-5 border-b pb-5">
            <div className="flex shrink-0 flex-wrap items-center gap-8">
              {logo ? (
                <div className="size-24 shrink-0 overflow-hidden rounded-md">
                  <img
                    className="size-full object-cover"
                    src={logo}
                    alt={name}
                  />
                </div>
              ) : null}
            </div>

            {/* Profile Info */}
            <div className="space-y-2">
              <div>
                <h4 className="text-xl font-bold text-h-black">{name}</h4>
                <p className="text-sm text-athens-gray-800">
                  Join on: {moment(createdAt).format('DD MMM, YYYY')}
                </p>
              </div>
              <p className="!mb-3 text-athens-gray-600">{description}</p>
              <Button variant="light" className="rounded-md">
                <Rss />
                Follow Shop
              </Button>
            </div>
          </div>
        </div>

        <div className='space-y-7'>
          <h4 className="text-xl font-bold text-h-black">
            Products of this shop.
          </h4>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading || isFetching ? (
              Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            ) : !data || data?.data?.length < 1 ? (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                <ProductEmpty action={<></>} />
              </div>
            ) : (
              (data?.data as TProduct[])?.map((product) => (
                <Card key={product?.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
