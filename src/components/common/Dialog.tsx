import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import {cn} from '@/helpers/utils/cn.ts';
import {X} from 'lucide-react';
import type {FC} from "react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({className, ...props}, ref) => (
  <DialogPrimitive.Overlay
    className={cn('fixed inset-0 bg-black/80 z-50', className)}
    ref={ref}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogTitle: FC<React.ComponentProps<typeof DialogPrimitive.Title>> = ({children, className, ...props}) => {
  return (
    <DialogPrimitive.Title className={cn('text-center text-base font-medium md:text-lg mb-4', className)} {...props}>
      {children}
    </DialogPrimitive.Title>
  )
};

const DialogDescription: FC<React.ComponentProps<typeof DialogPrimitive.Description>> = ({className, children, ...props}) => {
  return (
    <DialogPrimitive.Description className={cn('text-center text-sm', className)} {...props}>
      {children}
    </DialogPrimitive.Description>
  )
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({className, children, ...props}, ref) => (
  <DialogPortal>
    <DialogOverlay/>
    <DialogPrimitive.Content
      className={cn('max-w-[90%] min-h-[30vh] py-7 px-5 fixed top-1/2 left-1/2 -translate-1/2 z-50 bg-bg-main border border-black rounded-xl', className)}
      ref={ref}
      {...props}
    >
      <DialogClose className="absolute top-1 right-1">
        <X size={20}/>
      </DialogClose>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));

interface DialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

const DialogFooter: FC<DialogFooterProps> = ({children, className}) => {
  return (
    <div className={cn('absolute bottom-5 right-5', className)}>
      {children}
    </div>
  )
}

DialogClose.displayName = DialogPrimitive.Content.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
}