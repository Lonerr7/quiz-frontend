import {PageWrapper} from "@/components/common/PageWrapper.tsx";
import {useParams} from "react-router";
import {useGetTestForAdminQuery} from "@/api/endpoints/testsEndpoints/testsEndpoints.ts";
import {useEffect} from "react";
import {useAppDispatch} from "@/redux/hooks/reduxHooks.ts";
import {testEditorSliceActions} from "@/redux/slices/testEditorSlice/slice/testEditorSlice.ts";
import {TestEditorForm} from "@/components/TestEditorForm/TestEditorForm.tsx";

export const EditTestPage = () => {
  const {id} = useParams();
  const {data: test, isLoading, isError} = useGetTestForAdminQuery(id!);
  const dispatch = useAppDispatch();
  const {setTest, resetState} = testEditorSliceActions;

  useEffect(() => {
    if (test && !isLoading && !isError) {
      dispatch(setTest(test));
    }

    return () => {
      dispatch(resetState());
    }
  }, [test, isLoading, isError]);

  if (isLoading) {
    return <div>Загружаем тест...</div>
  }

  return (
    <PageWrapper>
      {test && (
        <TestEditorForm mode="editTest"/>
      )}
    </PageWrapper>
  )
}