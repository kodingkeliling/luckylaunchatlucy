import { forwardRef } from 'react';

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  required?: boolean;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, error, required = false, className = '', onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Filter to only allow numeric characters
      const numericValue = e.target.value.replace(/[^0-9]/g, '');
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: numericValue
        }
      };
      onChange?.(newEvent);
    };

    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-accent">*</span>}
        </label>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          onChange={handleChange}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
