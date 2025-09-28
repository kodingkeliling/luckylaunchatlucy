import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'number' | 'tel' | 'textarea' | 'select' | 'checkbox';
  value?: string | number | boolean;
  onChange?: (value: string | number | boolean) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  selectOptions?: Array<{ value: string; label: string }>;
  checkboxLabel?: string;
  rows?: number;
  min?: number;
  max?: number;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  className,
  inputProps,
  textareaProps,
  selectOptions = [],
  checkboxLabel,
  rows = 3,
  min,
  max,
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (type === 'number') {
      onChange?.(parseInt(e.target.value) || 0);
    } else {
      onChange?.(e.target.value);
    }
  };

  const handleSelectChange = (value: string) => {
    onChange?.(value);
  };

  const handleCheckboxChange = (checked: boolean) => {
    onChange?.(checked);
  };

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            id={name}
            name={name}
            value={value as string || ''}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={cn(error && "border-destructive", className)}
            {...textareaProps}
          />
        );

      case 'select':
        return (
          <Select 
            value={value as string || ''} 
            onValueChange={handleSelectChange}
            disabled={disabled}
          >
            <SelectTrigger className={cn(error && "border-destructive", className)}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-start space-x-2">
            <Checkbox
              id={name}
              checked={value as boolean || false}
              onCheckedChange={handleCheckboxChange}
              disabled={disabled}
              className={cn(error && "border-destructive")}
            />
            <Label 
              htmlFor={name} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {checkboxLabel || label}
            </Label>
          </div>
        );

      default:
        return (
          <Input
            id={name}
            name={name}
            type={type}
            value={value as string || ''}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(error && "border-destructive", className)}
            {...inputProps}
          />
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="space-y-1">
        {renderInput()}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
