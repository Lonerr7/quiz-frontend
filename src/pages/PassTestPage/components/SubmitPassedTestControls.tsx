import {Button, Spinner} from "@/components/common";
import {useSubmitTestMutation} from "@/api/endpoints/testsEndpoints/testsEndpoints.ts";
import type {ITestForUser} from "@/api/endpoints/testsEndpoints/TestsEndpointsSchema.ts";
import {type FC, useState} from "react";
import {useAppSelector} from "@/redux/hooks/reduxHooks.ts";
import {getPassTestAnswers} from "@/redux/slices/passTestSlice/selectors/getPassTestAnswers.ts";
import {ConfirmDialog} from "@/components/ConfirmDialog/ConfirmDialog.tsx";
import {useNavigate} from "react-router";

interface SubmitPassedTestControlsProps {
  testFromServer: ITestForUser | undefined;
}

export const SubmitPassedTestControls: FC<SubmitPassedTestControlsProps> = ({testFromServer}) => {
  const navigate = useNavigate();
  const [submitTest, {isLoading: isTestSubmitting}] = useSubmitTestMutation();
  const userAnswers = useAppSelector(getPassTestAnswers);
  const testQuestions = testFromServer?.questions || [];
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  const finishTest = async () => {
    const response = await submitTest();

    if (response.data) {
      navigate('/test-result', {state: {testResult: response.data}});
    }
  }

  const handleSubmit = () => {
    if (Object.keys(userAnswers).length !== testQuestions.length) {
      setIsSubmitDialogOpen(true);
      return;
    }
    finishTest();
  }

  return (
    <div className="flex justify-end items-center gap-2">
      {isTestSubmitting && <Spinner className="w-6 h-6"/>}
      <Button className="items-center gap-1.5" onClick={handleSubmit} disabled={isTestSubmitting}>
        <span>Завершить тест</span>
      </Button>
      <ConfirmDialog
        open={isSubmitDialogOpen}
        title="Внимание"
        description="Вы не ответили на все вопросы. Все равно хотите завершить тест?"
        handleClose={() => setIsSubmitDialogOpen(false)}
        onConfirm={finishTest}
      />
    </div>
  )
}