import { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, required = false, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-start">
          <input
            ref={ref}
            type="checkbox"
            className={`mt-1 mr-3 ${className}`}
            {...props}
          />
          <label className="text-sm text-gray-700">
            {label} {required && <span className="text-accent">*</span>}
          </label>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
