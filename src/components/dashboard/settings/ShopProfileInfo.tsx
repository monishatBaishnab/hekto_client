import HFile from '@/components/form/HFile';
import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import HSubmitButton from '@/components/form/HSubmitButton';
import HTextarea from '@/components/form/HTextarea';
import useUser from '@/hooks/useUser';
import DProfile from '@/pages/dashboard/DProfile';
import { useUpdateShopMutation } from '@/redux/features/shops/shops.api';
import { TShop } from '@/types/shop.types';
import { useEffect } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const ShopProfileForm = () => {
  const userData = useUser();
  const dispatch = useDispatch();
  const [updateShop, { isError, isSuccess, isLoading, data }] =
    useUpdateShopMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const shopInfo: Partial<TShop> = {
      name: data?.name,
      description: data?.description,
    };

    const formData = new FormData();

    if (data?.logo) {
      formData.append('file', data?.logo);
    }

    // Append shopInfo and shopData as JSON strings
    formData.append('data', JSON.stringify({ ...shopInfo }));

    await updateShop({ formData, id: userData?.shop?.id });
  };

  useEffect(() => {
    if (!isError && isSuccess) {
      toast.success('Shop Updated.');
    }
  }, [isError, isSuccess, data, dispatch]);

  const defaultValues = {
    name: userData?.shop?.name,
    logo: userData?.shop?.logo,
    description: userData?.shop?.description,
  };
  return (
    <HForm onSubmit={handleSubmit} defaultValues={defaultValues}>
      {/* Profile Info */}
      <DProfile.InfoWrapper
        title="Shop Info"
        helper="Change Shop logo it must in be 1mb"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="size-32 shrink-0 overflow-hidden">
            <img
              className="size-full rounded-lg object-cover object-top"
              alt={userData?.shop?.name}
              src={userData?.shop?.logo}
            />
          </div>
          <div className="flex items-center gap-4">
            <HFile label="Upload Profile" name="logo" />
          </div>
        </div>
        <div className="space-y-2">
          <HInput name="name" label="Shop Name" placeholder="Jhon's Shop" />
        </div>
      </DProfile.InfoWrapper>
      {/* Others Info */}
      <DProfile.InfoWrapper
        title="Others info"
        helper="Change your shop description"
      >
        <div className="space-y-2">
          <HTextarea
            name="description"
            label="Shop Description"
            placeholder="Details about shop."
          />
        </div>
      </DProfile.InfoWrapper>
      <div className="mt-4 flex justify-end">
        <HSubmitButton isLoading={isLoading} />
      </div>
    </HForm>
  );
};

export default ShopProfileForm;
