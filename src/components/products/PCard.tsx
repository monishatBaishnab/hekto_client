import { cn } from '@/lib/utils';
import { ExternalLink, GitCompare, ShoppingCart } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const card_icons = [
  {
    key: 'cart',
    label: 'Add to cart',
    icon: ShoppingCart,
  },
  {
    key: 'compere',
    label: 'Compere',
    icon: GitCompare,
  },
  {
    key: 'details',
    label: 'View details',
    icon: ExternalLink,
  },
];

const CardAction = ({ variant }: { variant?: 'grid' | 'list' }) => {
  return card_icons?.map(({ key, label, icon: Icon }) => (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <button
            key={key}
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

const PCard = ({ varient = 'grid' }: { varient?: 'grid' | 'list' }) => {
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
          varient === 'grid' ? 'h-[280px] w-full' : 'h-full w-[290px] shrink-0',
          'bg-athens-gray-50 p-7  group-hover:bg-dark-blue-100/70'
        )}
      >
        <img
          className="size-full object-contain"
          src="https://i.ibb.co.com/Pr0DDpz/image-1167.png"
          alt=""
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
          <CardAction variant={varient} />
        </div>
      </div>

      {/* Main Body */}
      <div className="space-y-2 px-5">
        <h4
          className={cn(
            'font-bold text-deep-koamaru-900',
            varient === 'grid' ? 'text-lg' : 'text-2xl'
          )}
        >
          Ultricies condimentum imperdiet
        </h4>

        <p
          className={cn(
            varient === 'grid' ? 'hidden' : 'block text-athens-gray-600'
          )}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur eos
          veritatis enim incidunt temporibus atque. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Pariatur eos veritatis enim incidunt
          temporibus atque.
        </p>
        {/* Card Info */}
        <div>
          {/* Price & Rating */}
          <div className="flex items-center gap-2">
            {/* Price */}
            <div className="flex items-center gap-2.5">
              <span className="text-h-black">$26.00</span>
              <span className="text-rose-600 line-through">$28.00</span>
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
                4.7{' '}
                <span className="ml-0.5 text-xs text-athens-gray-600">
                  (29)
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Shop */}
        <div
          className={cn(
            'border-t border-dashed border-athens-gray-100',
            varient === 'grid'
              ? 'py-2'
              : 'flex items-center justify-between pt-2'
          )}
        >
          <div className="flex items-center gap-2">
            <div className="size-8 overflow-hidden rounded-md">
              <img
                className="size-full object-cover"
                src="https://i.ibb.co.com/5G1XTfb/customer.webp"
                alt=""
              />
            </div>
            <div className="">
              <h5 className="-mb-1 font-bold text-h-black">Golo's Shop</h5>
              <span className="text-xs text-athens-gray-600">5K+ Review</span>
            </div>
          </div>
          <div
            className={cn(
              varient === 'grid' ? 'hidden' : 'flex items-center gap-2'
            )}
          >
            <CardAction />
          </div>
        </div>
      </div>
    </div>
  );
};

PCard.CardAction = CardAction;

export default PCard;
