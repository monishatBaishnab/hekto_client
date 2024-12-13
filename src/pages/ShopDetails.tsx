import ProductEmpty from '@/components/empty/ProductEmpty';
import { Card, CardSkeleton } from '@/components/home/FPContainer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useFollowShopMutation } from '@/redux/features/follow/follow.api';
import { useFetchAllProductsQuery } from '@/redux/features/products/products.api';
import { useFetchSingleShopQuery } from '@/redux/features/shops/shops.api';
import { useAppSelector } from '@/redux/hooks';
import { TProduct } from '@/types/products.types';
import { Rss } from 'lucide-react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ShopDetails = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { id: paramsId } = useParams();
  const { data: shopDetails } = useFetchSingleShopQuery(paramsId as string, {
    skip: !paramsId,
  });
  const { name, logo, description, id, createdAt, follow } =
    shopDetails?.data || {};
  const [followShop] = useFollowShopMutation();
  const { data, isLoading, isFetching } = useFetchAllProductsQuery(
    [{ name: 'shop_id', value: id }],
    {
      skip: !id,
    }
  );

  const isFollowed = follow?.find(
    (fl: { user_id: string }) => fl.user_id === user?.id
  );

  const handleFollow = async () => {
    const result = await followShop({ shop_id: id }).unwrap();
    if (result.success) {
      toast.success('Followed this shop.');
    }
  };

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
              <Button
                disabled={isFollowed?.user_id}
                onClick={handleFollow}
                variant="light"
                className="rounded-md"
              >
                <Rss />
                {isFollowed ? 'Following' : 'Follow Shop'}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-7">
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
