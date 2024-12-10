import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';

const slideVariants = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const PasswordResetForm = () => {
  const [mode, setMode] = useState<'change' | 'forgot'>('change');
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={slideVariants}
      transition={{ duration: 0.3 }}
    >
      <HForm onSubmit={handleSubmit}>
        <div className="max-w-md space-y-7">
          <div className="space-y-4">
            {mode === 'change' ? (
              <>
                <HInput placeholder="Old Password" name="old_pass" />
                <HInput placeholder="New Password" name="new_pass" />
              </>
            ) : (
              <>
                <HInput placeholder="Write your email account" name="email" />
              </>
            )}
            <span
              onClick={() => setMode(mode === 'change' ? 'forgot' : 'change')}
              className="ml-1 block cursor-pointer text-sm font-medium text-athens-gray-900"
            >
              {mode === 'change' ? 'Forgot Password?' : 'Change Password'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="lg"
              variant="light"
              className="rounded-md bg-athens-gray-50 px-5"
            >
              Cancel
            </Button>
            <Button size="lg" variant="dark" className="px-5">
              Save Changes
            </Button>
          </div>
        </div>
      </HForm>
    </motion.div>
  );
};

export default PasswordResetForm;
