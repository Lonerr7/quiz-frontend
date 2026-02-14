import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@/helpers/utils/cn';
import type { FC } from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none outline-none ring-offset-2 focus-visible:ring-2 active:scale-[0.98] font-open-sans',
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:ring-secondary",
        outline:
          "bg-transparent border border-border text-text-main hover:bg-bg-main hover:border-text-muted",
        ghost:
          "bg-transparent text-text-muted hover:bg-primary-light hover:text-primary",
        danger:
          "bg-error text-white hover:opacity-90 focus-visible:ring-error",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-md",
        medium: "h-11 px-6 text-base font-semibold rounded-lg",
        icon: "h-10 w-10 rounded-md p-2",
        full: "w-full h-11 px-6 text-base font-semibold rounded-lg"
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium'
    }
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button: FC<ButtonProps> = ({ className, variant, size, asChild = false, children, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  )
}