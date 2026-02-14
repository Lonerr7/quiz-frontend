import {useGetMeQuery} from "@/api/endpoints/authEndpoints";
import {useGetTestsQuery} from "@/api/endpoints/testsEndpoints";

export const TestsPage = () => {
  const {data: me} = useGetMeQuery();
  const {data: tests, isError} = useGetTestsQuery();


  return (
    <div>
      TestsPage
    </div>
  )
}