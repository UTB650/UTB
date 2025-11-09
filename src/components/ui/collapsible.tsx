import * as React from "react"
import { ChevronDown } from 'lucide-react'

export interface CollapsibleProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open, onOpenChange, children }, ref) => {
    const [isOpen, setIsOpen] = React.useState(open ?? false)

    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen)
      onOpenChange?.(newOpen)
    }

    return (
      <CollapsibleContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
        <div ref={ref}>{children}</div>
      </CollapsibleContext.Provider>
    )
  }
)

Collapsible.displayName = "Collapsible"

interface CollapsibleContextType {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CollapsibleContext = React.createContext<CollapsibleContextType | undefined>(undefined)

export interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ children, className = "", ...props }, ref) => {
    const context = React.useContext(CollapsibleContext)
    if (!context) throw new Error("CollapsibleTrigger must be used within Collapsible")

    return (
      <button
        ref={ref}
        onClick={() => context.onOpenChange(!context.isOpen)}
        className={`flex items-center justify-between w-full text-sm font-medium text-red-600 hover:text-red-700 transition-colors ${className}`}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            context.isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
    )
  }
)

CollapsibleTrigger.displayName = "CollapsibleTrigger"

export interface CollapsibleContentProps {
  children?: React.ReactNode
  className?: string
}

export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, className = "" }, ref) => {
    const context = React.useContext(CollapsibleContext)
    if (!context) throw new Error("CollapsibleContent must be used within Collapsible")

    return (
      <div
        ref={ref}
        className={`overflow-hidden transition-all duration-200 ${className}`}
        style={{
          maxHeight: context.isOpen ? "1000px" : "0",
          opacity: context.isOpen ? 1 : 0,
        }}
      >
        <div className="pt-2">{children}</div>
      </div>
    )
  }
)

CollapsibleContent.displayName = "CollapsibleContent"
