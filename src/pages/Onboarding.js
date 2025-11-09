import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import OnboardingForm from '@/components/OnboardingForm';
import { Target } from 'lucide-react';
export function Onboarding() {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("nav", { className: "fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm", children: _jsx("div", { className: "container mx-auto px-4 py-4 flex justify-between items-center", children: _jsxs("div", { className: "flex items-center gap-2 cursor-pointer", onClick: () => navigate('/'), children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center", children: _jsx(Target, { className: "w-6 h-6 text-white" }) }), _jsxs("span", { className: "text-2xl font-bold text-gray-900", children: ["BoxFit", _jsx("span", { className: "text-red-600", children: "AI" })] })] }) }) }), _jsx("div", { className: "pt-20", children: _jsx(OnboardingForm, {}) })] }));
}
