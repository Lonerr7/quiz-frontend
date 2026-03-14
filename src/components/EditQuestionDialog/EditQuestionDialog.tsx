import {type FC, type ReactNode, useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  QuestionValidationSchema,
  type QuestionValidationSchemaType,
} from '@/redux/slices/testEditorSlice/schema/QuestionValidationSchema.ts';
import {testEditorSliceActions} from '@/redux/slices/testEditorSlice/slice/testEditorSlice.ts';
import {useAppDispatch} from '@/redux/hooks/reduxHooks.ts';
import {prepareOptionsForSave} from '@/redux/slices/testEditorSlice/utils/prepareOptionsForSave.ts';
import {transformQuestionOptions} from '@/redux/slices/testEditorSlice/utils/transformQuestionOptions.ts';
import {QuestionConfiguration} from '@/components/QuestionConfiguration/QuestionConfiguration.tsx';

interface EditQuestionDialogProps {
  children: ReactNode;
  questionIndex: number;
  initialQuestionText: string;
  initialOptions: string[];
  initialCorrectAnswer: number;
}

export const EditQuestionDialog: FC<EditQuestionDialogProps> = (props) => {
  const {children, questionIndex, initialQuestionText, initialOptions, initialCorrectAnswer} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(initialCorrectAnswer);
  const [correctAnswerError, setCorrectAnswerError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {editQuestion} = testEditorSliceActions;

  const form = useForm<QuestionValidationSchemaType>({
    resolver: zodResolver(QuestionValidationSchema),
    defaultValues: {
      questionText: initialQuestionText,
      options: transformQuestionOptions(initialOptions),
    }
  });
  const {
    fields: options,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: 'options',
    control: form.control,
  });

  useEffect(() => {
    if (isOpen) {
      form.setValue('questionText', initialQuestionText);
      form.setValue('options', transformQuestionOptions(initialOptions));
      setCorrectAnswer(initialCorrectAnswer);
    }
  }, [isOpen]);

  const addOption = () => {
    appendOption({value: ''});
  };

  const handleSetCorrectAnswer = (newCorrectAnswer: number) => {
    setCorrectAnswer(newCorrectAnswer);
    setCorrectAnswerError(null);
  };

  const handleEditQuestion = (values: QuestionValidationSchemaType) => {
    if (correctAnswer === null) {
      setCorrectAnswerError('Не выбран правильный ответ');
      return;
    }

    dispatch(
      editQuestion({
        questionIndex: questionIndex,
        question: {
          text: values.questionText,
          options: prepareOptionsForSave(values.options),
          correctAnswer,
        }
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
      onSubmit={form.handleSubmit(handleEditQuestion)}
      correctAnswerError={correctAnswerError}
      title="Редактировать вопрос"
      submitBtnText="Сохранить"
    >
      {children}
    </QuestionConfiguration>
  );
};
