import {PageWrapper} from "@/components/common/PageWrapper.tsx";
import {useLocation} from 'react-router'
import type {PassTestResponse} from "@/api/endpoints/testsEndpoints/TestsEndpointsSchema.ts";

export const TestResultPage = () => {
  const location = useLocation();
  const testResult: PassTestResponse | undefined = location.state?.testResult;

  console.log(testResult);

  return (
    <PageWrapper>
      {testResult ? (
        <div>Тест пройден. Данные пришли</div>
      ) : (
        <div>Тут ничего нет(</div>
      )}
    </PageWrapper>
  )
}