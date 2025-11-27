'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div
      className={`flex items-center gap-2 p-3 bg-red-50 text-red-800 rounded-md text-sm ${className}`}
      role="alert"
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

