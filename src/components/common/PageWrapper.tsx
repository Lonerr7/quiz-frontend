import type {FC, HTMLAttributes} from "react";

export const PageWrapper: FC<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
  return (
    <div className="mt-22" {...props}>
      <div className="app-container">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}