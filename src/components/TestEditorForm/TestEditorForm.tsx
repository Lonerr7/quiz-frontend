import {type FC, type FormEvent, useEffect, useState} from 'react';
import {Button, ErrorMessage, Input, Label} from '@/components/common';
import {useAppDispatch, useAppSelector} from '@/redux/hooks/reduxHooks.ts';
import {getTestName} from '@/redux/slices/testEditorSlice/selectors/getTestName.ts';
import {testEditorSliceActions} from '@/redux/slices/testEditorSlice/slice/testEditorSlice.ts';
import {Textarea} from '@/components/common/Textarea.tsx';
import {getTestDescription} from '@/redux/slices/testEditorSlice/selectors/getTestDescription.ts';
import {AddQuestionDialog} from '@/components';
import {getTestQuestions} from '@/redux/slices/testEditorSlice/selectors/getTestQuestions.ts';
import {EditTestQuestionsList} from '@/components/EditTestQuestionsList/EditTestQuestionsList.tsx';
import {
  useAddTestMutation,
  useDeleteTestMutation,
  useEditTestMutation,
} from '@/api/endpoints/testsEndpoints/testsEndpoints.ts';
import {useNavigate} from 'react-router';
import {handleApiError} from '@/api/helpers/handleApiError.ts';
import {toast} from 'sonner';
import {getTestId} from '@/redux/slices/testEditorSlice/selectors/getTestId.ts';

interface TestEditorFormProps {
  mode: 'addTest' | 'editTest';
}

export const TestEditorForm: FC<TestEditorFormProps> = ({mode}) => {
  const navigate = useNavigate();
  const testId = useAppSelector(getTestId);
  const testName = useAppSelector(getTestName);
  const testDescription = useAppSelector(getTestDescription);
  const testQuestions = useAppSelector(getTestQuestions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<{type: 'name' | 'questions'; message: string} | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const {changeTestName, changeTestDescription} = testEditorSliceActions;
  const [addTest, {isLoading}] = useAddTestMutation();
  const [editTest, {isLoading: isTestEditing}] = useEditTestMutation();
  const [deleteTest, {isLoading: isTestDeleting}] = useDeleteTestMutation();

  useEffect(() => {
    if (testName.length && errorMsg && errorMsg.type === 'name') {
      setErrorMsg(null);
    }

    if (testQuestions.length && errorMsg && errorMsg.type === 'questions') {
      setErrorMsg(null);
    }
  }, [testQuestions.length, errorMsg, testName]);

  const handleSubmitTest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTestName = testName.trim();
    if (!trimmedTestName) {
      setErrorMsg({type: 'name', message: 'Введите название теста'});
      return;
    }

    if (!testQuestions.length) {
      setErrorMsg({type: 'questions', message: 'Добавьте хотя бы 1 вопрос'});
      return;
    }

    try {
      if (mode === 'addTest') {
        await addTest().unwrap();
        toast.success('Тест успешно создан', {duration: 7000});
      } else {
        if (!testId) {
          return;
        }
        await editTest(testId).unwrap();
        toast.success('Тест успешно отредактирован', {duration: 7000});
      }

      navigate('/');
    } catch (err: any) {
      handleApiError(err);
    }
  };

  const handleDeleteTest = async () => {
    try {
      if (!testId) {
        return;
      }
      await deleteTest(testId).unwrap();
      toast.success('Тест успешно удалён', {duration: 7000});
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmitTest}>
        <div className="form-control">
          <Label htmlFor="name">Название теста</Label>
          <Input
            name="name"
            id="name"
            value={testName}
            onChange={(e) => {
              dispatch(changeTestName(e.target.value));
            }}
          />
        </div>
        <div className="form-control">
          <Label htmlFor="description">Описание (необязательно)</Label>
          <Textarea
            value={testDescription}
            onChange={(e) => dispatch(changeTestDescription(e.target.value))}
          />
        </div>
        <div>
          <EditTestQuestionsList questions={testQuestions} />
          <Button
            className="mt-5"
            type="button"
            variant="outline"
            size="full"
            onClick={() => setIsAddDialogOpen(true)}
          >
            Добавить вопрос
          </Button>
        </div>
        <div>
          <Button size="full" disabled={isLoading || isTestEditing}>
            {!isLoading || !isTestEditing ? 'Сохранить тест' : 'Сохраняем...'}
          </Button>
          {errorMsg && <ErrorMessage className="mt-2">{errorMsg.message}</ErrorMessage>}
        </div>
        {mode === 'editTest' && (
          <Button variant="danger" size="full" onClick={handleDeleteTest} disabled={isTestDeleting}>
            {!isTestDeleting ? 'Удалить тест' : 'Удаляем'}
          </Button>
        )}
        {isAddDialogOpen && (
          <AddQuestionDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} />
        )}
      </form>
    </>
  );
};
