import HFile from '@/components/form/HFile';
import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import { Button } from '@/components/ui/button';
import DSettings from '@/pages/dashboard/DSettings';
import { Save } from 'lucide-react';
import { SubmitHandler, FieldValues } from 'react-hook-form';

const UserProfileForm = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <HForm onSubmit={handleSubmit}>
      {/* Profile Info */}
      <DSettings.InfoWrapper
        title="Profile Info"
        helper="Change profile picture it must be 1mb"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="size-36 shrink-0 overflow-hidden">
            <img
              className="size-full rounded-full object-cover object-top"
              alt="NextUI hero Image"
              src="https://i.ibb.co.com/X7gMYdj/pasport-size.jpg"
            />
          </div>
          <div className="flex items-center gap-4">
            <HFile label="Upload Profile" name="profile" />
          </div>
        </div>
        <div className="space-y-2">
          <HInput name="name" label="Name" placeholder="Jhon Deo" />
        </div>
      </DSettings.InfoWrapper>
      {/* Contact Info */}
      <DSettings.InfoWrapper
        title="Contact Info"
        helper="Change your email address and phone number"
      >
        <div className="space-y-2">
          <HInput
            name="email"
            label="Email Address"
            placeholder="jhon@gmail.com"
          />
          <HInput name="address" label="Address" placeholder="UK." />
        </div>
      </DSettings.InfoWrapper>
      {/* Contact Info */}
      <DSettings.InfoWrapper
        title="Contact Info"
        helper="Change your email address and phone number"
      >
        <div className="space-y-2">
          <HInput
            name="email"
            label="Email Address"
            placeholder="jhon@gmail.com"
          />
          <HInput name="address" label="Address" placeholder="UK." />
        </div>
      </DSettings.InfoWrapper>
      <div className="mt-4 flex justify-end">
        <Button>
          <Save /> Save Changes
        </Button>
      </div>
    </HForm>
  );
};

export default UserProfileForm;
