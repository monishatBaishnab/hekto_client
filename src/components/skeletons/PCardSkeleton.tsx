import { cn } from '@/lib/utils';

type TClassNames = {
  imgWrapper?: string;
  img?: string;
  wrapper?:string
};

type TCardSkeleton ={
  variant?: 'grid' | 'list';
  disabledDesc?: boolean;
  disabledShop?: boolean;
  classNames?: TClassNames;
}

const PCardSkeleton = ({
  variant = 'grid',
  disabledDesc = false,
  disabledShop = false,
  classNames = {},
}: TCardSkeleton) => {
  return (
    <div
      className={cn(
        variant === 'grid' ? 'space-y-5' : 'flex items-center space-x-5',
        'relative overflow-hidden rounded-md bg-athens-gray-50/40',
        'border border-dashed border-athens-gray-100 animate-pulse',
        classNames?.wrapper
      )}
    >
      {/* Thumbnail Skeleton */}
      <div
        className={cn(
          'bg-athens-gray-200',
          variant === 'grid' ? 'h-[280px] w-full' : 'h-full w-[290px] shrink-0',
          classNames?.imgWrapper
        )}
      ></div>

      {/* Content Skeleton */}
      <div className="flex-1 space-y-3 px-5">
        {/* Title Skeleton */}
        <div className="h-6 w-3/4 rounded-md bg-athens-gray-200"></div>

        {/* Description Skeleton */}
        {!disabledDesc && (
          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-athens-gray-200"></div>
            <div className="h-4 w-5/6 rounded-md bg-athens-gray-200"></div>
          </div>
        )}

        {/* Price & Rating Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-5 w-20 rounded-md bg-athens-gray-200"></div>
          <div className="h-5 w-16 rounded-md bg-athens-gray-200"></div>
        </div>

        {/* Shop Skeleton */}
        {!disabledShop && (
          <div className="flex items-center gap-3 border-t border-athens-gray-100 pt-3">
            <div className="size-8 rounded-md bg-athens-gray-200"></div>
            <div>
              <div className="h-5 w-24 rounded-md bg-athens-gray-200"></div>
              <div className="h-4 w-16 rounded-md bg-athens-gray-200"></div>
            </div>
          </div>
        )}
      </div>

      {/* Actions Skeleton */}
      {variant === 'grid' && (
        <div className="absolute bottom-3 left-3 flex flex-col gap-2 opacity-50">
          <div className="size-8 rounded-full bg-athens-gray-200"></div>
          <div className="size-8 rounded-full bg-athens-gray-200"></div>
          <div className="size-8 rounded-full bg-athens-gray-200"></div>
        </div>
      )}
    </div>
  );
};

export default PCardSkeleton;
