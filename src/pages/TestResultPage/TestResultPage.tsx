import {PageWrapper} from '@/components/common/PageWrapper.tsx';
import {useLocation, useNavigate} from 'react-router';
import type {PassTestResponse} from '@/api/endpoints/testsEndpoints/TestsEndpointsSchema.ts';
import {Button} from '@/components/common';
import {formatWordByCount} from '@/helpers/utils/formatWordByCount.ts';
import {AnsweredQuestion} from '@/components/AnsweredQuestion/AnsweredQuestion.tsx';

export const TestResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const testResult: PassTestResponse | undefined = location.state?.testResult;

  console.log(testResult);

  return (
    <PageWrapper>
      {testResult ? (
        <div className="py-8 px-4">
          <Button className="mb-6" variant="outline" size="medium" onClick={() => navigate('/')}>
            На главную страницу
          </Button>
          <div className="mb-8">
            <div className="page-title">Результаты</div>
            <div className="text-center font-medium text-md">
              Вы ответили правильно на {testResult.correctAnswersCount} из{' '}
              {testResult.result.length}{' '}
              {formatWordByCount(testResult.result.length, {
                zero: 'вопросов',
                one: 'вопроса',
                two: 'вопросов',
                few: 'вопросов',
                many: 'вопросов',
              })}
            </div>
          </div>
          <ul className="flex flex-col gap-6">
            {testResult.result.map((answeredQuestion, i) => (
              <AnsweredQuestion
                key={answeredQuestion._id}
                questionText={answeredQuestion.text}
                questionNumber={i + 1}
                options={answeredQuestion.options}
                isCorrect={answeredQuestion.isCorrect}
                userAnswer={answeredQuestion.userAnswer}
                correctAnswer={answeredQuestion.correctAnswer}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>Тут ничего нет(</div>
      )}
    </PageWrapper>
  );
};
