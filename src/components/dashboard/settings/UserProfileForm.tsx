import HFile from '@/components/form/HFile';
import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import HSubmitButton from '@/components/form/HSubmitButton';
import HTextarea from '@/components/form/HTextarea';
import useUser from '@/hooks/useUser';
import DProfile from '@/pages/dashboard/DProfile';
import { useUpdateProfileMutation } from '@/redux/features/user/user.api';
import { TUser } from '@/types/user.types';
import { useEffect } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const UserProfileForm = () => {
  const userData = useUser();
  const dispatch = useDispatch();
  const [updateProfile, { isError, isSuccess, isLoading, data }] =
    useUpdateProfileMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo: Partial<TUser> = {
      name: data.name,
      email: data.email,
      address: data.address,
      bio: data.bio,
    };

    const formData = new FormData();

    if (data?.profile) {
      formData.append('file', data?.profile);
    }

    // Append userInfo and shopData as JSON strings
    formData.append('data', JSON.stringify({ ...userInfo }));

    await updateProfile({ formData, id: userData?.id });
  };

  useEffect(() => {
    if (!isError && isSuccess) {
      toast.success('Profile Updated.');
    }
  }, [isError, isSuccess, data, dispatch]);

  const defaultValues = {
    name: userData.name,
    email: userData.email,
    profile: userData?.profilePhoto,
    address: userData.address,
    bio: userData.bio,
  };

  return (
    <HForm onSubmit={handleSubmit} defaultValues={defaultValues}>
      {/* Profile Info */}
      <DProfile.InfoWrapper
        title="Profile Info"
        helper="Change profile picture it must be 1mb"
      >
        <div className="space-y-2">
          <HFile label="Upload Profile" name="profile" />

          <div className="space-y-2">
            <HInput name="name" label="Name" placeholder="Jhon Deo" />
          </div>
        </div>
      </DProfile.InfoWrapper>
      {/* Contact Info */}
      <DProfile.InfoWrapper
        title="Contact Info"
        helper="Change your email address and phone number"
      >
        <div className="space-y-2">
          <HInput
            disabled
            name="email"
            label="Email Address"
            placeholder="jhon@gmail.com"
          />
          <HInput name="address" label="Address" placeholder="UK." />
        </div>
      </DProfile.InfoWrapper>
      {/* Others Info */}
      <DProfile.InfoWrapper title="Others" helper="Change your bio">
        <div className="space-y-2">
          <HTextarea name="bio" label="Bio" placeholder="Details about you." />
        </div>
      </DProfile.InfoWrapper>
      <div className="mt-4 flex justify-end">
        <HSubmitButton isLoading={isLoading} />
      </div>
    </HForm>
  );
};

export default UserProfileForm;
