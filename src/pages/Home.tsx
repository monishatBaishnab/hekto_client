import Header from '@/components/home/Header';
import FPContainer from '@/components/home/FPContainer';
import PContainer from '@/components/products/PContainer';
import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Categories from '@/components/home/Categories';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Header />

        {/* Categories */}
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold text-h-black sm:text-3xl">
            Popular Categories
          </h2>

          <Categories />
        </div>

        <FPContainer title='Featured Products' query='featured' />

        <FPContainer title='Flash Sale' path={'/flash'} query='flash_sale' />

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
              <Button onClick={() => navigate('/products')} className="rounded-none" size="lg" variant="rose">
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        <div className="container space-y-10">
          {/* <h2 className="text-2xl font-bold text-h-black sm:text-3xl">
            Only for you
          </h2> */}

          <PContainer limit={"20"} fetchMode="infinity" />
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
                variant="rose"
                size="lg"
              >
                Subscribe now
              </Button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Home;
