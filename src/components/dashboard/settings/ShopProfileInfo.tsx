import HFile from '@/components/form/HFile';
import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import HTextarea from '@/components/form/HTextarea';
import { Button } from '@/components/ui/button';
import DSettings from '@/pages/dashboard/DSettings';
import { Save } from 'lucide-react';
import { SubmitHandler, FieldValues } from 'react-hook-form';

const ShopProfileForm = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <HForm onSubmit={handleSubmit}>
      {/* Profile Info */}
      <DSettings.InfoWrapper
        title="Shop Info"
        helper="Change Shop logo it must in be 1mb"
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
          <HInput name="name" label="Shop Name" placeholder="Jhon's Shop" />
        </div>
      </DSettings.InfoWrapper>
      {/* Others Info */}
      <DSettings.InfoWrapper
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
      </DSettings.InfoWrapper>
      <div className="mt-4 flex justify-end">
        <Button>
          <Save /> Save Changes
        </Button>
      </div>
    </HForm>
  );
};

export default ShopProfileForm;
