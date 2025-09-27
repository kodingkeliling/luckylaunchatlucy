import { ReactNode } from 'react';

interface AlertProps {
  type: 'error' | 'success' | 'warning' | 'info';
  children: ReactNode;
  className?: string;
}

export default function Alert({ type, children, className = '' }: AlertProps) {
  const baseClasses = 'p-4 rounded-md';
  
  const typeClasses = {
    error: 'bg-red-100 text-red-700 border border-red-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    info: 'bg-blue-100 text-blue-700 border border-blue-200'
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${className}`}>
      {children}
    </div>
  );
}
