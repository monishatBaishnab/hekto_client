const CategorySkeleton = () => {
  return (
    <div className="flex size-full cursor-pointer flex-col items-center rounded-lg bg-athens-gray-50 p-4 transition-all hover:bg-athens-gray-100/70 active:bg-athens-gray-50">
      {/* Skeleton Image */}
      <div className="size-24 animate-pulse rounded-md bg-athens-gray-200"></div>

      {/* Skeleton Title */}
      <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-athens-gray-200"></div>

      {/* Skeleton Description */}
      <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-athens-gray-200"></div>
    </div>
  );
};

export default CategorySkeleton;
