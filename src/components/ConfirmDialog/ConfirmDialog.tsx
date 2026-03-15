import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/common/Dialog';
import {Button} from '@/components/common';
import type {FC} from 'react';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {cn} from '@/helpers/utils/cn.ts';
import type {ButtonVariantsType} from '@/components/common/Button.tsx';

export interface ConfirmDialogProps {
  className?: string;
  open: boolean;
  title?: string;
  description?: string;
  confirmButtonVariant?: ButtonVariantsType;
  confirmButtonText?: string;
  isLoading?: boolean;
  loadingButtonText?: string;
  onConfirm: () => void;
  onOpenChange?: () => void;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  className,
  open,
  title = 'Внимание',
  description,
  confirmButtonVariant = 'default',
  confirmButtonText = 'ОК',
  isLoading = false,
  loadingButtonText = '',
  onConfirm,
  onOpenChange,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (onOpenChange) {
          onOpenChange();
        }
      }}
    >
      <DialogContent className={cn('flex flex-col gap-6 border-none shadow-2xl', className)}>
        <div className="flex flex-col gap-2">
          <DialogTitle className="md:text-2xl font-bold text-text-main mb-0">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-base text-text-muted text-balance leading-relaxed">
              {description}
            </DialogDescription>
          ) : (
            <VisuallyHidden>
              <DialogDescription />
            </VisuallyHidden>
          )}
        </div>
        <DialogFooter>
          <div className="flex gap-3 sm:justify-end mt-2">
            <Button
              variant={confirmButtonVariant}
              size="sm"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading && loadingButtonText ? `${loadingButtonText}...` : confirmButtonText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
