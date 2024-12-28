import * as React from 'react';
import { Button } from '@/components/ui/button'; // Adjust import based on your project
import { ListOrdered } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TCategory } from '@/types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFetchAllCategoriesQuery } from '@/redux/features/categories/categories.api';

const HoverDropdownMenu = () => {
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading,
    isFetching,
  } = useFetchAllCategoriesQuery([{ name: 'limit', value: '6' }]);
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-none">
        <Button
          onMouseEnter={() => setOpen(true)}
          variant="light"
          className="rounded-md"
        >
          <ListOrdered />
          <span className="hidden sm:block">Categories</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        align="start"
      >
        {isLoading || isFetching
          ? Array.from({ length: 6 }).map((_, id) => (
              <DropdownMenuItem className="cursor-pointer" key={id}>
                <div
                  key={id}
                  className="flex animate-pulse items-center gap-2 pr-4"
                >
                  {/* Skeleton for the circular image */}
                  <div className="size-9 rounded-full bg-gray-300"></div>

                  {/* Skeleton for the text */}
                  <div className="flex-1">
                    <div className="h-4 w-24 rounded bg-gray-300"></div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          : categories?.data?.map((category: TCategory) => (
              <DropdownMenuItem
                onClick={() => navigate(`/products?category=${category?.id}`)}
                className="cursor-pointer"
                key={category?.name}
              >
                <div className="flex items-center gap-2 pr-4">
                  <div className="flex items-center">
                    <div className="size-9 overflow-hidden rounded-full">
                      <img src={category?.image} alt={category?.name} />
                    </div>
                  </div>
                  <h5 className="block font-medium text-h-black">
                    {category?.name}
                  </h5>
                </div>
              </DropdownMenuItem>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HoverDropdownMenu;
