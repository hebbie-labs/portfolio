import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-w-0 rounded-xl border border-muted/80 bg-bg-2 px-4 py-3 text-base transition-colors outline-none placeholder:text-muted hover:border-fg focus-visible:border-accent disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
