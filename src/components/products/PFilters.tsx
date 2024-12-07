import { categories } from '@/constants/home.constants';
import { Checkbox } from '../ui/checkbox';
import { price_ranges } from '@/constants/products.constants';
import { Input } from '../ui/input';

const PFilters = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <h4 className="border-b-2 border-b-h-black pb-1 text-lg font-bold text-h-black">
          Search by keyword
        </h4>

        <Input
          className="outline-none !ring-0 focus:ring-0"
          placeholder="Write a keyword"
        />
      </div>
      <div className="space-y-5">
        <h4 className="border-b-2 border-b-h-black pb-1 text-lg font-bold text-h-black">
          Categories
        </h4>
        <div className="space-y-1">
          {categories?.map((category) => (
            <div key={category.label} className="flex items-center gap-2">
              <Checkbox
                className="size-5 rounded-sm border-none bg-rose-100 shadow-none data-[state=checked]:bg-rose-600"
                id={category.label}
              />
              <label htmlFor={category?.label}>{category.label}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <h4 className="border-b-2 border-b-h-black pb-1 text-lg font-bold text-h-black">
          Price Range
        </h4>
        <div className="space-y-1">
          {price_ranges?.map((range) => (
            <div key={range.label} className="flex items-center gap-2">
              <Checkbox
                className="size-5 rounded-sm border-none bg-rose-100 shadow-none data-[state=checked]:bg-rose-600"
                id={range.label}
              />
              <label htmlFor={range?.label}>{range.label}</label>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input
            className="outline-none !ring-0 focus:ring-0"
            placeholder="Min"
            type="number"
          />
          <Input
            className="outline-none !ring-0 focus:ring-0"
            placeholder="Max"
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default PFilters;
