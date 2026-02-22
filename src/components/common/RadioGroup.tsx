import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';
import { forwardRef } from "react";
import { cn } from "@/helpers/utils/cn.ts";

const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn('grid gap-3', className)}
      {...restProps}
    >
      {children}
    </RadioGroupPrimitive.Root>
  )
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Базовые стили: размер, круг, граница и фон из твоей темы
        "aspect-square size-5 rounded-full border border-input-border bg-surface text-primary shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
        // Состояние при выборе: меняем цвет границы на основной бирюзовый
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 hover:border-primary/70",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="size-2.5 rounded-full bg-primary animate-in fade-in zoom-in duration-200" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };