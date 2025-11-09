import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ChevronDown } from 'lucide-react';
export const Collapsible = React.forwardRef(({ open, onOpenChange, children }, ref) => {
    const [isOpen, setIsOpen] = React.useState(open ?? false);
    const handleOpenChange = (newOpen) => {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
    };
    return (_jsx(CollapsibleContext.Provider, { value: { isOpen, onOpenChange: handleOpenChange }, children: _jsx("div", { ref: ref, children: children }) }));
});
Collapsible.displayName = "Collapsible";
const CollapsibleContext = React.createContext(undefined);
export const CollapsibleTrigger = React.forwardRef(({ children, className = "", ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);
    if (!context)
        throw new Error("CollapsibleTrigger must be used within Collapsible");
    return (_jsxs("button", { ref: ref, onClick: () => context.onOpenChange(!context.isOpen), className: `flex items-center justify-between w-full text-sm font-medium text-red-600 hover:text-red-700 transition-colors ${className}`, ...props, children: [_jsx("span", { children: children }), _jsx(ChevronDown, { className: `w-4 h-4 transition-transform duration-200 ${context.isOpen ? "transform rotate-180" : ""}` })] }));
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";
export const CollapsibleContent = React.forwardRef(({ children, className = "" }, ref) => {
    const context = React.useContext(CollapsibleContext);
    if (!context)
        throw new Error("CollapsibleContent must be used within Collapsible");
    return (_jsx("div", { ref: ref, className: `overflow-hidden transition-all duration-200 ${className}`, style: {
            maxHeight: context.isOpen ? "1000px" : "0",
            opacity: context.isOpen ? 1 : 0,
        }, children: _jsx("div", { className: "pt-2", children: children }) }));
});
CollapsibleContent.displayName = "CollapsibleContent";
