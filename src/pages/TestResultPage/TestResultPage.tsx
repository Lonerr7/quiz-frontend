import {PageWrapper} from '@/components/common/PageWrapper.tsx';
import {useLocation, useNavigate} from 'react-router';
import type {PassTestResponse} from '@/api/endpoints/testsEndpoints/schema/TestsEndpointsSchema';
import {Button} from '@/components/common';
import {formatWordByCount} from '@/helpers/utils/formatWordByCount.ts';
import {AnsweredQuestion} from '@/components/AnsweredQuestion/AnsweredQuestion.tsx';

export const TestResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const testResult: PassTestResponse | undefined = location.state?.testResult;

  return (
    <PageWrapper>
      {testResult ? (
        <div>
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
          <ul className="flex flex-col gap-6 mb-4">
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
          <div className="flex items-center flex-col gap-4 xs:flex-row">
            <Button variant="outline" size="full" onClick={() => navigate('/')}>
              Все тесты
            </Button>
            <Button size="full" onClick={() => navigate(`/tests/${testResult.testId}`)}>
              Пройти еще раз
            </Button>
          </div>
        </div>
      ) : (
        <div>Тут ничего нет(</div>
      )}
    </PageWrapper>
  );
};
