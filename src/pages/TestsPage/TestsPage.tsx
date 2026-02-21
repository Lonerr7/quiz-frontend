import {TestsList} from "@/components/TestsList/TestsList.tsx";

export const TestsPage = () => {
  return (
    <div className="mt-22">
      <div className="app-container">
        <div className="max-w-4xl mx-auto">
          <TestsList/>
        </div>
      </div>
    </div>
  );
}