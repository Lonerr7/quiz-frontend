import type {FC, LabelHTMLAttributes} from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label: FC<LabelProps> = ({children, ...props}) => {
  return (
    <label className="font-semibold" {...props}>{children}</label>
  )
}