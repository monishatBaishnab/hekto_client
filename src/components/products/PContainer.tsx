import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Grid2X2, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import PCard from './PCard';

const sort_options = [
  { key: 'createdAt', label: 'Default' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
];

type TPContainer = {
  sidebar?: boolean;
};

const PContainer = ({ sidebar = false }: TPContainer) => {
  const [mode, setMode] = useState<'grid' | 'list'>('grid');
  return (
    <div className='space-y-8'>
      <div className="flex items-center justify-between gap-10">
        <div>
          <h4 className="text-xl font-bold text-h-black">
            Ecommerce Acceories & Fashion item
          </h4>
          <p className="text-athens-gray-600">About 1,300 Products</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-athens-gray-700">Sort By:</span>
            <Select>
              <SelectTrigger className="h-7 w-[100px] rounded-sm outline-none focus:ring-0">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                {sort_options?.map(({ key, label }) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-athens-gray-700">View:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMode('grid')}
                className="outline-none focus:outline-none"
              >
                <Grid2X2
                  className={cn(
                    'size-5',
                    mode == 'grid' ? 'stroke-h-black' : 'stroke-athens-gray-600'
                  )}
                />
              </button>
              <button
                onClick={() => setMode('list')}
                className="outline-none focus:outline-none"
              >
                <List
                  className={cn(
                    'size-5',
                    mode == 'grid' ? 'stroke-athens-gray-600' : 'stroke-h-black'
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        )}
      >
        <div className={cn(sidebar ? '' : 'hidden')}>sidebar</div>
        <div
          className={cn(
            mode === 'grid'
              ? sidebar
                ? 'col-span-1 grid grid-cols-1 md:col-span-2 md:grid-cols-2 lg:col-span-3 gap-5 lg:grid-cols-3'
                : 'col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:col-span-3 md:grid-cols-3 lg:col-span-4 gap-5 lg:grid-cols-4'
              : sidebar
                ? 'space-y-5 col-span-3'
                : 'space-y-5 col-span-4'
          )}
        >
          <PCard varient={mode} />
          <PCard varient={mode} />
          <PCard varient={mode} />
          <PCard varient={mode} />
        </div>
      </div>
    </div>
  );
};

export default PContainer;
