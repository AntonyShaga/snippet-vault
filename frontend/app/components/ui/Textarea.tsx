import React from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className = '', ...props }: Props) {
  return (
    <textarea
      {...props}
      className={`w-full bg-(--input) border border-(--border) text-foreground p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary) ${className}`}
    />
  );
}
