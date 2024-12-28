import Header from '@/components/home/Header';
import FPContainer from '@/components/home/FPContainer';
import PContainer from '@/components/products/PContainer';
import CategorySkeleton from '@/components/skeletons/CategorySkeleton';
import { Button } from '@/components/ui/button';
import { useFetchAllCategoriesQuery } from '@/redux/features/categories/categories.api';
import { TCategory } from '@/types';
import { CircleCheck, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const Home = () => {
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading: cLoading,
    isFetching: cFetching,
  } = useFetchAllCategoriesQuery([{ name: 'limit', value: '6' }]);

  return (
    <div>
      <div>
        <Header />

        {/* Categories */}
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-h-black sm:text-4xl">
              Popular Categories
            </h2>
            <button
              // onClick={() => navigate('/flash')}
              className="flex items-center gap-3 rounded-md text-athens-gray-700 transition-all hover:text-athens-gray-900"
            >
              See All <MoveRight className="size-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {cLoading || cFetching
              ? Array.from({ length: 5 }).map((_, index) => (
                  <CategorySkeleton key={index} />
                ))
              : (categories?.data as TCategory[])?.map(
                  ({ name, description, image, id }) => (
                    <div
                      key={id}
                      onClick={() => navigate(`/products?category=${id}`)}
                      className="flex size-full cursor-pointer items-center gap-3 rounded-lg bg-athens-gray-50 p-4 transition-all hover:bg-athens-gray-100/70 active:bg-athens-gray-50 sm:flex-col sm:gap-0"
                    >
                      <div className="size-16">
                        <img
                          className="size-full object-contain"
                          src={image}
                          alt={name}
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-h-black">
                          {name}
                        </h4>
                        <h5 className="text-sm text-athens-gray-700">
                          {description}
                        </h5>
                      </div>
                    </div>
                  )
                )}
          </div>
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

          <PContainer fetchMode="infinity" />
        </div>

        <div className="bg-[url(https://i.ibb.co.com/bHVHjfW/Rectangle-102.png)]">
          <div className="container flex flex-col items-center gap-7 !py-24">
            <h1 className="text-center text-4xl font-bold text-h-black">
              Get Latest Update By Subscribe <br /> 0ur Newslater
            </h1>
            <div className="flex flex-col items-center gap-3">
              <div>
                <Input
                  className="h-12 min-w-full bg-white/30 px-4 text-athens-gray-950 outline-none !ring-0 backdrop-blur-sm focus:ring-0 sm:min-w-96"
                  name="email"
                  type="email"
                  placeholder="Write your email address"
                />
              </div>
              <Button
                onClick={() => navigate('/products')}
                variant="rose"
                size="lg"
              >
                Subscribe now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
