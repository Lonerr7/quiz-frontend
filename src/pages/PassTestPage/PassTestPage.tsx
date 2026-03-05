import {useNavigate, useParams} from "react-router";
import {PageWrapper} from "@/components/common/PageWrapper.tsx";
import {useGetTestQuery} from "@/api/endpoints/testsEndpoints/testsEndpoints.ts";
import {useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks/reduxHooks.ts";
import {passTestSliceActions} from "@/redux/slices/passTestSlice/slice/passTestSlice.ts";
import {QuestionWithAnswers} from "@/components";
import {Button} from "@/components/common";
import {SubmitPassedTestControls} from "./components/SubmitPassedTestControls";
import {getUnansweredQuestion} from "@/redux/slices/passTestSlice/selectors/getUnansweredQuestion.ts";
import {handleApiError} from "@/api/helpers/handleApiError.ts";

export const PassTestPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {data: test, isLoading, isError, error: getTestError} = useGetTestQuery(id!);
  const unansweredQuestion = useAppSelector(getUnansweredQuestion);
  const questionRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const dispatch = useAppDispatch();
  const {setTestId, setAnswer, resetState, setUnansweredQuestion} = passTestSliceActions;

  useEffect(() => {
    if (!isError && test) {
      dispatch(setTestId(test._id));
    }

    return () => {
      dispatch(resetState());
    };
  }, [test]);


  const handleAnswerSelect = (qId: string, answer: string) => {
    dispatch(setAnswer({qId, answer: Number(answer)}));
    dispatch(setUnansweredQuestion(null));
  }

  if (isLoading) {
    return <div>Загрузка теста...</div>
  }

  if (isError && getTestError) {
    handleApiError(getTestError);
    return (
      <PageWrapper>
        <div>Ошибка загрузки теста...</div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {test ? (
        <div>
          <Button
            className="mb-6"
            variant="outline"
            size="medium"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>

          <div className="mb-8 border-b border-border pb-6">
            <h1 className="text-3xl font-bold text-text-main mb-3 font-open-sans">
              {test.name}
            </h1>
            <p className="text-text-muted leading-relaxed">
              {test.description}
            </p>
          </div>

          <ul className="flex flex-col gap-6 mb-10">
            {test.questions.map(({_id: qId, text, options}, i) => (
              <QuestionWithAnswers
                key={qId}
                ref={(el) => {
                  if (el) {
                    questionRefs.current.set(qId, el);
                  }
                }}
                questionId={qId}
                questionNumber={i + 1}
                questionText={text}
                options={options}
                isUnanswered={unansweredQuestion === qId}
                onAnswerClick={handleAnswerSelect}
              />
            ))}
          </ul>

          <SubmitPassedTestControls testFromServer={test} questionRefs={questionRefs} />
        </div>
      ) : null}
    </PageWrapper>
  )
}