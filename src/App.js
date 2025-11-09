import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Onboarding } from './pages/Onboarding';
import { WorkoutDisplay } from './pages/WorkoutDisplay';
import { SavedWorkouts } from './pages/SavedWorkouts';
import { Settings } from './pages/Settings';
import './index.css';
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/onboarding", element: _jsx(Onboarding, {}) }), _jsx(Route, { path: "/workout", element: _jsx(WorkoutDisplay, {}) }), _jsx(Route, { path: "/workouts", element: _jsx(SavedWorkouts, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) })] }) }));
}
export default App;
