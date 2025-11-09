import * as React from "react"
import { ChevronDown } from 'lucide-react'

export interface AccordionProps {
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children?: React.ReactNode
}

interface AccordionContextType {
  value: string | string[]
  onValueChange: (value: string | string[]) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined)

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", value, onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      type === "single" ? (value || "") : (value || [])
    )

    const currentValue = value !== undefined ? value : internalValue

    const handleValueChange = (newValue: string) => {
      if (type === "single") {
        const updated = currentValue === newValue ? "" : newValue
        setInternalValue(updated)
        onValueChange?.(updated)
      } else {
        const array = Array.isArray(currentValue) ? currentValue : []
        const updated = array.includes(newValue)
          ? array.filter(item => item !== newValue)
          : [...array, newValue]
        setInternalValue(updated)
        onValueChange?.(updated)
      }
    }

    return (
      <AccordionContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, type }}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = "Accordion"

export interface AccordionItemProps {
  value: string
  children?: React.ReactNode
  className?: string
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`border-b border-gray-200 ${className}`}>
        {children}
      </div>
    )
  }
)

AccordionItem.displayName = "AccordionItem"

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className = "", ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionTrigger must be used within Accordion")

  const isOpen = Array.isArray(context.value)
    ? context.value.includes(props.value as string)
    : context.value === props.value

  return (
    <button
      ref={ref}
      onClick={() => context.onValueChange(props.value as string)}
      className={`flex items-center justify-between w-full py-4 px-0 font-semibold text-left hover:text-red-600 transition-colors ${className}`}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={`w-5 h-5 transition-transform duration-200 ${
          isOpen ? "transform rotate-180" : ""
        }`}
      />
    </button>
  )
})

AccordionTrigger.displayName = "AccordionTrigger"

export interface AccordionContentProps {
  children?: React.ReactNode
  className?: string
}

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className = "" }, ref) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionContent must be used within Accordion")

  const parent = React.useContext(AccordionContext)
  const value = parent?.value

  const isOpen = Array.isArray(value)
    ? value.includes((ref as any)?.current?.parentElement?.querySelector("[value]")?.value)
    : false

  return (
    <div
      ref={ref}
      className={`overflow-hidden transition-all duration-200 ${className}`}
      style={{
        maxHeight: isOpen ? "1000px" : "0",
      }}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
})

AccordionContent.displayName = "AccordionContent"
