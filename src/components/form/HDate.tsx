import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker'; // If you're using a library like react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import necessary styles for the date picker
import { Label } from '../ui/label';

const HDatePicker = ({ name, label }: { name: string; label?: string }) => {
  const { control } = useFormContext(); // Get the control from the parent form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div className="space-y-2">
          {label && <Label htmlFor={name}>{label}</Label>}
          <DatePicker
            selected={value}
            onChange={(date) => onChange(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select a date"
            wrapperClassName='w-full'
            className="w-full rounded-md border border-athens-gray-100 px-4 py-3 text-base text-athens-gray-950 shadow-sm focus:outline-none"
          />
        </div>
      )}
    />
  );
};

export default HDatePicker;
