import type {DetailedHTMLProps, FC, HTMLAttributes} from "react";
import {cn} from "@/helpers/utils/cn.ts";

type ErrorMessageProps =  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ErrorMessage: FC<ErrorMessageProps> = ({className, children, ...props}) => {

  return <div className={cn('text-error text-sm', className)} {...props}>{children}</div>
}