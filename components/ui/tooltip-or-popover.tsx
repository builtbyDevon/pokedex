// components/ui/tooltip-or-popover.tsx
"use client"
import * as React from "react"
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip"
import * as PopoverPrimitive from "@radix-ui/react-popover"

function isMobile() {
  if (typeof window === "undefined") return false
  return /Mobi|Android/i.test(navigator.userAgent)
}

export function TooltipOrPopover({ content, children }: { content: React.ReactNode, children: React.ReactNode }) {
  const [mobile, setMobile] = React.useState(false)

  React.useEffect(() => {
    setMobile(isMobile())
  }, [])

  if (mobile) {
    return (
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          {children}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            sideOffset={4}
            className="z-50 w-fit rounded-md bg-primary px-3 py-1.5 text-medium text-xs text-primary-foreground shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent className="shadow-lg">
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
