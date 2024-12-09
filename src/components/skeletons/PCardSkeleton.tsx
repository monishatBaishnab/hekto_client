import { cn } from '@/lib/utils';

type TPCardSkeleton = {
  varient?: 'grid' | 'list';
};

const PCardSkeleton = ({ varient = 'grid' }: TPCardSkeleton) => {
  return (
    <div
      className={cn(
        varient === 'grid' ? 'space-y-5' : 'flex items-center',
        'relative overflow-hidden rounded-md bg-athens-gray-50/40',
        'border border-dashed border-athens-gray-100 animate-pulse'
      )}
    >
      {/* Skeleton Thumb */}
      <div
        className={cn(
          'relative overflow-hidden bg-athens-gray-300',
          varient === 'grid' ? 'h-[280px] w-full' : 'h-[230px] w-[290px] shrink-0'
        )}
      >
        {/* Icons Placeholder */}
        <div
          className={cn(
            varient === 'grid' ? 'flex' : 'hidden',
            'absolute left-3 bottom-3 items-center flex-col gap-2'
          )}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="size-6 rounded-full bg-athens-gray-400"
            />
          ))}
        </div>
      </div>

      {/* Skeleton Main Body */}
      <div className="w-full space-y-3 px-5">
        {/* Title Placeholder */}
        <div
          className={cn(
            'h-6 bg-athens-gray-300 rounded-md',
            varient === 'grid' ? 'w-3/4' : 'w-full'
          )}
        />

        {/* Description Placeholder */}
        {varient !== 'grid' && (
          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-athens-gray-300" />
            <div className="h-4 w-5/6 rounded-md bg-athens-gray-300" />
          </div>
        )}

        {/* Price & Rating Placeholder */}
        <div className="flex items-center gap-4">
          {/* Price Placeholder */}
          <div className="h-6 w-1/3 rounded-md bg-athens-gray-300" />
          {/* Rating Placeholder */}
          <div className="h-6 w-1/4 rounded-md bg-athens-gray-300" />
        </div>

        {/* Shop Placeholder */}
        <div
          className={cn(
            'border-t border-dashed border-athens-gray-100 pt-2',
            varient === 'grid' ? 'py-2' : 'flex items-center justify-between'
          )}
        >
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-athens-gray-300" />
            <div className="space-y-1">
              <div className="h-4 w-24 rounded-md bg-athens-gray-300" />
              <div className="h-3 w-16 rounded-md bg-athens-gray-300" />
            </div>
          </div>
          {varient !== 'grid' && (
            <div className="flex items-center gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="size-6 rounded-full bg-athens-gray-400"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PCardSkeleton;
