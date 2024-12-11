import DTitle from '@/components/dashboard/DTitle';
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
      { name: 'ship_id', value: userData?.shop?.id },
    ],
    { skip: !userData?.shop?.id }
  );
  console.log(data);
  return (
    <div className="w-full space-y-8">
      <DTitle title="Reviews" />

      <div className="space-y-8">
        {isLoading || isFetching
          ? null
          : data?.data?.map((review: TReview) => (
              <RCard key={review.id} review={review} />
            ))}
      </div>
      <HPagination page={page} setPage={setPage} totalPage={2} />
    </div>
  );
};

export default Reviews;
