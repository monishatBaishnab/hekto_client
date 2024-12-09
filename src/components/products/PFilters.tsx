import { Checkbox } from '../ui/checkbox';
import { price_ranges } from '@/constants/products.constants';
import { Input } from '../ui/input';
import { useFetchAllCategoriesQuery } from '@/redux/features/categories/categories.api';
import { TCategory } from '@/types';
import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type TFilters = {
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setMinPrice: React.Dispatch<React.SetStateAction<number | string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | string>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
};

const PFilters = ({
  setCategories,
  setMinPrice,
  setMaxPrice,
  setSearchTerm,
  categories,
}: TFilters) => {
  const { data: categoriesData } = useFetchAllCategoriesQuery([]);
  const [search, setSearch] = useState('');
  const handleCategoryChange = (
    isChecked: boolean | string,
    categoryId: string
  ) => {
    if (isChecked) {
      setCategories((prev) => [...prev, categoryId]);
    } else {
      setCategories((prev) => prev.filter((prevId) => prevId !== categoryId));
    }
  };
  const handlePriceRangeChange = (range: string) => {
    const minPrice = range.split(' - ').map((str) => str.slice(1, -1))[0];
    const maxPrice = range.split(' - ').map((str) => str.slice(1, -1))[1];

    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  useEffect(() => {
    setTimeout(() => {
      setSearchTerm(search);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <h4 className="border-b-2 border-b-h-black pb-1 text-lg font-bold text-h-black">
          Search by keyword
        </h4>

        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none !ring-0 focus:ring-0"
          placeholder="Write a keyword"
        />
      </div>
      <div className="space-y-5">
        <h4 className="border-b-2 border-b-h-black pb-1 text-lg font-bold text-h-black">
          Categories
        </h4>
        <div className="space-y-1">
          {categoriesData?.data?.map((category: TCategory) => (
            <div key={category.name} className="flex items-center gap-2">
              <Checkbox
                checked={categories?.includes(category.id)}
                onCheckedChange={(e) => handleCategoryChange(e, category.id)}
                className="size-5 rounded-sm border-none bg-rose-100 shadow-none data-[state=checked]:bg-rose-600"
                id={category.name}
                value={category.id}
              />
              <label htmlFor={category?.name}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <h4 className="border-b-2 border-b-h-black pb-1 text-lg font-bold text-h-black">
          Price Range
        </h4>
        <RadioGroup onValueChange={handlePriceRangeChange}>
          <div className="space-y-1">
            {price_ranges?.map((range) => (
              <div key={range.label} className="flex items-center gap-2">
                <RadioGroupItem value={range.label} id={range.label} />
                <label htmlFor={range?.label}>{range.label}</label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PFilters;
