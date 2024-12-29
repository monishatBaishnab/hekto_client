import { Loader, Save } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';

const HSubmitButton = ({ isLoading = false }: { isLoading?: boolean }) => {
  const { formState } = useFormContext();
  const { isDirty } = formState;

  return (
    <Button disabled={!isDirty || isLoading} className="w-24">
      {isLoading ? (
        <Loader className="animate-spin text-white" />
      ) : (
        <>
          <Save /> Save
        </>
      )}
    </Button>
  );
};

export default HSubmitButton;
