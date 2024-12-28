import { Controller } from 'react-hook-form';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

type THRatingProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

const HRating = ({ name, label, disabled }: THRatingProps) => {
  return (
    <Controller
      name={name}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error },
      }) => {
        return (
          <fieldset className="space-y-1">
            {label && <label htmlFor={name}>{label}</label>}
            <div className="relative">
              <Rating
                isDisabled={disabled}
                style={{ maxWidth: 180 }}
                value={value || 0} // Default to 0 if no value is passed
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(value: any) => onChange(value)} // Update value in form
                {...field}
              />
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

export default HRating;
