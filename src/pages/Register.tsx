import HFile from '@/components/form/HFile';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';

const sort_options = [
  { key: 'USER', label: 'User' },
  { key: 'VENDOR', label: 'Vendor' },
];

const Register = () => {
  return (
    <div>
      <PageHeader title="My Account" />

      <div className="container flex items-center justify-center">
        <div className="w-full space-y-6 border border-athens-gray-100 p-7 md:w-2/3 lg:w-1/2">
          <div className="space-y-1.5">
            <h4 className="text-center text-xl font-bold text-h-black">
              Register
            </h4>
            <p className="text-center text-athens-gray-600">
              Please register using account detail bellow.
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                placeholder="Write your first name"
                required
                id="first_name"
                className="h-12 px-4 outline-none !ring-0 focus:ring-0"
              />

              <Input
                required
                placeholder="Write your last name"
                id="last_name"
                className="h-12 px-4 outline-none !ring-0 focus:ring-0"
              />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                placeholder="Write your verified email"
                required
                id="email"
                className="h-12 px-4 outline-none !ring-0 focus:ring-0"
              />
              <Input
                required
                placeholder="Write your mobile number"
                id="mobile"
                className="h-12 px-4 outline-none !ring-0 focus:ring-0"
              />
            </div>
            <Select>
              <SelectTrigger className="h-12 w-full rounded-md px-4 !text-athens-gray-700 outline-none focus:ring-0">
                <SelectValue placeholder="Register as" />
              </SelectTrigger>
              <SelectContent>
                {sort_options?.map(({ key, label }) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              required
              placeholder="Write your address"
              id="address"
              className="h-12 px-4 outline-none !ring-0 focus:ring-0"
            />

            <Textarea
              required
              placeholder="Write about yourself"
              id="description"
              rows={7}
              className="outline-none !ring-0 focus:ring-0"
            />
            <HFile name="item" />
          </div>

          <Button className="w-full" size="lg">
            Register
          </Button>
          <div className="text-center text-athens-gray-600">
            <span>Already have an Account? </span>
            <Link to={'/login'} className="text-rose-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
