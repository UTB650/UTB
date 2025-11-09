import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Target, Eye, EyeOff, Save } from 'lucide-react';
export function Settings() {
    const navigate = useNavigate();
    const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
    const [showKey, setShowKey] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const handleSaveApiKey = () => {
        if (!apiKey.trim()) {
            alert('Please enter your OpenAI API key');
            return;
        }
        localStorage.setItem('openai_api_key', apiKey);
        setSaveMessage('API key saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("nav", { className: "fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm", children: _jsx("div", { className: "container mx-auto px-4 py-4 flex justify-between items-center", children: _jsxs("div", { className: "flex items-center gap-2 cursor-pointer", onClick: () => navigate('/'), children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center", children: _jsx(Target, { className: "w-6 h-6 text-white" }) }), _jsxs("span", { className: "text-2xl font-bold text-gray-900", children: ["BoxFit", _jsx("span", { className: "text-red-600", children: "AI" })] })] }) }) }), _jsx("div", { className: "container mx-auto px-4 pt-24 pb-20", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Settings" }), _jsxs(Card, { className: "p-8 border border-gray-200", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "OpenAI API Key" }), _jsxs("p", { className: "text-gray-600 mb-4", children: ["Enter your OpenAI API key to enable AI-powered workout generation. Get your key from", ' ', _jsx("a", { href: "https://platform.openai.com/api-keys", target: "_blank", rel: "noopener noreferrer", className: "text-red-600 hover:text-red-700 font-medium", children: "platform.openai.com/api-keys" })] }), _jsxs("div", { className: "relative mb-4", children: [_jsx("input", { type: showKey ? 'text' : 'password', value: apiKey, onChange: (e) => setApiKey(e.target.value), placeholder: "sk-...", className: "w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" }), _jsx("button", { onClick: () => setShowKey(!showKey), className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900", children: showKey ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] }), _jsx("p", { className: "text-xs text-gray-500 mb-6", children: "Your API key is stored locally in your browser and never sent to our servers." }), _jsxs(Button, { onClick: handleSaveApiKey, className: "bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base font-semibold flex items-center gap-2", children: [_jsx(Save, { className: "w-5 h-5" }), "Save API Key"] }), saveMessage && (_jsxs("div", { className: "mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium", children: ["\u2713 ", saveMessage] })), _jsxs("div", { className: "mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "How it works" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-2", children: [_jsx("li", { children: "1. Get your OpenAI API key from the link above" }), _jsx("li", { children: "2. Paste it in the field above and click Save" }), _jsx("li", { children: "3. Go back and create a personalized workout through onboarding" }), _jsx("li", { children: "4. Your workout will be generated using GPT-4" })] })] })] }), _jsx(Button, { onClick: () => navigate('/'), variant: "outline", className: "mt-8 px-8 py-3 text-base font-semibold", children: "Back to Home" })] }) })] }));
}
