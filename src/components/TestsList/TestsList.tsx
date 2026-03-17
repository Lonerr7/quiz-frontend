import {
  useDeleteTestMutation,
  useGetTestsQuery,
} from '@/api/endpoints/testsEndpoints/testsEndpoints.ts';
import {TestItemSm} from '@/components/TestsList/TestItemSm.tsx';
import {useAuth} from '@/api/hooks/useAuth.ts';
import {handleApiError} from '@/api/helpers/handleApiError.ts';
import {useRef, useState} from 'react';
import {ConfirmDialog} from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import {toast} from 'sonner';
import Skeleton from 'react-loading-skeleton';

export const TestsList = () => {
  const {data: tests, isError, isLoading, error} = useGetTestsQuery();
  const {isLoading: isMeLoading, me} = useAuth();
  const testIdToDelete = useRef<string>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTest, {isLoading: isTestDeleting}] = useDeleteTestMutation();

  if (isError) {
    handleApiError(error);
    return <div>Ошибка загрузки тестов. Повторите попытку позже</div>;
  }

  if (isLoading) {
    return (
      <Skeleton
        className="mb-2.5 last:mb-0"
        count={3}
        height={120}
        borderRadius={12}
      />
    );
  }

  if (!tests?.ids.length) {
    return <div>Тесты еще не добавлены</div>;
  }

  const handleOpenDeleteDialog = (testId: string) => {
    setIsDeleteDialogOpen(true);
    testIdToDelete.current = testId;
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    testIdToDelete.current = null;
  };

  const handleDeleteTest = async () => {
    if (!testIdToDelete.current) {
      return;
    }

    try {
      await deleteTest(testIdToDelete.current).unwrap();
      handleCloseDeleteDialog();
      toast.success('Тест успешно удалён', {duration: 7000});
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

  return (
    <>
      {tests && !isMeLoading ? (
        <>
          <ul className="flex flex-col gap-3.5">
            {tests.ids.map((testId) => (
              <TestItemSm
                key={testId}
                test={tests.entities[testId]}
                me={me}
                onDelete={handleOpenDeleteDialog}
              />
            ))}
          </ul>
          <ConfirmDialog
            open={isDeleteDialogOpen}
            onConfirm={handleDeleteTest}
            onOpenChange={handleCloseDeleteDialog}
            confirmButtonVariant="danger"
            confirmButtonText="Удалить"
            isLoading={isTestDeleting}
            loadingButtonText="Удаляем"
            description="Вы точно хотите удалить тест? Это действие нельзя отменить"
          />
        </>
      ) : null}
    </>
  );
};
