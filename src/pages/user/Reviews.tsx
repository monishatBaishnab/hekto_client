import DTitle from '@/components/dashboard/DTitle';
import HPagination from '@/components/HPagination';
import RCard from '@/components/reviews/RCard';
const Reviews = () => {
  return (
    <div className="w-full space-y-8">
      <DTitle title='Reviews' />

      <div className="space-y-8">
        <RCard reply={<RCard varient="reply" />} />
        <RCard />
        <RCard reply={<RCard varient="reply" />} />
      </div>
      <HPagination />
    </div>
  );
};

export default Reviews;
