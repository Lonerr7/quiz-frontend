import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/common/Dialog.tsx';
import {cn} from '@/helpers/utils/cn.ts';
import {Button, ErrorMessage, Input, Label, Spinner} from '@/components/common';
import {type FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

interface ModalInputProps {
  className?: string;
  open: boolean;
  onOpenChange?: () => void;
  confirmButtonText: string;
  isLoading: boolean;
  onConfirm: (name: string) => void;
}

const validationSchema = z.object({
  name: z
    .string()
    .min(1, 'Введите имя')
    .refine((val) => val.trim(), 'Введите корректное имя'),
});

type ValidationSchemaType = z.infer<typeof validationSchema>;

export const ModalInput: FC<ModalInputProps> = (props) => {
  const {className, open, onOpenChange, confirmButtonText, isLoading, onConfirm} = props;
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const submit = (fields: ValidationSchemaType) => {
    onConfirm(fields.name);
  };

  console.log(errors);

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
        <div className="flex flex-col gap-2 mb-5">
          <DialogTitle className="md:text-2xl font-bold text-text-main mb-2">
            Завершить тест
          </DialogTitle>
          <DialogDescription>Для завершения теста введите ваше имя</DialogDescription>
        </div>
        <form className="form-control" onSubmit={handleSubmit(submit)}>
          <Label htmlFor="name">Имя</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <ErrorMessage className="mt-2">{errors.name.message}</ErrorMessage>}

          <div className="flex justify-end items-center gap-3 mt-8">
            {isLoading && <Spinner className="w-6 h-6" />}
            <Button size="sm" disabled={isLoading}>
              {confirmButtonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
