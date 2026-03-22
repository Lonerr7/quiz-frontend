import {TestEditorForm} from '@/components/TestEditorForm/TestEditorForm.tsx';
import {useSetPageTitle} from "@/helpers/hooks/useSetPageTitle.ts";

export const AddTestPage = () => {
  useSetPageTitle('Добавить тест');

  return <TestEditorForm mode="addTest" />;
};
