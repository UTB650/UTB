import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
export function SavedWorkouts() {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "min-h-screen bg-black text-white", children: [_jsx("nav", { className: "fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-red-900/20", children: _jsx("div", { className: "container mx-auto px-4 py-4 flex justify-between items-center", children: _jsxs("div", { className: "flex items-center gap-2 cursor-pointer", onClick: () => navigate('/'), children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center", children: _jsx(Target, { className: "w-6 h-6" }) }), _jsxs("span", { className: "text-2xl font-bold", children: ["BoxFit", _jsx("span", { className: "text-red-600", children: "AI" })] })] }) }) }), _jsx("div", { className: "container mx-auto px-4 pt-32 pb-20", children: _jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "Saved Workouts" }), _jsx("p", { className: "text-gray-400", children: "Coming soon..." }), _jsx(Button, { onClick: () => navigate('/'), className: "mt-8 bg-red-600 hover:bg-red-700", children: "Back to Home" })] }) })] }));
}
