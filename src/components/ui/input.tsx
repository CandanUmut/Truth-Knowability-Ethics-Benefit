import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type ?? 'text'}
      className={cn(
        'block w-full rounded-xl border border-border bg-background px-4 h-11 text-[0.95rem] placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
