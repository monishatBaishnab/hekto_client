import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Login = () => {
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
          <div className="space-y-4">
            <Input
              placeholder="Email Address"
              required
              id="email"
              className="h-12 px-4 outline-none !ring-0 focus:ring-0"
            />
            <Input
              placeholder="Email Address"
              required
              id="email"
              className="h-12 px-4 outline-none !ring-0 focus:ring-0"
            />
            <span className="ml-1 block cursor-pointer text-sm font-medium text-athens-gray-900">
              Forgot Password?
            </span>
            <Button className="w-full" size="lg">
              Login
            </Button>
            <div className="text-center text-athens-gray-600">
              <span>Don’t have an Account? </span>
              <Link to={'/register'} className="text-rose-600">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
