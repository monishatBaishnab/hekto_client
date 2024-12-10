import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TUser } from '@/types/user.types';
import { motion } from 'framer-motion';
import { Image, RefreshCcw, X } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';

const slideVariants = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const ShopForm = () => {
  const [file, setFile] = useState<File | null>(null);

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
                  Your shop photo will appear on your shop profile and directory
                  <br />
                  listing. PNG or JPG no bigger than 1000px wide and tall.
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
              <HInput placeholder="Write your first name" name="name" />

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

export default ShopForm;
