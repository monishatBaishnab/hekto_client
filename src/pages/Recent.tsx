import ProductEmpty from '@/components/empty/ProductEmpty';
import { Card } from '@/components/home/FPContainer';
import PageHeader from '@/components/PageHeader';
import { useAppSelector } from '@/redux/hooks';
import { TProduct } from '@/types/products.types';

const Recent = () => {
  const recentProducts = useAppSelector((state) => state.recent.recentProducts);

  return (
    <div>
      <PageHeader title="Recent Viewed Products" />
      <div className="container space-y-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recentProducts?.length < 1 ? (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <ProductEmpty action={<></>} />
            </div>
          ) : (
            recentProducts?.map(({ product }: { product: TProduct }) => (
              <Card key={product?.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Recent;
