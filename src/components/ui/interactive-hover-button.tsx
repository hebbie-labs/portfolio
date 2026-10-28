import { useRender } from "@base-ui/react/use-render"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  render = <button />,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    render,
    props: {
      className: cn(
        "group bg-bg relative w-auto cursor-pointer overflow-hidden rounded-full border border-muted/70 p-2 px-6 text-center font-semibold",
        className
      ),
      ...props,
      children: (
        <>
          <div className="flex items-center justify-center gap-2">
            <div className="bg-accent h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
            <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
              {children}
            </span>
          </div>
          <div className="text-accent-ink absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
            <span>{children}</span>
            <ArrowRight />
          </div>
        </>
      ),
    },
  })
}
