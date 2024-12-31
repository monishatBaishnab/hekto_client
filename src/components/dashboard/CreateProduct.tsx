import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import HInput from '../form/HInput';
import HForm from '../form/HForm';
import { FieldValues } from 'react-hook-form';
import { useFetchAllCategoriesQuery } from '@/redux/features/categories/categories.api';
import { TCategory } from '@/types';
import HSelect from '../form/HSelect';
import { TProduct } from '@/types/products.types';
import HTextarea from '../form/HTextarea';
import HMultiFile from '../form/HMultiFile';
import HSubmitButton from '../form/HSubmitButton';

type TCreateProduct = {
  title: string;
  open: boolean;
  setOpen: (key: boolean) => void;
  onSubmit: (data: FieldValues) => void;
  product?: TProduct | undefined;
  isLoading?: boolean;
};

const CreateProduct = ({
  title,
  open,
  setOpen,
  onSubmit,
  product,
  isLoading,
}: TCreateProduct) => {
  const {
    data: categories,
    isLoading: cLoading,
    isFetching: cFetching,
  } = useFetchAllCategoriesQuery([]);

  const categoryOptions: { value: string; label: string }[] =
    categories?.data?.map((category: TCategory) => ({
      value: category?.id,
      label: category?.name,
    }));

  const formData = {
    name: product?.name,
    price: product?.price,
    prev_images: product?.images,
    quantity: product?.quantity,
    description: product?.description,
    discount: product?.discount,
    categories: (product?.categories as TCategory[])?.[0]?.id,
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle className="mb-5 border-b border-b-athens-gray-100 pb-5">
            {title}
          </DialogTitle>
          <DialogDescription>
            <HForm onSubmit={onSubmit} defaultValues={product ? formData : {}}>
              <div className="space-y-5">
                <div>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <HInput placeholder="Product Name" name="name" />
                      <HInput
                        placeholder="Product Price"
                        type="number"
                        name="price"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <HInput
                        placeholder="Product Quantity"
                        type="number"
                        name="quantity"
                      />
                      <HInput
                        placeholder="Product Discount"
                        type="number"
                        name="discount"
                      />
                    </div>
                    <HSelect
                      disabled={cFetching || cLoading}
                      options={categoryOptions}
                      placeholder="Categories"
                      name="categories"
                    />
                    <HTextarea
                      required
                      placeholder="Write about yourself"
                      name="description"
                      rows={7}
                    />
                    <HMultiFile label='Previous Images' disabled name="prev_images" />
                    <HMultiFile name="images" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="bg-slate-200 text-slate-600 hover:bg-slate-200/80 active:bg-slate-200"
                  >
                    Cancel
                  </Button>
                  <HSubmitButton title="Continue" isLoading={isLoading} />
                </div>
              </div>
            </HForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProduct;
