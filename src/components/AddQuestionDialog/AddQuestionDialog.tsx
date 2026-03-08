import {type FC, type ReactNode, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/common/Dialog';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {Button, ErrorMessage, Input, Label} from '@/components/common';
import {Check, Plus, Trash2} from 'lucide-react';
import {cn} from '@/helpers/utils/cn.ts';
import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  QuestionValidationSchema,
  type QuestionValidationSchemaType,
} from '@/redux/slices/testEditorSlice/schema/QuestionValidationSchema.ts';
import {testEditorSliceActions} from '@/redux/slices/testEditorSlice/slice/testEditorSlice.ts';
import {useAppDispatch} from '@/redux/hooks/reduxHooks.ts';
import {prepareOptionsForSave} from '@/redux/slices/testEditorSlice/utils/prepareOptionsForSave.ts';

interface AddQuestionDialogProps {
  children: ReactNode;
}

export const AddQuestionDialog: FC<AddQuestionDialogProps> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [correctAnswerError, setCorrectAnswerError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {addQuestion} = testEditorSliceActions;

  const {
    register,
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<QuestionValidationSchemaType>({
    resolver: zodResolver(QuestionValidationSchema),
  });
  const {
    fields: options,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: 'options',
    control,
  });

  const handleSetCorrectAnswer = (newCorrectAnswer: number) => {
    setCorrectAnswer(newCorrectAnswer);
    setCorrectAnswerError(null);
  };

  const handleSaveQuestion = (values: QuestionValidationSchemaType) => {
    if (!correctAnswer) {
      setCorrectAnswerError('Не выбран правильный ответ');
      return;
    }

    dispatch(
      addQuestion({
        text: values.questionText,
        options: prepareOptionsForSave(values.options),
        correctAnswer,
      }),
    );
    setIsOpen(false);
    reset();
    setCorrectAnswer(null);
    removeOption();
    setCorrectAnswerError(null);
  };

  const handleRemoveOption = (index: number) => {
    removeOption(index);
    if (index === correctAnswer) {
      setCorrectAnswer(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95%] md:max-w-[700px] p-8 gap-8 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col gap-1 mb-8">
          <DialogTitle className="text-2xl font-bold text-text-main">Добавить вопрос</DialogTitle>
        </div>

        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit(handleSaveQuestion)}>
          <div className="form-control gap-2.5">
            <Label
              htmlFor="questionText"
              className="text-sm font-bold uppercase tracking-wider opacity-70"
            >
              Текст вопроса
            </Label>
            <Input className="text-lg py-6 px-4" {...register('questionText')} id="questionText" />
            {errors.questionText && (
              <ErrorMessage className="mt-1">{errors.questionText.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider opacity-70">
                Варианты ответа
              </span>
              <span className="text-xs text-text-muted italic">
                {options.length > 0
                  ? `Всего: ${options.length}`
                  : 'Добавьте варианты ответов (минимум 2)'}
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              {options.map((option, i) => (
                <li
                  key={option.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border transition-all duration-200',
                    i === correctAnswer
                      ? 'bg-primary/5 border-primary shadow-sm'
                      : 'bg-bg-main border-transparent',
                  )}
                >
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center gap-2.5">
                        <Label className="text-xs font-bold text-text-muted w-4" htmlFor={`${i}`}>
                          {i + 1}.
                        </Label>
                        <Input
                          className="w-full bg-surface border-input-border focus:border-primary transition-colors"
                          {...register(`options.${i}.value` as const)}
                          id={`${i}`}
                          placeholder={`Вариант ${i + 1}`}
                        />
                      </div>
                      <Button
                        type="button"
                        variant={i === correctAnswer ? 'default' : 'outline'}
                        className={cn(
                          'px-3 transition-all',
                          i === correctAnswer
                            ? 'bg-primary text-white'
                            : 'text-text-muted hover:text-primary',
                        )}
                        onClick={() => handleSetCorrectAnswer(i)}
                        title="Отметить как правильный"
                      >
                        <Check size={18} strokeWidth={3} />
                      </Button>
                      <Button
                        className="px-3"
                        type="button"
                        variant="danger"
                        onClick={() => handleRemoveOption(i)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                    {errors.options && errors.options[i] && (
                      <ErrorMessage className="mt-2.5 ml-[27px]">
                        {errors.options[i].value?.message}
                      </ErrorMessage>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <Button
              className="w-fit border-dashed border-2 hover:border-primary hover:text-primary py-5 px-8 rounded-xl"
              variant="outline"
              size="sm"
              type="button"
              onClick={() => appendOption({value: ''})}
            >
              <Plus size={18} className="mr-2" />
              Добавить вариант
            </Button>

            {errors.options?.root ? (
              <ErrorMessage>{errors.options.root.message}</ErrorMessage>
            ) : errors.options?.message ? (
              <ErrorMessage>{errors.options.message}</ErrorMessage>
            ) : null}
            {correctAnswerError && (
              <ErrorMessage className="mt-2.5">{correctAnswerError}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end mt-8 gap-3 pt-4">
            <Button
              className="w-full sm:w-auto order-2 sm:order-1"
              variant="outline"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Закрыть
            </Button>
            <Button className="w-full sm:w-auto order-1 sm:order-2 px-8">Добавить</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
