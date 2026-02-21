import {useGetTestsQuery} from "@/api/endpoints/testsEndpoints.ts";
import {TestItemSm} from "@/components/TestsList/TestItemSm.tsx";
import {useAuth} from "@/api/hooks/useAuth.ts";

export const TestsList = () => {
  const {data: tests, isError, isLoading} = useGetTestsQuery();
  const {isLoading: isMeLoading, me} = useAuth();

  if (isError) {
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