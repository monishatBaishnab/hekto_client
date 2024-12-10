import { Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '../ui/label';

type TOption = { label: string; value: string };

type THSelect = {
  name: string;
  label?: string;
  options: TOption[];
  onValueChange?: (e: string) => void;
};

const HSelect = ({ name, label, options, onValueChange }: THSelect) => {
  return (
    <Controller
      name={name}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error },
      }) => {
        // const defaultValue = options?.find((option) => option.value == value);
        return (
          <fieldset className="space-y-1">
            {label ? <Label htmlFor={name}>{label}</Label> : null}
            <div className="relative">
              <Select
                onValueChange={(e) => {
                  onChange(e);
                  if (onValueChange) {
                    onValueChange(e);
                  }
                }}
                {...field}
                defaultValue={value}
              >
                <SelectTrigger className="h-12 w-full rounded-md px-4 !text-athens-gray-700 outline-none focus:ring-0">
                  <SelectValue placeholder="Register as" />
                </SelectTrigger>
                <SelectContent>
                  {options?.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error ? (
              <small className="text-red-500">{error?.message}</small>
            ) : null}
          </fieldset>
        );
      }}
    />
  );
};

export default HSelect;
