import {Button} from '@/components/common';
import {useSubmitTestMutation} from '@/api/endpoints/testsEndpoints/testsEndpoints.ts';
import type {ITestForUser} from '@/api/endpoints/testsEndpoints/schema/TestsEndpointsSchema.ts';
import {type FC, type RefObject, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/hooks/reduxHooks.ts';
import {getPassTestAnswers} from '@/redux/slices/passTestSlice/selectors/getPassTestAnswers.ts';
import {useNavigate} from 'react-router';
import {findUnansweredQuestion} from '../helpers/findUnansweredQuestion.ts';
import {ConfirmDialog} from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import {passTestSliceActions} from '@/redux/slices/passTestSlice/slice/passTestSlice.ts';
import {toast} from 'sonner';
import {handleApiError} from '@/api/helpers/handleApiError.ts';
import {ModalInput} from '@/components/ModalInput/ModalInput.tsx';

interface SubmitPassedTestControlsProps {
  testFromServer: ITestForUser | undefined;
  questionRefs: RefObject<Map<string, HTMLLIElement>>;
}

export const SubmitPassedTestControls: FC<SubmitPassedTestControlsProps> = ({
  testFromServer,
  questionRefs,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [submitTest, {isLoading: isTestSubmitting}] = useSubmitTestMutation();
  const userAnswers = useAppSelector(getPassTestAnswers);
  const unansweredQuestionId = useRef<string>('');
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const {setUnansweredQuestion} = passTestSliceActions;
  const dispatch = useAppDispatch();
  const timerRef = useRef<number>(null);

  const testQuestionIds = useMemo(() => {
    if (!testFromServer?.questions) {
      return [];
    }

    return testFromServer.questions.map((q) => q._id);
  }, [testFromServer]);

  const finishTest = async (name: string) => {
    if (!name) {

      return;
    }

    try {
      const passedTest = await submitTest(name).unwrap();
      toast.dismiss();
      navigate('/test-result', {state: {testResult: passedTest}});
    } catch (err: any) {
      handleApiError(err);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(userAnswers).length !== testQuestionIds.length) {
      unansweredQuestionId.current = findUnansweredQuestion(testQuestionIds, userAnswers);

      setIsSubmitDialogOpen(true);
      return;
    }
    setIsOpen(true);
  };

  const handleCloseModalWithScroll = () => {
    const unansweredQuestion = questionRefs.current?.get(unansweredQuestionId.current);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (unansweredQuestion) {
      dispatch(setUnansweredQuestion(unansweredQuestionId.current));
      unansweredQuestion.scrollIntoView({behavior: 'smooth', block: 'center'});

      timerRef.current = setTimeout(() => {
        dispatch(setUnansweredQuestion(null));
      }, 3000);
    }
    setIsSubmitDialogOpen(false);
  };

  return (
    <div className="flex justify-end items-center gap-2">
      <Button className="items-center gap-1.5" onClick={handleSubmit} disabled={isTestSubmitting}>
        <span>Завершить тест</span>
      </Button>
      <ConfirmDialog
        className="w-[450px]"
        open={isSubmitDialogOpen}
        description="Вы не ответили на все вопросы!"
        onConfirm={handleCloseModalWithScroll}
        onOpenChange={handleCloseModalWithScroll}
      />
      <ModalInput
        open={isOpen}
        onOpenChange={() => setIsOpen(false)}
        confirmButtonText="Завершить"
        isLoading={isTestSubmitting}
        onConfirm={finishTest}
      />
    </div>
  );
};
