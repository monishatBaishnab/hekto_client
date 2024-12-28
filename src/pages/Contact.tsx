import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import HTextarea from '@/components/form/HTextarea';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const Contact = () => {
  const handleSubmit: SubmitHandler<FieldValues> = () => {
    toast.success('Your message send us.');
  };

  const formSchema = z.object({
    first_name: z.string().min(1, { message: 'First Name is required' }),
    last_name: z.string().min(1, { message: 'Last Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    message: z
      .string()
      .min(10, { message: 'Message must be at least 10 characters long' }),
  });
  return (
    <div>
      <PageHeader title="Contact Us" />
      <div className="container">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
          <div>
            <div>
              <h3 className="mb-5 text-2xl font-semibold text-h-black">
                Get In Touch
              </h3>
              <HForm
                reset
                resolver={zodResolver(formSchema)}
                onSubmit={handleSubmit}
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <HInput
                      name="first_name"
                      label="First Name"
                      placeholder="Jhon"
                    />
                    <HInput
                      name="last_name"
                      label="Last Name"
                      placeholder="Deo"
                    />
                  </div>
                  <HInput
                    name="email"
                    placeholder="jhon@gmail.com"
                    label="Email"
                  />
                  <HTextarea
                    name="message"
                    placeholder="Details message hare"
                    label="Message"
                  />
                  <Button type="submit">Send us</Button>
                </div>
              </HForm>
            </div>
          </div>
          <div className="hidden size-full overflow-hidden md:block">
            <img
              className="size-full object-contain"
              src="https://i.ibb.co.com/7Sf5BK0/Group-124.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
