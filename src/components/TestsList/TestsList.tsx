import {useGetTestsQuery} from "@/api/endpoints/testsEndpoints/testsEndpoints.ts";
import {TestItemSm} from "@/components/TestsList/TestItemSm.tsx";
import {useAuth} from "@/api/hooks/useAuth.ts";
import {handleApiError} from "@/api/helpers/handleApiError.ts";

export const TestsList = () => {
  const {data: tests, isError, isLoading, error} = useGetTestsQuery();
  const {isLoading: isMeLoading, me} = useAuth();

  if (isError && error) {
    handleApiError(error);
    return <div>Ошибка загрузки тестов</div>
  }

  return (
    <>
      {tests && !isLoading && !isMeLoading ? (
        <ul>
          {tests.ids.map((testId) => (
            <TestItemSm key={testId} test={tests.entities[testId]} me={me}/>
          ))}
        </ul>
      ) : null}
    </>
  )
}