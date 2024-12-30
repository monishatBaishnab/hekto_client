import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useLogInMutation } from '@/redux/features/auth/auth.api';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '@/redux/hooks';
import { login } from '@/redux/features/auth/auth.slice';
import { LoaderCircle } from 'lucide-react';
import { clearRecent } from '@/redux/features/recent/recent.slice';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const config = [
  {
    key: 'customer',
    label: 'Customer Credentials',
  },
  {
    key: 'vendor',
    label: 'Vendor Credentials',
  },
  {
    key: 'admin',
    label: 'Admin Credentials',
  },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginFromServer, { data, isLoading, isSuccess }] = useLogInMutation();
  const [defaultValues, setDefaultValues] = useState({});
  const [activeKey, setActiveKey] = useState('');
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await loginFromServer(data);
    if (result?.error) {
      toast.error(
        (result?.error as { data: { message: string } })?.data?.message
      );
    }
  };

  const handleCredentialsUpdate = (role: string) => {
    if (role === 'admin') {
      const values = {
        email: 'monishat@admin.com',
        password: '123',
      };
      setDefaultValues(values);
      setActiveKey(role);
    } else if (role === 'vendor') {
      const values = {
        email: 'moinul@islam.com',
        password: '123',
      };
      setDefaultValues(values);
      setActiveKey(role);
    } else if (role === 'customer') {
      const values = {
        email: 'abdul@khaled.com',
        password: '123',
      };
      setDefaultValues(values);
      setActiveKey(role);
    }
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      const user = jwtDecode(data.data.token);
      dispatch(login({ user, token: data.data.token }));
      dispatch(clearRecent());
      navigate('/');
    }
  }, [isSuccess, isLoading, data, dispatch, navigate]);
  return (
    <div>
      <PageHeader title="My Account" />

      <div className="container flex items-center justify-center gap-2 !p-0 !pt-5">
        {config?.map(({ label, key }) => {
          console.log(activeKey, key);
          return (
            <Button
              key={key}
              onClick={() => handleCredentialsUpdate(key)}
              size="sm"
              variant="light"
              className={cn(activeKey === key && '!bg-athens-gray-100')}
            >
              {label}
            </Button>
          );
        })}
      </div>
      <div className="container flex items-center justify-center !py-5">
        <div className="min-w-96 space-y-6 border border-athens-gray-100 p-7">
          <div className="space-y-1.5">
            <h4 className="text-center text-xl font-bold text-h-black">
              Login
            </h4>
            <p className="text-center text-athens-gray-600">
              Please login using account detail bellow.
            </p>
          </div>
          <HForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <div className="space-y-4">
              <HInput placeholder="Email Address" name="email" />
              <HInput placeholder="Password" name="password" />
              <Link
                to="/password-recovery"
                className="ml-1 block cursor-pointer text-sm font-medium text-athens-gray-900"
              >
                Forgot Password?
              </Link>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Login'
                )}
              </Button>
              <div className="text-center text-athens-gray-600">
                <span>Don’t have an Account? </span>
                <Link to={'/register'} className="text-rose-600">
                  Create account
                </Link>
              </div>
            </div>
          </HForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
