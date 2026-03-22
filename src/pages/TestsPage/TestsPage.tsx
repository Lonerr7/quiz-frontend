import {TestsList} from "@/components/TestsList/TestsList.tsx";
import {PageWrapper} from "@/components/common/PageWrapper.tsx";
import {useSetPageTitle} from "@/helpers/hooks/useSetPageTitle.ts";

export const TestsPage = () => {
  useSetPageTitle('Тесты');

  return (
    <PageWrapper>
      <TestsList/>
    </PageWrapper>
  );
}