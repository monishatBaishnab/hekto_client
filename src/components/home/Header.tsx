import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { slides } from '@/constants/home.constants';
import { useNavigate } from 'react-router-dom';

type TSlide = {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  path: string;
  category: 'Headphone' | 'Chair';
};

const CarouselSlide = ({ slide }: { slide: TSlide }) => {
  const navigate = useNavigate();
  // Animation Variants
  const slideVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const scaleVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };
  return (
    <motion.div
      className="container absolute inset-x-0 top-0 flex h-full flex-wrap items-center justify-between gap-10 !py-10 px-10"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
    >
      {/* Left Content */}
      <div className="w-full shrink-0 space-y-4 md:w-[calc(50%_-_20px)]">
        {/* Subtitle */}
        <motion.h5
          className="text-base font-medium text-rose-600"
          variants={slideVariants}
          transition={{ duration: 0.8 }}
        >
          {slide.subtitle}
        </motion.h5>
        {/* Title */}
        <motion.h1
          className="text-4xl font-bold"
          variants={slideVariants}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {slide.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-athens-gray-600"
          variants={slideVariants}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {slide.description}
        </motion.p>
        <motion.div
          variants={buttonVariants}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            onClick={() => navigate('/products')}
            variant="rose"
            className="rounded-none"
            size={'lg'}
          >
            Shop now
          </Button>
        </motion.div>
      </div>
      {/* Right Content */}
      <div className="hidden size-full shrink-0 justify-end sm:flex md:w-[calc(50%_-_20px)]">
        <div className="size-96">
          <motion.div
            className="size-3/4 rounded-full bg-rose-300/10"
            variants={scaleVariants}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="size-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Header = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // Auto-slide logic
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    // Clear the interval when the component unmounts or current changes
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[400px] w-full overflow-hidden bg-[#F2F0FF]"
    >
      <div className="absolute -top-10 left-0 size-[200px] overflow-hidden">
        <img
          className="size-full object-contain"
          src="https://i.ibb.co.com/G7CL54k/image-32.png"
          alt=""
        />
      </div>
      <div className="relative h-full">
        {slides.map(
          (slide, index) =>
            current === index && (
              <CarouselSlide key={index} slide={slide as TSlide} />
            )
        )}
      </div>
      <div className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-2">
        <Button
          variant="light"
          className="rounded-md hover:bg-rose-600 hover:text-white active:bg-rose-600"
          size={'icon'}
          // disabled={current <= 0}
          onClick={() => setCurrent((prev) => (prev - 1) % slides.length)}
        >
          <ArrowLeft />
        </Button>
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn('rotate-45')}
            onClick={() => setCurrent(index)}
          >
            <Square
              className={cn(
                'size-3 stroke-athens-gray-600 hover:stroke-rose-600',
                index === current ? 'stroke-rose-600' : ''
              )}
            />
          </button>
        ))}

        <Button
          variant="light"
          className="rounded-md hover:bg-rose-600 hover:text-white active:bg-rose-600"
          size={'icon'}
          // disabled={current >= slides.length - 1}
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Header;
