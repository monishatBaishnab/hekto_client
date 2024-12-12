import { ReactNode } from 'react';

const ProductEmpty = ({ action }: { action: ReactNode }) => {

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-full w-96 overflow-hidden">
        <img
          className="size-full object-contain"
          src="https://i.ibb.co.com/z7K4Rjg/Group-123-1.png"
          alt="Not Found"
        />
      </div>
      <div className="space-y-2 text-center">
        <h4 className="text-lg font-semibold text-dark-blue-900">
          Oops! No data found.
        </h4>
        {action}
      </div>
    </div>
  );
};

export default ProductEmpty;
