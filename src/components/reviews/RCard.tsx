import { Info, Reply, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TRCard = {
  varient?: 'reply' | 'default';
  reply?: ReactNode | undefined;
};

const RCard = ({ varient = 'default', reply: RReply = undefined }: TRCard) => {
  return (
    <div
      className={cn(
        'space-y-5',
        varient === 'default' && 'border-b border-b-athens-gray-100 pb-8'
      )}
    >
      <div
        className={cn(
          'space-y-3',
          varient === 'reply' ? 'bg-athens-gray-50 p-6 rounded-lg' : ''
        )}
      >
        {/* Reviewed User Info */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10 overflow-hidden rounded-full">
              <img src="https://i.ibb.co.com/5G1XTfb/customer.webp" alt="" />
            </div>

            <div>
              <h6 className="-mb-1 font-bold text-h-black">Randy Walker</h6>
              <span className="text-sm text-athens-gray-600">Nov 12, 2024</span>
            </div>
          </div>
          {varient !== 'reply' && (
            <div className="flex items-center gap-0.5">
              <Star className="size-4 stroke-orange-400" />
              <Star className="size-4 stroke-orange-400" />
              <Star className="size-4 stroke-orange-400" />
              <Star className="size-4 stroke-orange-400" />
              <Star className="size-4 stroke-orange-400" />
            </div>
          )}
        </div>

        {/* Reviews Product Info */}
        {varient !== 'reply' && (
          <div className="flex items-center gap-2">
            <span className="text-athens-gray-600">Review On: </span>
            <span className="text-athens-gray-950">
              67-04 Myrtle Ave Glendale, NY 11385
            </span>
          </div>
        )}

        {/* Review */}
        <p className="text-athens-gray-700">
          Excellent apartment in the very center of the city, attractions and
          entertainment venues are located 50m from the flat. The flat was
          perfectly clean and had basic slippers, gel-shampoo, clean towels.
        </p>

        {/* Reply & Report */}
        {varient !== 'reply' && !RReply && (
          <div className="flex items-center justify-between">
            <Button variant="light" className="rounded-lg" size="sm">
              <Reply /> Reply
            </Button>
            <button className="flex items-center gap-1 text-sm font-medium">
              <Info className="mt-0.5 size-3" />
              Report
            </button>
          </div>
        )}
      </div>
      {RReply}
    </div>
  );
};

export default RCard;
