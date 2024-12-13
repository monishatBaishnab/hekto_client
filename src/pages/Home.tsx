import Header from '@/components/home/Header';
import FPContainer from '@/components/home/FPContainer';
import PContainer from '@/components/products/PContainer';
import CategorySkeleton from '@/components/skeletons/CategorySkeleton';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useFetchAllCategoriesQuery } from '@/redux/features/categories/categories.api';
import { TCategory } from '@/types';
import { CircleCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading: cLoading,
    isFetching: cFetching,
  } = useFetchAllCategoriesQuery([]);

  return (
    <div>
      <div>
        <Header />

        {/* Categories */}
        <div className="container">
          <h2 className="mb-8 text-center text-4xl font-bold text-h-black">
            Top Categories
          </h2>
          <Carousel>
            <CarouselContent className="justify-center">
              {cLoading || cFetching
                ? Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      className="basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/6"
                      key={index}
                    >
                      <CategorySkeleton />
                    </CarouselItem>
                  ))
                : (categories?.data as TCategory[])?.map(
                    ({ name, description, image, id }) => (
                      <CarouselItem
                        className="basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/6"
                        key={id}
                        onClick={() => navigate(`/products?category=${id}`)}
                      >
                        <div className="flex size-full cursor-pointer flex-col items-center rounded-lg bg-athens-gray-50 p-4 transition-all hover:bg-athens-gray-100/70 active:bg-athens-gray-50">
                          <div className="size-24">
                            <img
                              className="size-full object-contain"
                              src={image}
                              alt={name}
                            />
                          </div>
                          <h4 className="text-lg font-bold text-h-black">
                            {name}
                          </h4>
                          <h4 className="text-sm text-athens-gray-700">
                            {description}
                          </h4>
                        </div>
                      </CarouselItem>
                    )
                  )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <FPContainer />

        <div className="bg-athens-gray-50">
          <div className="container flex flex-wrap items-center justify-center gap-7 !py-5">
            <div className="h-96 w-full shrink-0 overflow-hidden md:w-[calc(50%_-_14px)]">
              <img
                className="size-full object-contain"
                src="https://i.ibb.co.com/bX9bvBH/Group-153.png"
                alt=""
              />
            </div>
            <div className="w-full shrink-0 space-y-5 md:w-[calc(50%_-_14px)]">
              <h2 className="text-3xl font-bold text-h-black">
                Unique Features Of leatest & <br />
                Trending Poducts
              </h2>
              <ul className="space-y-2">
                {[
                  'Quality and Durability',
                  'Affordability and Deals',
                  'Convenience and Accessibility',
                  'Customer Reviews and Reputation',
                ].map((item) => (
                  <li
                    className="flex items-center gap-1 text-athens-gray-700"
                    key={item}
                  >
                    <CircleCheck className="size-4 stroke-rose-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="rounded-none" size="lg" variant="rose">
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        <div className="container space-y-14">
          <h2 className="text-center text-4xl font-bold text-h-black">
            Only for you
          </h2>

          <PContainer sidebar />
        </div>

        <div className="bg-[url(https://i.ibb.co.com/bHVHjfW/Rectangle-102.png)]">
          <div className="container flex flex-col items-center gap-7">
            <h1 className="text-center text-4xl font-bold text-h-black">
              Get Leatest Update By Subscribe <br /> 0ur Newslater
            </h1>
            <Button variant="rose" className="rounded-none" size="lg">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
