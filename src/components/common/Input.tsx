import * as React from "react"
import { cn } from "@/helpers/utils/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-11 min-w-[100px] rounded-lg px-4 py-2 text-base transition-all duration-200",

          // ТЕПЕРЬ ВИДИМО: серый фон и четкая граница
          "bg-input-bg border border-input-border text-text-main",

          // Плейсхолдер делаем чуть контрастнее
          "placeholder:text-input-placeholder/70 selection:bg-primary-light",

          // ИНТЕРАКТИВ: при наведении граница темнеет
          "hover:border-text-muted/50",

          // ФОКУС: инпут становится белым, граница бирюзовой, появляется мягкое свечение
          "outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10",

          "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }