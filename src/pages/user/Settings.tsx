import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
  const [mode, setMode] = useState<'personal' | 'password'>('personal');

  return (
    <div className="w-full space-y-8">
      <h3 className="text-2xl font-bold text-h-black">Account settings</h3>
      <div className="flex items-center gap-3">
        <Button
          variant="light"
          onClick={() => setMode('personal')}
          className={cn(
            'rounded-full',
            mode === 'personal'
              ? 'bg-athens-gray-50 active:bg-athens-gray-50'
              : ''
          )}
        >
          Personal Info
        </Button>
        <Button
          variant="light"
          onClick={() => setMode('password')}
          className={cn(
            'rounded-full',
            mode === 'personal'
              ? ''
              : 'bg-athens-gray-50 active:bg-athens-gray-50'
          )}
        >
          Password and Security
        </Button>
      </div>

      {/* Profile Information */}
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
            Your profile photo will appear on your profile and directory <br />
            listing. PNG or JPG no bigger than 1000px wide and tall.
          </p>
          <Button variant="light" className="rounded-md">
            <RefreshCcw /> Update photo
          </Button>
        </div>
      </div>

      {/* Info Form */}

      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              placeholder="Write your first name"
              required
              id="first_name"
              className="h-12 px-4 outline-none !ring-0 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              required
              placeholder="Write your last name"
              id="last_name"
              className="h-12 px-4 outline-none !ring-0 focus:ring-0"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Write your verified email"
              required
              id="email"
              className="h-12 px-4 outline-none !ring-0 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              required
              placeholder="Write your mobile number"
              id="mobile"
              className="h-12 px-4 outline-none !ring-0 focus:ring-0"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            required
            placeholder="Write your address"
            id="address"
            className="h-12 px-4 outline-none !ring-0 focus:ring-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Information about you</Label>
          <Textarea
            required
            placeholder="Write about yourself"
            id="description"
            rows={7}
            className="outline-none !ring-0 focus:ring-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="lg"
          variant="light"
          className="rounded-md bg-athens-gray-50 px-5"
        >
          Cancel
        </Button>
        <Button size="lg" variant='dark' className='px-5'>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
