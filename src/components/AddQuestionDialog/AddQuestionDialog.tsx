import {type FC, type ReactNode, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  QuestionValidationSchema,
  type QuestionValidationSchemaType,
} from '@/redux/slices/testEditorSlice/schema/QuestionValidationSchema.ts';
import {testEditorSliceActions} from '@/redux/slices/testEditorSlice/slice/testEditorSlice.ts';
import {useAppDispatch} from '@/redux/hooks/reduxHooks.ts';
import {prepareOptionsForSave} from '@/redux/slices/testEditorSlice/utils/prepareOptionsForSave.ts';
import {QuestionConfiguration} from '@/components/QuestionConfiguration/QuestionConfiguration.tsx';

interface AddQuestionDialogProps {
  children: ReactNode;
}

export const AddQuestionDialog: FC<AddQuestionDialogProps> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [correctAnswerError, setCorrectAnswerError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {addQuestion} = testEditorSliceActions;

  const form = useForm<QuestionValidationSchemaType>({
    resolver: zodResolver(QuestionValidationSchema),
  });
  const {
    fields: options,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: 'options',
    control: form.control
  });

  const addOption = () => {
    appendOption({value: ''});
  };

  const handleSetCorrectAnswer = (newCorrectAnswer: number) => {
    setCorrectAnswer(newCorrectAnswer);
    setCorrectAnswerError(null);
  };

  const handleSaveQuestion = (values: QuestionValidationSchemaType) => {
    if (correctAnswer === null) {
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
    form.reset();
    setCorrectAnswer(null);
    removeOption();
    setCorrectAnswerError(null);
  };

  const handleRemoveOption = (index: number) => {
    removeOption(index);

    if (typeof correctAnswer === 'number') {
      if (index === correctAnswer) {
        setCorrectAnswer(null);
        return;
      }

      if (correctAnswer - index === 1) {
        setCorrectAnswer(index);
      }
    }
  };

  return (
    <QuestionConfiguration
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      form={form}
      options={options}
      correctAnswer={correctAnswer}
      handleSetCorrectAnswer={handleSetCorrectAnswer}
      handleAddOption={addOption}
      handleRemoveOption={handleRemoveOption}
      onSubmit={form.handleSubmit(handleSaveQuestion)}
      correctAnswerError={correctAnswerError}
      title="Добавить вопрос"
      submitBtnText="Добавить"
    >
      {children}
    </QuestionConfiguration>
  );
};
