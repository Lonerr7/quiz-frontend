import type {ComponentProps, FC} from 'react';
import {cn} from '@/helpers/utils/cn.ts';

type TextareaProps = ComponentProps<'textarea'>;

export const Textarea: FC<TextareaProps> = ({className, ...props}) => {
  return (
    <textarea
      className={cn(
        'min-h-24 min-w-[100px] rounded-lg px-4 py-2 text-base transition duration-200',
        'bg-input-bg border border-input-border text-text-main',
        'placeholder:text-input-placeholder/70 selection:bg-primary-light',
        'hover:border-text-muted/50',
        'outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10',
        'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
};
