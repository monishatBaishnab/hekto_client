import HFile from '@/components/form/HFile';
import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import HSelect from '@/components/form/HSelect';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

const use_role_options = [
  { value: 'USER', label: 'User' },
  { value: 'VENDOR', label: 'Vendor' },
];

const Register = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
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

          <HForm onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <HInput placeholder="Write your first name" name="first_name" />
                <HInput placeholder="Write your last name" name="last_name" />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <HInput placeholder="Write your verified email" name="email" />
                <HInput placeholder="Write your mobile number" name="mobile" />
              </div>

              <HSelect name="role" options={use_role_options} />

              <HInput placeholder="Write your address" name="address" />

              <Textarea
                required
                placeholder="Write about yourself"
                name="description"
                rows={7}
                className="outline-none !ring-0 focus:ring-0"
              />
              <HFile name="profile" />
              <Button type="submit" className="w-full" size="lg">
                Register
              </Button>
            </div>
          </HForm>
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
