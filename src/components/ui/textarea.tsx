import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'block w-full rounded-xl border border-border bg-background px-4 py-3 text-[0.95rem] leading-relaxed placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-60 resize-y min-h-[120px]',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
