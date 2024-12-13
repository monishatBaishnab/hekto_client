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
import moment from 'moment';
import { ReactNode } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addToRecent } from '@/redux/features/recent/recent.slice';

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
            className="rounded-md border-0 p-2 outline-0 transition-all hover:bg-white/70 active:bg-white"
          >
            <Icon className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          className="bg-white/90 text-athens-gray-800"
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
  disabledShop = false,
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
            ? 'h-[280px] w-full'
            : 'h-full w-24 md:w-[290px] shrink-0',
          'bg-athens-gray-50 p-7  group-hover:bg-dark-blue-100/70',
          classNames?.imgWrapper
        )}
      >
        <img
          className="size-full object-contain"
          src={product?.images}
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
      </div>

      {/* Main Body */}
      <div className="w-full space-y-2 px-5">
        <Link
          onClick={handleAddToRecent}
          to={`/products/${product?.id}`}
          className={cn(
            varient === 'grid' ? 'text-lg' : 'text-lg sm:text-2xl',
            'font-bold text-deep-koamaru-900'
          )}
        >
          {Number(product?.name?.length) > 30
            ? product?.name?.slice(0, 30)
            : product?.name}
        </Link>

        <p
          className={cn(
            varient === 'grid' || disabledDesc
              ? 'hidden'
              : 'hidden sm:block text-athens-gray-600'
          )}
        >
          {Number(product?.description?.length) > 255
            ? product?.description?.slice(0, 255)
            : product?.description}
        </p>
        {/* Card Info */}
        <div>
          {/* Price & Rating */}
          <div className="flex items-center gap-2">
            {/* Price */}
            <div className="flex items-center gap-2.5">
              <span className="text-h-black">{product?.price}</span>
              {product?.discount ? (
                <span className="text-rose-600 line-through">
                  ${product?.discount + product.price}
                </span>
              ) : null}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.6792 1.37158C8.56689 1.14405 8.33515 1 8.0814 1C7.82765 1 7.59591 1.14405 7.48359 1.37158L5.57856 5.23098L1.31831 5.85368C1.06727 5.89037 0.858821 6.06637 0.780569 6.30771C0.702317 6.54905 0.767832 6.81389 0.949578 6.99091L4.03172 9.99291L3.30433 14.234C3.26143 14.4841 3.36426 14.7369 3.56958 14.886C3.7749 15.0352 4.04709 15.0548 4.2717 14.9367L8.0814 12.9332L11.8911 14.9367C12.1157 15.0548 12.3879 15.0352 12.5932 14.886C12.7985 14.7369 12.9014 14.4841 12.8585 14.234L12.1311 9.99291L15.2132 6.99091C15.395 6.81389 15.4605 6.54905 15.3822 6.30771C15.304 6.06637 15.0955 5.89037 14.8445 5.85368L10.5842 5.23098L8.6792 1.37158Z"
                  fill="#FC9231"
                />
              </svg>
              <span className="text-sm text-h-black">
                {avgRatings}
                <span className="ml-0.5 text-xs text-athens-gray-600">
                  ({totalReview})
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Shop */}
        <div className="flex items-center justify-between border-t border-dashed border-athens-gray-100">
          <div
            className={cn(
              varient === 'grid'
                ? 'py-2'
                : 'flex items-center justify-between pt-2',
              disabledShop && 'hidden'
            )}
          >
            <div
              className={cn(
                'items-center gap-2',
                varient === 'list' ? 'hidden sm:flex' : 'flex'
              )}
            >
              <div className="size-8 overflow-hidden rounded-md">
                <img
                  className="size-full object-cover"
                  src={product?.shop?.logo}
                  alt={product?.shop?.name}
                />
              </div>
              <div className="">
                <h5 className="-mb-1 font-bold text-h-black">
                  {product?.shop?.name}
                </h5>
                <span className="text-xs text-athens-gray-600">
                  {moment(product?.shop?.createdAt).format('DD MMM, YYYY')}
                </span>
              </div>
            </div>
          </div>
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
