import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useFetchAllCategoriesQuery } from '@/redux/features/categories/categories.api';
import { useNavigate } from 'react-router-dom';
import { TCategory } from '@/types';
import CategorySkeleton from '../skeletons/CategorySkeleton';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function NextArrow(props: ArrowProps) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} !bg-transparent before:!text-slate-500`}
      onClick={onClick}
    >
      next
    </div>
  );
}

function PrevArrow(props: ArrowProps) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} !bg-transparent before:!text-slate-500`}
      onClick={onClick}
    >
      next
    </div>
  );
}

function Categories() {
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading: cLoading,
    isFetching: cFetching,
  } = useFetchAllCategoriesQuery([{ name: 'limit', value: '6' }]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    dot: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 982,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="px-10">
      <Slider {...settings} className="gap-5">
        {cLoading || cFetching
          ? Array.from({ length: 6 }).map((_, index) => (
              <CategorySkeleton key={index} />
            ))
          : (categories?.data as TCategory[])?.map(
              ({ name, description, image, id }) => (
                <div className="px-2">
                  <div
                    key={id}
                    onClick={() => navigate(`/products?category=${id}`)}
                    className="flex size-full cursor-pointer flex-col items-center rounded-lg bg-athens-gray-50 p-4 transition-all hover:bg-athens-gray-100/70 active:bg-athens-gray-50"
                  >
                    <div className="size-16">
                      <img
                        className="size-full object-contain"
                        src={image}
                        alt={name}
                      />
                    </div>

                    <h4 className="text-center text-lg font-bold text-h-black">
                      {name}
                    </h4>
                    <h5 className="text-sm text-athens-gray-700">
                      {description}
                    </h5>
                  </div>
                </div>
              )
            )}
      </Slider>
    </div>
  );
}

export default Categories;
