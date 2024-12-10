import HFile from '@/components/form/HFile';
import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import HSelect from '@/components/form/HSelect';
import HTextarea from '@/components/form/HTextarea';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRegisterMutation } from '@/redux/features/auth/auth.api';
import { login } from '@/redux/features/auth/auth.slice';
import { TShop } from '@/types/shop.types';
import { TUser } from '@/types/user.types';
import { jwtDecode } from 'jwt-decode';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const use_role_options = [
  { value: 'CUSTOMER', label: 'Customer' },
  { value: 'VENDOR', label: 'Vendor' },
];

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isError, isSuccess, isLoading, data }] = useRegisterMutation();
  const [role, setRole] = useState('USER');

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData: TUser = {
      name: '',
      role: '',
      email: '',
      password: '',
      address: null,
    };
    const shopData: TShop = {
      name: '',
      description: '',
    };

    if (data) {
      userData.name = data.first_name + ' ' + data.last_name;
      userData.address = data.address;
      userData.email = data.email;
      userData.password = data.password;
      userData.role = data.role;
      shopData.name = data.shop_name;
      shopData.description = data.shop_description;
    }

    const formData = new FormData();

    if (data.profile) {
      formData.append('file', data.profile);
    }

    // Append userData and shopData as JSON strings
    formData.append('data', JSON.stringify({ user: userData, shop: shopData }));

    register(formData);
  };

  const handleChangeRole = (role: string) => {
    setRole(role);
  };

  useEffect(() => {
    if (!isError && isSuccess) {
      const user = jwtDecode(data.data.token);
      dispatch(login({ user, token: data.data.token }));
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, data, dispatch]);

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

              <HSelect
                onValueChange={handleChangeRole}
                name="role"
                options={use_role_options}
              />

              <HInput placeholder="Write your address" name="address" />
              <HInput
                placeholder="Write your password"
                type="password"
                name="password"
              />

              <Textarea
                required
                placeholder="Write about yourself"
                name="description"
                rows={7}
                className="outline-none !ring-0 focus:ring-0"
              />
              <HFile name="profile" />
              {role === 'VENDOR' ? (
                <>
                  <div className="relative my-5 w-full border-b border-b-athens-gray-100">
                    <div className="absolute inset-0 m-auto flex items-center justify-center">
                      <span className="block bg-white font-medium text-athens-gray-800">
                        Shop info
                      </span>
                    </div>
                  </div>{' '}
                  <HInput placeholder="Write your shop name" name="shop_name" />
                  <HTextarea
                    placeholder="Write your shop description"
                    name="shop_description"
                  />
                </>
              ) : null}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Register'
                )}
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
