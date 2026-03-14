import {useState} from 'react';
import {Button, Input, Label} from '@/components/common';
import {useAppDispatch, useAppSelector} from '@/redux/hooks/reduxHooks.ts';
import {getTestName} from '@/redux/slices/testEditorSlice/selectors/getTestName.ts';
import {testEditorSliceActions} from '@/redux/slices/testEditorSlice/slice/testEditorSlice.ts';
import {Textarea} from '@/components/common/Textarea.tsx';
import {getTestDescription} from '@/redux/slices/testEditorSlice/selectors/getTestDescription.ts';
import {AddQuestionDialog} from '@/components';
import {getTestQuestions} from '@/redux/slices/testEditorSlice/selectors/getTestQuestions.ts';
import {EditTestQuestionsList} from '@/components/EditTestQuestionsList/EditTestQuestionsList.tsx';

export const TestEditorForm = () => {
  const testName = useAppSelector(getTestName);
  const testDescription = useAppSelector(getTestDescription);
  const testQuestions = useAppSelector(getTestQuestions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {changeTestName, changeTestDescription} = testEditorSliceActions;

  return (
    <form className="flex flex-col gap-5">
      <div className="form-control">
        <Label htmlFor="name">Название теста</Label>
        <Input
          name="name"
          id="name"
          value={testName}
          onChange={(e) => dispatch(changeTestName(e.target.value))}
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

      {isAddDialogOpen && (
        <AddQuestionDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen}/>
      )}
    </form>
  );
};
