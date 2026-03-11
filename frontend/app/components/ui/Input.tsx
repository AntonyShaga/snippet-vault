import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full bg-(--input) border border-(--border) text-foreground p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary) ${className}`}
    />
  );
}
