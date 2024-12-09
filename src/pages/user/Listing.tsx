import PCard from '@/components/products/PCard';
import { Button } from '@/components/ui/button';
import { Copy, FilePen, Plus, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { vendor_actions } from '@/constants/products.constants';
import { TProduct } from '@/types/products.types';
const Listing = () => {
  const handleAction = (key: string, product: TProduct) => {
    console.log(key);
  };
  return (
    <div className="w-full space-y-8">
      <h3 className="text-2xl font-bold text-h-black">My Listings</h3>

      <div className="flex items-center gap-2">
        <Button
          variant="light"
          className="rounded-full text-athens-gray-700"
          size="sm"
        >
          <Plus className="size-3" />
          Create
        </Button>
        <Button
          variant="light"
          className="rounded-full text-athens-gray-700"
          size="sm"
        >
          <FilePen className="size-3" />
          Update
        </Button>
        <Button
          variant="light"
          className="rounded-full text-athens-gray-700"
          size="sm"
        >
          <Copy className="size-3" />
          Duplicate
        </Button>
        <Button
          variant="light"
          className="rounded-full border-torch-red-300 text-torch-red-500 hover:bg-torch-red-50"
          size="sm"
        >
          <Trash2 className="size-3" />
          Delete
        </Button>
      </div>
      <div className="space-y-5">
        <RadioGroup defaultValue="2">
          {Array.from({ length: 4 }).map((_, id) => (
            <div className="flex items-center gap-3" key={id}>
              <div className="size-5 shrink-0">
                <RadioGroupItem value={String(id)} />
              </div>
              <div className="w-full">
                <PCard
                  disabledDesc
                  disabledShop
                  classNames={{ imgWrapper: 'size-32' }}
                  varient="list"
                  actions={
                    <PCard.CardActions
                      onClick={handleAction}
                      actions={vendor_actions}
                      variant="list"
                    />
                  }
                />
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Listing;
