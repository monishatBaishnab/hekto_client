import PDetailsSkeleton from '@/components/skeletons/PDetailsSkeleton';
import { Button } from '@/components/ui/button';
import { useFetchProductByIdQuery } from '@/redux/features/products/products.api';
import { TCategory } from '@/types';
import { TProduct } from '@/types/products.types';
import { DollarSign, Tag } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useFetchProductByIdQuery(
    id as string,
    { skip: !id }
  );
  const productDetails: TProduct = data?.data || {};

  if (isLoading || isFetching) {
    return <PDetailsSkeleton />;
  }

  return (
    <div>
      <section>
        <div className="container grid grid-cols-1 gap-7 md:grid-cols-2">
          <div>
            <div className="h-60 w-full overflow-hidden border border-slate-200 bg-slate-50 p-5 sm:h-96">
              <img
                className="size-full object-cover"
                src={productDetails?.images}
                alt={productDetails?.name}
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-1 border-b border-athens-gray-200 pb-3">
              <h3 className="text-3xl font-semibold">{productDetails?.name}</h3>
            </div>
            <div className="space-y-2 border-b border-b-athens-gray-200 pb-3">
              <div className="flex items-center gap-1 text-sm font-medium">
                <DollarSign className="mt-[1.5px] text-lg text-athens-gray-500" />
                <h4 className="text-2xl font-bold text-rose-600">
                  {productDetails?.price}
                </h4>
              </div>
              <p className="text-athens-gray-600">
                {productDetails.description}
              </p>
            </div>
            <div>
              <div className="mb-4">
                <Button>Add to cart</Button>
              </div>
              <h5 className="mb-2 font-semibold text-athens-gray-950">Tags</h5>
              <div className="flex items-center gap-2">
                {(productDetails?.categories as TCategory[])?.map(
                  ({ id, name }) => (
                    <Button key={id} variant="light" size="sm" className="h-7">
                      <Tag className="!size-[13px]" />
                      {name}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
