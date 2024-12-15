import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import { motion } from 'framer-motion';
import { Image, RefreshCcw, X } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import HTextarea from '../form/HTextarea';
import { TShop } from '@/types/shop.types';
import {
  useCreateShopMutation,
  useUpdateShopMutation,
} from '@/redux/features/shops/shops.api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const slideVariants = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const ShopForm = () => {
  const navigate = useNavigate();
  const userData = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [updateShop] = useUpdateShopMutation();
  const [createShop] = useCreateShopMutation();
  let shopData = {};

  if (userData?.shop) {
    shopData = {
      name: userData?.shop?.name,
      description: userData?.shop?.description,
    };
  }

  if (userData?.isLoading) {
    return (
      <div className="space-y-7">
        <div className="space-y-5">
          <div className="flex items-center gap-8">
            <div className="size-32 shrink-0 animate-pulse overflow-hidden rounded-md bg-gray-200"></div>
            <div className="space-y-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
              <div className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2">
                <div className="size-4 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
              </div>
              <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="h-12 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-28 w-full animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-12 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="h-12 w-32 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const shopData: Partial<TShop> = {};

    if (data) {
      shopData.name = data.name;
      shopData.description = data.description;
    }

    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    }

    if (userData?.shop) {
      formData.append('data', JSON.stringify({ ...shopData }));
      const result = await updateShop({ formData, id: userData?.shop?.id });
      if (result?.data?.success) {
        toast.success('Shop Updated.');
      }
    } else {
      formData.append(
        'data',
        JSON.stringify({ ...shopData, user_id: userData.id })
      );
      const result = await createShop({ formData, id: userData?.shop?.id });
      if (result?.data?.success) {
        toast.success('Shop Updated.');
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={slideVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-7">
        <HForm onSubmit={handleSubmit} defaultValues={shopData}>
          <div className="space-y-5">
            <div className="flex items-center gap-8">
              <div className="size-32 shrink-0 overflow-hidden rounded-md">
                <img
                  className="size-full object-cover"
                  src={
                    userData?.shop?.logo ||
                    'https://i.ibb.co.com/5G1XTfb/customer.webp'
                  }
                  alt={userData?.shop?.name}
                />
              </div>
              <div className="space-y-3">
                <p className="text-athens-gray-600">
                  Your shop photo will appear on your shop profile and directory
                  <br />
                  listing. PNG or JPG no bigger than 1000px wide and tall.
                </p>
                <label htmlFor="profile" className="block cursor-pointer">
                  <div className="inline-flex items-center gap-2 rounded-md border border-athens-gray-100 bg-athens-gray-50 px-4 py-2 text-athens-gray-800">
                    <RefreshCcw className="size-4" /> <span>Update photo</span>
                  </div>
                </label>
                {file !== null ? (
                  <div className="inline-flex items-center gap-2 rounded-md border border-dashed border-athens-gray-100 px-2 py-1 text-athens-gray-600">
                    <Image className="size-4" />
                    <span className="text-sm">{file?.name}</span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="hover:text-slate-800"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : null}
                <input
                  onChange={(e) => setFile(e?.target?.files?.[0] || null)}
                  hidden
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>
            </div>
            <div className="space-y-5">
              <HInput placeholder="Write your shop name" name="name" />

              <HTextarea
                required
                placeholder="Write about your shop"
                name="description"
                rows={7}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/user/profile')}
                type="button"
                size="lg"
                variant="light"
                className="rounded-md bg-athens-gray-50 px-5"
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" variant="dark" className="px-5">
                Save Changes
              </Button>
            </div>
          </div>
        </HForm>
      </div>
    </motion.div>
  );
};

export default ShopForm;
