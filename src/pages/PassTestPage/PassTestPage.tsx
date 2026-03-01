import {useNavigate, useParams} from "react-router";
import {PageWrapper} from "@/components/common/PageWrapper.tsx";
import {useGetTestQuery} from "@/api/endpoints/testsEndpoints/testsEndpoints.ts";
import {useEffect} from "react";
import {useAppDispatch} from "@/redux/hooks/reduxHooks.ts";
import {passTestSliceActions} from "@/redux/slices/passTestSlice/slice/passTestSlice.ts";
import {QuestionWithAnswers} from "@/components";
import {Button} from "@/components/common";
import {SubmitPassedTestControls} from "./components/SubmitPassedTestControls";

export const PassTestPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {data: test, isLoading, isError} = useGetTestQuery(id!);
  const dispatch = useAppDispatch();
  const {setTestId, setAnswer, resetState} = passTestSliceActions;

  /*
    TODO:
    1. Сделать перенаправление на страницу результата теста с его отображением (перенаправление сделано; верстка страницы - в процессе).
    2. При возможности сделать так, чтобы пользователь не мог отправить тест, пока не ответит на все вопросы. При клике на завершить тест -> показываем модалку, где есть только кнопка ОК. После клика на ОК -> нужно проскроллить к тому вопросу, на который нет ответа.
    3. Отобразить ошибку при сабмите теста на сервер (если будет) и не редиректить пользователя на страницу ответов при этом
    4. Перенести все остальные типы из endpoints в свои файлы схемы.
    5. Типизировать все ошибки из RTK Query
   */

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
  }

  if (isLoading) {
    return <div>Загрузка теста...</div>
  }

  if (isError) {
    return <div>Ошибка загрузки теста...</div>
  }

  return (
    <PageWrapper>
      {test ? (
        <div className="py-8 px-4">
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
                questionId={qId}
                questionNumber={i + 1}
                questionText={text}
                options={options}
                onAnswerClick={handleAnswerSelect}
              />
            ))}
          </ul>

          <SubmitPassedTestControls testFromServer={test} />
        </div>
      ) : null}
    </PageWrapper>
  )
}