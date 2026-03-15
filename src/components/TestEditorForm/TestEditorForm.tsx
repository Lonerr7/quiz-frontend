import {type FormEvent, useEffect, useState} from 'react';
import {Button, ErrorMessage, Input, Label} from '@/components/common';
import {useAppDispatch, useAppSelector} from '@/redux/hooks/reduxHooks.ts';
import {getTestName} from '@/redux/slices/testEditorSlice/selectors/getTestName.ts';
import {testEditorSliceActions} from '@/redux/slices/testEditorSlice/slice/testEditorSlice.ts';
import {Textarea} from '@/components/common/Textarea.tsx';
import {getTestDescription} from '@/redux/slices/testEditorSlice/selectors/getTestDescription.ts';
import {AddQuestionDialog} from '@/components';
import {getTestQuestions} from '@/redux/slices/testEditorSlice/selectors/getTestQuestions.ts';
import {EditTestQuestionsList} from '@/components/EditTestQuestionsList/EditTestQuestionsList.tsx';
import {useAddTestMutation} from "@/api/endpoints/testsEndpoints/testsEndpoints.ts";
import {useNavigate} from "react-router";
import {handleApiError} from "@/api/helpers/handleApiError.ts";
import {toast} from "sonner";

export const TestEditorForm = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (testName.length && errorMsg && errorMsg.type === 'name') {
      setErrorMsg(null);
    }

    if (testQuestions.length && errorMsg && errorMsg.type === 'questions') {
      setErrorMsg(null);
    }
  }, [testQuestions.length, errorMsg, testName]);

  const handleAddTest = async (e: FormEvent<HTMLFormElement>) => {
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
      await addTest().unwrap();
      navigate('/');
      toast.success('Тест успешно создан', {duration: 7000});
    } catch (err: any) {
      handleApiError(err);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleAddTest}>
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
        <Button size="full">{!isLoading ? 'Сохранить тест' : 'Сохраняем...'}</Button>
        {errorMsg && <ErrorMessage className="mt-2">{errorMsg.message}</ErrorMessage>}
      </div>
      {isAddDialogOpen && (
        <AddQuestionDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} />
      )}
    </form>
  );
};
