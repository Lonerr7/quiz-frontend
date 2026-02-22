import {useParams} from "react-router";
import {PageWrapper} from "@/components/common/PageWrapper.tsx";
import {useGetTestQuery} from "@/api/endpoints/testsEndpoints.ts";
import {useEffect} from "react";
import {useAppDispatch} from "@/redux/hooks/reduxHooks.ts";
import {passTestSliceActions} from "@/redux/slices/passTestSlice/passTestSlice.ts";
import {QuestionWithAnswers} from "@/components";

export const PassTestPage = () => {
  const {id} = useParams();
  const {data: test, isLoading, isError} = useGetTestQuery(id!);
  const dispatch = useAppDispatch();
  const {setTestId, setAnswer, resetState} = passTestSliceActions;

  useEffect(() => {
    if (!isError && test) {
      dispatch(setTestId(test._id));
    }

    return () => {
      dispatch(resetState());
    };
  }, [test]);

  if (isLoading) {
    return <div>Загрузка теста...</div>
  }

  if (isError) {
    return <div>Ошибка загрузки теста...</div>
  }

  const handleAnswerSelect = (qId: string, answer: string) => {
    dispatch(setAnswer({qId, answer: Number(answer)}));
  }

  return (
    <PageWrapper>
      {test ? (
        <div>
          <div>{test.name}</div>
          <div className="mb-5">{test.description}</div>
          <div>
            {test.questions.map(({_id: qId, text, options}) => (
              <QuestionWithAnswers
                key={qId}
                questionId={qId}
                questionText={text}
                options={options}
                onAnswerClick={handleAnswerSelect}
              />
            ))}
          </div>
        </div>
      ) : null}
    </PageWrapper>
  )
}