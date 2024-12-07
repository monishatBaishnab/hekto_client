import HPagination from '@/components/HPagination';
import RCard from '@/components/reviews/RCard';
const Reviews = () => {
  return (
    <div className="w-full space-y-8">
      <h3 className="text-2xl font-bold text-h-black">Reviews</h3>
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
