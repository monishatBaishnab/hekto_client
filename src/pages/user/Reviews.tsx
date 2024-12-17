import DTitle from '@/components/dashboard/DTitle';
import ProductEmpty from '@/components/empty/ProductEmpty';
import HPagination from '@/components/HPagination';
import RCard from '@/components/reviews/RCard';
import useUser from '@/hooks/useUser';
import { useFetchAllReviewQuery } from '@/redux/features/review/review.api';
import { TReview } from '@/types/review.types';
import { useState } from 'react';
const Reviews = () => {
  const userData = useUser();
  const limit = 5;
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useFetchAllReviewQuery(
    [
      { name: 'limit', value: String(limit) },
      { name: 'page', value: String(page) },
      { name: 'shop_id', value: userData?.shop?.id as string },
    ],
    { skip: !userData?.shop?.id }
  );

  return (
    <div className="w-full space-y-8">
      <DTitle title="Reviews" />

      <div className="space-y-8">
        {!userData?.shop?.id || isLoading || isFetching ? (
          Array.from({ length: 4 }).map((_, id) => (
            <div
              key={id}
              className="animate-pulse space-y-5 border-b border-b-athens-gray-100 pb-8"
            >
              <div className="space-y-3 rounded-lg bg-athens-gray-50 p-6">
                {/* Reviewed User Info Skeleton */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-10 rounded-full bg-athens-gray-300"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 rounded bg-athens-gray-300"></div>
                      <div className="h-3 w-16 rounded bg-athens-gray-300"></div>
                    </div>
                  </div>
                  <div className="h-4 w-8 rounded bg-athens-gray-300"></div>
                </div>

                {/* Reviews Product Info Skeleton */}
                <div className="flex items-center gap-2">
                  <div className="h-3 w-20 rounded bg-athens-gray-300"></div>
                  <div className="h-3 w-32 rounded bg-athens-gray-300"></div>
                </div>

                {/* Review Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-athens-gray-300"></div>
                  <div className="h-3 w-4/5 rounded bg-athens-gray-300"></div>
                  <div className="h-3 w-3/4 rounded bg-athens-gray-300"></div>
                </div>

                {/* Reply & Report Skeleton */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-8 w-20 rounded-lg bg-athens-gray-300"></div>
                  <div className="h-4 w-16 rounded bg-athens-gray-300"></div>
                </div>
              </div>
            </div>
          ))
        ) : !data || data?.data?.length < 1 ? (
          <ProductEmpty action={<></>} />
        ) : (
          data?.data?.map((review: TReview) => (
            <RCard key={review.id} review={review} />
          ))
        )}
      </div>
      <HPagination
        page={page}
        setPage={setPage}
        totalPage={Math.ceil(
          Number(data?.meta?.total) / Number(data?.meta?.limit)
        )}
      />
    </div>
  );
};

export default Reviews;
