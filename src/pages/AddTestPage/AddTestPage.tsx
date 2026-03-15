import {PageWrapper} from "@/components/common/PageWrapper.tsx";
import {TestEditorForm} from "@/components/TestEditorForm/TestEditorForm.tsx";

export const AddTestPage = () => {
  return (
    <PageWrapper>
      <TestEditorForm mode="addTest"/>
    </PageWrapper>
  )
}