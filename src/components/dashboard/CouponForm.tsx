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
import HSubmitButton from '../form/HSubmitButton';
import { TCoupon } from '@/types/coupon.types';
import HSelect from '../form/HSelect';
import HDatePicker from '../form/HDate';
import { X } from 'lucide-react';

type TCreateProduct = {
  title: string;
  open: boolean;
  setOpen: (key: boolean) => void;
  onSubmit: (data: FieldValues) => void;
  coupon?: TCoupon | undefined;
  isLoading?: boolean;
};

const CouponForm = ({
  title,
  open,
  setOpen,
  onSubmit,
  coupon,
  isLoading = false,
}: TCreateProduct) => {
  const formData = {
    coupon: coupon?.coupon,
    discount: coupon?.discount,
    discount_by: coupon?.discount_by,
    start_date: coupon?.start_date,
    end_date: coupon?.end_date,
  };
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle className="mb-5 flex items-center justify-between border-b border-b-athens-gray-100 pb-5">
            {title}
            <Button
              onClick={() => setOpen(false)}
              variant="light"
              className="rounded-md"
              size="icon"
            >
              <X />
            </Button>
          </DialogTitle>
          <DialogDescription>
            <HForm onSubmit={onSubmit} defaultValues={coupon ? formData : {}}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <HInput name="coupon" placeholder="COUPON" label="Coupon" />
                  <HInput
                    name="discount"
                    placeholder="100/10%"
                    label="Discount"
                  />
                </div>
                <HSelect
                  label="Discount By"
                  name="discount_by"
                  placeholder="Amount"
                  options={[
                    {
                      label: 'Amount',
                      value: 'AMOUNT',
                    },
                    {
                      label: 'Percentage',
                      value: 'PERCENTAGE',
                    },
                  ]}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <HDatePicker label="Discount Start Date" name="start_date" />
                  <HDatePicker label="Discount End Date" name="end_date" />
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

export default CouponForm;
