import {useParams} from 'react-router';
import {useGetTestForAdminQuery} from '@/api/endpoints/testsEndpoints/testsEndpoints.ts';
import {useEffect} from 'react';
import {useAppDispatch} from '@/redux/hooks/reduxHooks.ts';
import {testEditorSliceActions} from '@/redux/slices/testEditorSlice/slice/testEditorSlice.ts';
import {TestEditorForm} from '@/components/TestEditorForm/TestEditorForm.tsx';
import Skeleton from 'react-loading-skeleton';
import {GoBackButton} from "@/components/GoBackButton/GoBackButton.tsx";
import {useSetPageTitle} from "@/helpers/hooks/useSetPageTitle.ts";

export const EditTestPage = () => {
  const {id} = useParams();
  const {data: test, isLoading, isError} = useGetTestForAdminQuery(id!);
  const dispatch = useAppDispatch();
  const {setTest, resetState} = testEditorSliceActions;

  useSetPageTitle(test?.name ? `Редактировать тест: "${test?.name}"` : undefined);

  useEffect(() => {
    if (test && !isLoading && !isError) {
      dispatch(setTest(test));
    }

    return () => {
      dispatch(resetState());
    };
  }, [test, isLoading, isError]);

  if (isLoading) {
    return (
      <>
        <Skeleton className="mb-5" width="100%" height={68} />
        <Skeleton className="mb-5" width="100%" height={120} />
        <Skeleton className="mb-5" count={5} width="100%" height={292} />
      </>
    );
  }

  return (
    <>
      {test ? (
        <>
          <GoBackButton/>
          <TestEditorForm mode="editTest"/>
        </>
      ) : (
        <div>Ошибка загрузки. Повторите позже</div>
      )}
    </>
  );
};
