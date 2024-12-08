import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useLogInMutation } from '@/redux/features/auth/auth.api';
import { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '@/redux/hooks';
import { login } from '@/redux/features/auth/auth.slice';

const Login = () => {
  const dispatch = useAppDispatch();
  const [loginFromServer, { data, isLoading, isSuccess }] = useLogInMutation();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    loginFromServer(data);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      const user = jwtDecode(data.data.token);
      dispatch(login({ user, token: data.data.token }));
    }
  }, [isSuccess, isLoading, data, dispatch]);

  return (
    <div>
      <PageHeader title="My Account" />

      <div className="container flex items-center justify-center">
        <div className="min-w-96 space-y-6 border border-athens-gray-100 p-7">
          <div className="space-y-1.5">
            <h4 className="text-center text-xl font-bold text-h-black">
              Login
            </h4>
            <p className="text-center text-athens-gray-600">
              Please login using account detail bellow.
            </p>
          </div>
          <HForm
            defaultValues={{ email: 'john.tech@example.com', password: '123' }}
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <HInput placeholder="Email Address" name="email" />
              <HInput placeholder="Password" name="password" />
              <span className="ml-1 block cursor-pointer text-sm font-medium text-athens-gray-900">
                Forgot Password?
              </span>
              <Button type="submit" className="w-full" size="lg">
                Login
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
