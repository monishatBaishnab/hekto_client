import Header from '@/components/home/Header';
import TrendingProducts from '@/components/home/TrendingProducts';
import PContainer from '@/components/products/PContainer';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { categories } from '@/constants/home.constants';
import { CircleCheck } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <div>
        <Header />
        <div>
          <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
        </div>
        {/* Categories */}
        <div className="container !pt-0">
          <h2 className="mb-8 text-center text-4xl font-bold text-h-black">
            Top Categories
          </h2>
          <Carousel>
            <CarouselContent className="justify-center">
              {categories?.map(({ label, subtitle, image }, index) => (
                <CarouselItem
                  className="basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/6"
                  key={index}
                >
                  <div className="flex size-full cursor-pointer flex-col items-center rounded-lg bg-athens-gray-50 p-4 transition-all hover:bg-athens-gray-100/70 active:bg-athens-gray-50">
                    <div className="size-24">
                      <img
                        className="size-full object-contain"
                        src={image}
                        alt={label}
                      />
                    </div>
                    <h4 className="text-lg font-bold text-h-black">{label}</h4>
                    <h4 className="text-sm text-athens-gray-700">{subtitle}</h4>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <TrendingProducts />

        <div className="bg-athens-gray-50">
          <div className="container flex items-center justify-center gap-7 !py-5">
            <div className="h-96 w-[calc(50%_-_14px)] shrink-0 overflow-hidden">
              <img
                className="size-full object-contain"
                src="https://i.ibb.co.com/bX9bvBH/Group-153.png"
                alt=""
              />
            </div>
            <div className="w-[calc(50%_-_14px)] shrink-0 space-y-5">
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

          <PContainer />
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
