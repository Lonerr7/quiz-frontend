import type {FC, HTMLAttributes} from "react";

export const PageWrapper: FC<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
  return (
    <div className="mt-22" {...props}>
      <div className="app-container">
        {children}
      </div>
    </div>
  )
}