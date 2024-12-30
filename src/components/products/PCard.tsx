import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import { TProduct } from '@/types/products.types';
import { ReactNode } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addToRecent } from '@/redux/features/recent/recent.slice';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

type TAction = {
  key: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
};

type TCardActions = {
  variant?: 'grid' | 'list';
  actions: TAction[];
  onClick: (type: string, product: TProduct) => void;
  product: TProduct;
};

const CardActions = ({ variant, actions, product, onClick }: TCardActions) => {
  return actions?.map(({ label, icon: Icon, key }) => (
    <TooltipProvider key={key}>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button
            onClick={() => onClick(key, product)}
            key={label}
            className="rounded-md border-0 bg-white p-2 outline-0 transition-all active:bg-white"
          >
            <Icon className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          className="bg-white text-athens-gray-950"
          align="center"
          side={variant === 'grid' ? 'right' : 'top'}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ));
};

type TClassNames = {
  imgWrapper?: string;
  img?: string;
};

type TPCard = {
  varient?: 'grid' | 'list';
  disabledDesc?: boolean;
  disabledShop?: boolean;
  classNames?: TClassNames;
  product?: TProduct;
  actions?: ReactNode;
};

const PCard = ({
  varient = 'grid',
  disabledDesc = false,
  classNames,
  product,
  actions,
}: TPCard) => {
  const totalReview = Number(product?.review?.length);
  const totalRating = Number(
    product?.review?.reduce((sum, current) => sum + current.rating, 0)
  );
  const avgRatings = (totalReview > 0 ? totalRating / totalReview : 0).toFixed(
    1
  );
  const dispatch = useAppDispatch();
  const handleAddToRecent = () => {
    dispatch(addToRecent({ product } as { product: TProduct }));
  };

  return (
    <div
      className={cn(
        varient === 'grid' ? 'space-y-5' : 'flex items-center',
        'group relative overflow-hidden rounded-md bg-athens-gray-50/40',
        'border border-dashed border-athens-gray-100'
      )}
    >
      {/* Card Thumb */}
      <div
        className={cn(
          'transition-all relative overflow-hidden',
          varient === 'grid'
            ? 'h-[220px] w-full'
            : 'h-[220px] w-24 md:w-[290px] shrink-0',
          'bg-athens-gray-50 p-7  group-hover:bg-dark-blue-100/70',
          classNames?.imgWrapper
        )}
      >
        <img
          className="size-full object-contain"
          src={product?.images?.[0]}
          alt={product?.name}
        />

        {/* Card Icons */}
        <div
          className={cn(
            varient === 'grid' ? 'flex' : 'hidden',
            'items-center flex-col gap-2 transition-all duration-300',
            'absolute left-3 bottom-1 invisible opacity-0',
            'group-hover:bottom-3 group-hover:opacity-100 group-hover:visible'
          )}
        >
          {actions ? actions : null}
        </div>
        {/* Discount */}
        {product?.discount ? (
          <div className={cn('absolute left-3 top-3')}>
            <span className="rounded-md bg-rose-600 px-2 text-white line-through">
              ${(product?.discount + product.price).toFixed(2)}
            </span>
          </div>
        ) : null}
      </div>

      {/* Main Body */}
      <div
        className={cn('w-full space-y-2 px-5', varient === 'list' && 'py-5')}
      >
        <Link
          onClick={handleAddToRecent}
          to={`/products/${product?.id}`}
          className={cn(
            varient === 'grid' ? 'text-base' : 'text-lg sm:text-2xl',
            'font-bold text-deep-koamaru-900'
          )}
        >
          {varient === 'grid'
            ? Number(product?.name?.length) > 20
              ? product?.name?.slice(0, 20) + '..'
              : product?.name
            : product?.name}
        </Link>

        <p
          className={cn(
            varient === 'grid' || disabledDesc
              ? 'hidden'
              : 'hidden sm:block text-athens-gray-600'
          )}
        >
          {Number(product?.description?.length) > 240
            ? product?.description?.slice(0, 240)
            : product?.description}
        </p>
        {/* Card Info */}
        <div>
          {/* Price & Rating */}
          <div className="flex items-center gap-2">
            {/* Price */}
            <div className="flex items-center gap-2.5">
              <span className="text-h-black">${product?.price}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-h-black">
              <Rating
                style={{ maxWidth: 80 }}
                value={Number(avgRatings)}
                readOnly
              />
              <span className="ml-0.5 text-xs text-athens-gray-600">
                ({totalReview})
              </span>
            </div>
          </div>
        </div>

        {/* Shop */}
        <div className="flex items-center justify-between border-t border-dashed border-athens-gray-100">
          <div
            className={cn(
              varient === 'grid' ? 'hidden' : 'flex items-center gap-2'
            )}
          >
            {actions ? actions : null}
          </div>
        </div>
      </div>
    </div>
  );
};

PCard.CardActions = CardActions;

export default PCard;
