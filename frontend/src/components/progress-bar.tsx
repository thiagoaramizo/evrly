"use client"

import * as React from "react"

import { cn } from "@/src/lib/utils"

export type ProgressBarProps = React.ComponentProps<"div"> & {
  duration?: number
}

export function ProgressBar({
  className,
  duration = 1400,
  ...props
}: ProgressBarProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgress(100)
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      data-slot="progress-bar"
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-bar-indicator"
        className="h-full bg-primary"
        style={{
          width: `${progress}%`,
          transition: `width ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      />
    </div>
  )
}
