const PDetailsSkeleton = () => {
  return (
    <div>
      <section>
        <div className="container grid grid-cols-1 gap-7 md:grid-cols-2">
          <div>
            <div className="h-60 w-full animate-pulse bg-slate-200 sm:h-96" />
          </div>
          <div className="space-y-3">
            <div className="space-y-1 border-b border-athens-gray-200 pb-3">
              <div className="h-8 w-3/4 animate-pulse bg-slate-200" />
            </div>
            <div className="space-y-2 border-b border-b-athens-gray-200 pb-3">
              <div className="flex items-center gap-1 text-sm font-medium">
                <div className="size-6 animate-pulse rounded-full bg-slate-200" />
                <div className="h-6 w-20 animate-pulse bg-slate-200" />
              </div>
              <div className="h-5 w-full animate-pulse bg-slate-200" />
              <div className="h-5 w-4/5 animate-pulse bg-slate-200" />
            </div>
            <div>
              <div className="mb-4">
                <div className="h-10 w-32 animate-pulse rounded bg-slate-200" />
              </div>
              <h5 className="mb-2 h-6 w-20 animate-pulse bg-slate-200" />
              <div className="flex gap-2">
                <div className="h-7 w-16 animate-pulse rounded bg-slate-200" />
                <div className="h-7 w-16 animate-pulse rounded bg-slate-200" />
                <div className="h-7 w-16 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PDetailsSkeleton;
