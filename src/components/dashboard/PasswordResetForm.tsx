import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import { Button } from '@/components/ui/button';
import {
  useForgotMutation,
  useResetMutation,
} from '@/redux/features/auth/auth.api';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const slideVariants = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

type TAction = 'reset' | 'forgot';

const PasswordResetForm = ({ navigatePath }: { navigatePath?: string }) => {
  const navigate = useNavigate();
  const [action, setAction] = useState<TAction>('forgot');
  const [searchQueries] = useSearchParams();
  const actionFromQuery = searchQueries.get('action');
  const tokenFromQUery = searchQueries.get('token');
  const [forgotPassword, { isLoading: fLoading }] = useForgotMutation();
  const [resetPassword, { isLoading: rLoading }] = useResetMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (action === 'forgot') {
      const result = await forgotPassword({ email: data?.email });

      if (result?.data?.success) {
        toast.success('Please check your mail.');
      } else {
        // toast.error()
        toast.error(
          (result?.error as { data: { message: string } })?.data?.message
        );
      }
      return;
    } else if (action === 'reset') {
      const result = await resetPassword({
        password: data?.password,
        token: tokenFromQUery,
      });
      if (result?.data?.success) {
        toast.success('Password reset success.');
        navigate('/login');
      } else {
        // toast.error()
        toast.error(
          (result?.error as { data: { message: string } })?.data?.message
        );
      }
    }
  };

  useEffect(() => {
    if (actionFromQuery) {
      setAction(actionFromQuery as TAction);
    }
  }, [actionFromQuery]);

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
            {action === 'reset' ? (
              <>
                <HInput placeholder="New Password" name="password" />
              </>
            ) : (
              <>
                <HInput placeholder="Write your email account" name="email" />
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                navigate(navigatePath ? navigatePath : '/user/profile')
              }
              type='button'
              size="lg"
              variant="light"
              className="w-[84px] rounded-md bg-athens-gray-50 px-5"
            >
              Cancel
            </Button>
            <Button size="lg" variant="dark" className="w-[84px] px-5">
              {fLoading || rLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : action === 'forgot' ? (
                'Forgot'
              ) : (
                'Reset'
              )}
            </Button>
          </div>
        </div>
      </HForm>
    </motion.div>
  );
};

export default PasswordResetForm;
