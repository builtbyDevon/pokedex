import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground transition-all hover:border-[var(--red)]/80 dark:hover:border-[var(--red)]/80 selection:bg-primary selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs  outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[var(--red)]/60 dark:focus-visible:border-[var(--red)]/80 focus-visible:ring-[var(--red)]/30 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
