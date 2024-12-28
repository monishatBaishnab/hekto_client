const HPaginationSkeleton = () => {
  return (
    <div
      className="flex animate-pulse items-center justify-center space-x-2 py-4"
      aria-label="pagination-loading"
    >
      {/* Previous Button Skeleton */}
      <div className="h-8 w-24 rounded-md bg-gray-200"></div>

      {/* Page Numbers Skeleton */}
      <div className="flex space-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="size-8 rounded-md bg-gray-200"></div>
        ))}
      </div>

      {/* Next Button Skeleton */}
      <div className="h-8 w-24 rounded-md bg-gray-200"></div>
    </div>
  );
};

export default HPaginationSkeleton;
