'use client';

import { FormField } from './form-field';

interface PhoneInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string | number | boolean) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

export default function PhoneInput({
  label = "Nomor Telepon",
  name,
  value,
  onChange,
  required = false,
  error,
  placeholder
}: PhoneInputProps) {
  const handleChange = (newValue: string | number | boolean) => {
    // Filter out non-numeric characters
    const numericValue = String(newValue).replace(/[^0-9]/g, '');
    onChange(numericValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent non-numeric characters from being typed
    const char = String.fromCharCode(e.which);
    if (!/[0-9]/.test(char)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Filter pasted content to only allow numbers
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const numericOnly = pastedText.replace(/[^0-9]/g, '');
    onChange(numericOnly);
  };

  return (
    <FormField
      label={label}
      name={name}
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      error={error}
      inputProps={{
        inputMode: "numeric",
        onKeyPress: handleKeyPress,
        onPaste: handlePaste,
        autoComplete: "tel"
      }}
    />
  );
}