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
        {isLoading || isFetching ? null : !data || data?.data?.length < 1 ? (
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
