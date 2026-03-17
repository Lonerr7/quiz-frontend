import {PageWrapper} from '@/components/common/PageWrapper.tsx';
import {useParams} from 'react-router';
import {useGetTestForAdminQuery} from '@/api/endpoints/testsEndpoints/testsEndpoints.ts';
import {useEffect} from 'react';
import {useAppDispatch} from '@/redux/hooks/reduxHooks.ts';
import {testEditorSliceActions} from '@/redux/slices/testEditorSlice/slice/testEditorSlice.ts';
import {TestEditorForm} from '@/components/TestEditorForm/TestEditorForm.tsx';
import Skeleton from 'react-loading-skeleton';

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
    };
  }, [test, isLoading, isError]);

  if (isLoading) {
    return (
      <PageWrapper>
        <Skeleton className="mb-5" width="100%" height={68} />
        <Skeleton className="mb-5" width="100%" height={120} />
        <Skeleton className="mb-5" count={5} width="100%" height={292} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {test ? (
        <TestEditorForm mode="editTest" />
      ) : (
        <div>Ошибка загрузки. Повторите позже</div>
      )}
    </PageWrapper>
  );
};
