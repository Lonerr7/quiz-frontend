import {useGetTestsQuery} from "@/api/endpoints/testsEndpoints.ts";
import {TestItemSm} from "@/components/TestsList/TestItemSm.tsx";
import {useGetMeQuery} from "@/api/endpoints/authEndpoints.ts";

export const TestsList = () => {
  const {data: tests, isError, isLoading} = useGetTestsQuery();
  const {data: me, isError: isMeError} = useGetMeQuery();

  if (isError) {
    return <div>Ошибка загрузки тестов</div>
  }

  // Сейчас из-за того, что я не передаю isMeError в TestItemSm, то у меня при разлогине все равно видна кнопка "Редактирвоать" в тесте из-за того, что в кеше остался me, и потому что с сервера пришла 401 ошибка.

  return (
    <>
      {tests && tests.ids.length && !isLoading ? (
        <ul>
          {tests.ids.map((testId) => (
            <TestItemSm key={testId} test={tests.entities[testId]} me={me}/>
          ))}
        </ul>
      ) : null}
    </>
  )
}