import {TestsList} from "@/components/TestsList/TestsList.tsx";
import {PageWrapper} from "@/components/common/PageWrapper.tsx";

export const TestsPage = () => {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        <TestsList/>
      </div>
    </PageWrapper>
  );
}