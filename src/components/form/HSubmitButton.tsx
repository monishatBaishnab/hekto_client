import { Loader, Save } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';

const HSubmitButton = ({
  isLoading = false,
  title,
}: {
  isLoading?: boolean;
  title?: string;
}) => {
  const { formState } = useFormContext();
  const { isDirty } = formState;

  return (
    <Button disabled={!isDirty || isLoading} className="min-w-24">
      {isLoading ? (
        <Loader className="animate-spin text-white" />
      ) : (
        <>
          <Save /> {title ? title : 'Save'}
        </>
      )}
    </Button>
  );
};

export default HSubmitButton;
