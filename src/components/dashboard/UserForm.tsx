import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import HSelect from '@/components/form/HSelect';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRegisterMutation } from '@/redux/features/auth/auth.api';
import { login } from '@/redux/features/auth/auth.slice';
import { TUser } from '@/types/user.types';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { Image, RefreshCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const slideVariants = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const use_role_options = [
  { value: 'CUSTOMER', label: 'Customer' },
  { value: 'VENDOR', label: 'Vendor' },
];

const UserForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const [register, { isError, isSuccess, data }] = useRegisterMutation();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData: Partial<TUser> = {};

    if (data) {
      userData.name = data.first_name + ' ' + data.last_name;
      userData.address = data.address;
      userData.email = data.email;
      userData.password = data.password;
      userData.role = data.role;
    }

    const formData = new FormData();

    if (data.profile) {
      formData.append('file', data.profile);
    }

    // Append userData and shopData as JSON strings
    formData.append('data', JSON.stringify({ userData }));
    console.log(data, file);
    // register(formData);
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
    <motion.div
      initial="initial"
      animate="animate"
      variants={slideVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-7">
        <HForm onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="flex items-center gap-8">
              <div className="size-32 shrink-0 overflow-hidden rounded-md">
                <img
                  className="size-full object-cover"
                  src="https://i.ibb.co.com/5G1XTfb/customer.webp"
                  alt=""
                />
              </div>
              <div className="space-y-3">
                <p className="text-athens-gray-600">
                  Profile photo: PNG/JPG, max dimensions 1000px.
                </p>

                <label htmlFor="profile" className="block cursor-pointer">
                  <div className="inline-flex items-center gap-2 rounded-md border border-athens-gray-100 bg-athens-gray-50 px-4 py-2 text-athens-gray-800">
                    <RefreshCcw className="size-4" /> <span>Update photo</span>
                  </div>
                </label>
                {file !== null ? (
                  <div className="inline-flex items-center gap-2 rounded-md border border-dashed border-athens-gray-100 px-2 py-1 text-athens-gray-600">
                    <Image className="size-4" />
                    <span className="text-sm">{file?.name}</span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="hover:text-slate-800"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : null}
                <input
                  onChange={(e) => setFile(e?.target?.files?.[0] || null)}
                  hidden
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>
            </div>
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
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="lg"
                variant="light"
                className="rounded-md bg-athens-gray-50 px-5"
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" variant="dark" className="px-5">
                Save Changes
              </Button>
            </div>
          </div>
        </HForm>
      </div>
    </motion.div>
  );
};

export default UserForm;
