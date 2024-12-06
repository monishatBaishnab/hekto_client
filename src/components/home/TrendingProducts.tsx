import { cn } from '@/lib/utils';
import PCard from '../products/PCard';

const Card = () => {
  return (
    <div className="group bg-white p-5 shadow-md">
      <div
        className={cn(
          'transition-all relative overflow-hidden h-[280px] w-full mb-5',
          'bg-athens-gray-50 p-7  group-hover:bg-dark-blue-100/70'
        )}
      >
        <img
          className="size-full object-contain"
          src="https://i.ibb.co.com/Pr0DDpz/image-1167.png"
          alt=""
        />

        {/* Card Icons */}
        <div
          className={cn(
            'flex items-center flex-col gap-2 transition-all duration-300',
            'absolute left-3 bottom-1 invisible opacity-0',
            'group-hover:bottom-3 group-hover:opacity-100 group-hover:visible'
          )}
        >
          <PCard.CardAction />
        </div>
      </div>
      <div className="space-y-2">
        <h4
          className={cn('font-bold text-deep-koamaru-900 text-lg text-center')}
        >
          Ultricies condimentum imperdiet
        </h4>
        <div className="flex items-center justify-center gap-2.5">
          <span className="text-h-black">$26.00</span>
          <span className="text-rose-600 line-through">$28.00</span>
        </div>
      </div>
    </div>
  );
};

const TrendingProducts = () => {
  return (
    <div className="container !pt-0">
      <h2 className="mb-8 text-center text-4xl font-bold text-h-black">
        Trending Products
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default TrendingProducts;
