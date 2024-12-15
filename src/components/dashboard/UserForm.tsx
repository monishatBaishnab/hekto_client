import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import { useUpdateProfileMutation } from '@/redux/features/user/user.api';
import { TUser } from '@/types/user.types';
import { motion } from 'framer-motion';
import { Image, RefreshCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const slideVariants = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const UserForm = () => {
  const navigate = useNavigate();
  const userData = useUser();
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const [updateProfile, { isError, isSuccess, data }] =
    useUpdateProfileMutation();

  let user = {};

  if (userData?.name && userData?.address) {
    user = {
      name: userData.name,
      address: userData.address,
    };
  }

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo: Partial<TUser> = {};

    if (data) {
      userInfo.name = data.name;
      userInfo.address = data.address;
      userInfo.email = data.email;
    }

    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    }
    
    // Append userInfo and shopData as JSON strings
    formData.append('data', JSON.stringify({ ...userInfo }));

    await updateProfile({ formData, id: userData?.id });
    setFile(null);
  };

  useEffect(() => {
    if (!isError && isSuccess) {
      toast.success('Profile Updated.');
    }
  }, [isError, isSuccess, data, dispatch]);

  if (userData.isLoading || userData?.isFetching) {
    return (
      <div className="space-y-7">
        <div className="space-y-5">
          {/* Profile Photo Skeleton */}
          <div className="flex items-center gap-8">
            <div className="size-32 shrink-0 animate-pulse overflow-hidden rounded-md bg-gray-200"></div>
            <div className="w-full space-y-3">
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
              <div className="h-8 w-40 animate-pulse rounded-md bg-gray-200"></div>
            </div>
          </div>

          {/* Input Skeletons */}
          <div className="space-y-5">
            <div className="h-10 animate-pulse rounded-md bg-gray-200"></div>
            <div className="h-10 animate-pulse rounded-md bg-gray-200"></div>
          </div>

          {/* Button Skeletons */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200"></div>
            <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={slideVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-7">
        <HForm defaultValues={user ? user : {}} onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="flex items-center gap-8">
              <div className="size-32 shrink-0 overflow-hidden rounded-md">
                <img
                  className="size-full object-cover"
                  src={userData?.profilePhoto || ""}
                  alt={userData?.name}
                />
              </div>
              <div className="space-y-3">
                <p className="text-athens-gray-600">
                  Profile photo: PNG/JPG, max dimensions 1000px.
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
              <HInput placeholder="Write your name" name="name" />

              <HInput placeholder="Write your address" name="address" />
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

export default UserForm;
