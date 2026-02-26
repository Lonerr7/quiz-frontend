import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/common/Dialog';
import {Button} from '@/components/common';
import type {FC} from 'react';
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  handleClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  title = 'Внимание',
  description,
  handleClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[700px] flex flex-col gap-6 border-none shadow-2xl">
        <div className="flex flex-col gap-2">
          <DialogTitle className="text-2xl font-bold text-text-main mb-0">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="text-base text-text-muted text-balance leading-relaxed">
              {description}
            </DialogDescription>
          ) : (
            <VisuallyHidden>
              <DialogDescription/>
            </VisuallyHidden>
          )}
        </div>
        <DialogFooter>
          <div className="flex gap-3 sm:justify-end mt-2">
            <Button variant="outline" size="sm" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="danger" size="sm" onClick={onConfirm}>
              Завершить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
