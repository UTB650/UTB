import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Flame, Trophy, TrendingDown, Activity, GraduationCap, Zap, Award, Heart, Dumbbell, Wind, Shield, Move, AlertCircle } from 'lucide-react';
import { generateWorkout } from '@/utils/workoutGenerator';
const OnboardingForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        experience: '',
        goal: '',
        equipment: [],
        duration: '30',
        frequency: '3',
        fitnessLevel: '',
        focusAreas: []
    });
    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setError('');
    };
    const updateEquipment = (item) => {
        setFormData(prev => {
            const newEquipment = prev.equipment.includes(item)
                ? prev.equipment.filter(e => e !== item)
                : [...prev.equipment, item];
            if (item === 'None' && newEquipment.includes('None')) {
                return { ...prev, equipment: ['None'] };
            }
            else if (newEquipment.includes('None') && newEquipment.length > 1) {
                return { ...prev, equipment: newEquipment.filter(e => e !== 'None') };
            }
            if (!newEquipment.includes('None') && newEquipment.length === 0) {
                return { ...prev, equipment: [] };
            }
            return { ...prev, equipment: newEquipment };
        });
        setError('');
    };
    const updateFocusAreas = (item) => {
        setFormData(prev => ({
            ...prev,
            focusAreas: prev.focusAreas.includes(item)
                ? prev.focusAreas.filter(f => f !== item)
                : [...prev.focusAreas, item]
        }));
    };
    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.experience !== '';
            case 2:
                return formData.goal !== '';
            case 3:
                return formData.equipment.length > 0;
            case 4:
                return formData.duration && formData.frequency;
            case 5:
                return formData.fitnessLevel !== '';
            case 6:
                return true;
            default:
                return false;
        }
    };
    const handleNext = () => {
        if (!isStepValid()) {
            setError('Please complete this step before proceeding');
            return;
        }
        if (currentStep < 6) {
            setCurrentStep(currentStep + 1);
        }
    };
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setError('');
        }
    };
    const handleComplete = async () => {
        try {
            setIsLoading(true);
            setError('');
            localStorage.setItem('userProfile', JSON.stringify(formData));
            const workout = await generateWorkout({
                ...formData,
                duration: parseInt(formData.duration),
                frequency: parseInt(formData.frequency)
            });
            const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
            const workoutWithTimestamp = {
                ...workout,
                generated_at: new Date().toISOString()
            };
            savedWorkouts.unshift(workoutWithTimestamp);
            localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
            navigate('/workout', { state: { workout } });
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to generate workout';
            setError(errorMessage);
            setIsLoading(false);
        }
    };
    const progressPercentage = (currentStep / 6) * 100;
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Create Your Workout" }), _jsxs("span", { className: "text-sm font-medium text-gray-600", children: ["Step ", currentStep, " of 6"] })] }), _jsx("div", { className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-red-600 rounded-full transition-all duration-300", style: { width: `${progressPercentage}%` } }) })] }), _jsxs("div", { className: "relative min-h-96", children: [currentStep === 1 && _jsx(Step1, { formData: formData, updateFormData: updateFormData }), currentStep === 2 && _jsx(Step2, { formData: formData, updateFormData: updateFormData }), currentStep === 3 && _jsx(Step3, { formData: formData, updateEquipment: updateEquipment }), currentStep === 4 && _jsx(Step4, { formData: formData, updateFormData: updateFormData }), currentStep === 5 && _jsx(Step5, { formData: formData, updateFormData: updateFormData }), currentStep === 6 && _jsx(Step6, { formData: formData, updateFocusAreas: updateFocusAreas })] }), error && (_jsxs("div", { className: "mt-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-600" }), _jsx("span", { className: "text-sm text-red-600", children: error })] })), _jsxs("div", { className: "mt-8 flex gap-3 justify-between", children: [currentStep > 1 && (_jsx(Button, { variant: "outline", onClick: handleBack, className: "px-6", children: "Back" })), _jsx("div", { className: currentStep === 1 ? 'ml-auto' : '', children: currentStep === 6 ? (_jsx(Button, { onClick: handleComplete, disabled: isLoading, className: "bg-red-600 hover:bg-red-700 text-white px-8", children: isLoading ? 'Generating...' : 'Generate My Workout' })) : (_jsx(Button, { onClick: handleNext, className: "bg-red-600 hover:bg-red-700 text-white px-8", children: "Next" })) })] })] }) }));
};
const Step1 = ({ formData, updateFormData }) => (_jsxs("div", { className: "fade-in", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "What's your boxing experience?" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Help us tailor your workout to your skill level" }), _jsx(RadioGroup, { value: formData.experience, onValueChange: (value) => updateFormData('experience', value), children: _jsxs("div", { className: "space-y-3", children: [_jsx(ExperienceCard, { value: "Beginner", icon: _jsx(Star, { className: "w-6 h-6" }), title: "Beginner", description: "Never boxed before or less than 3 months of training", selected: formData.experience === 'Beginner' }), _jsx(ExperienceCard, { value: "Intermediate", icon: _jsx(Flame, { className: "w-6 h-6" }), title: "Intermediate", description: "3-12 months of consistent training", selected: formData.experience === 'Intermediate' }), _jsx(ExperienceCard, { value: "Advanced", icon: _jsx(Trophy, { className: "w-6 h-6" }), title: "Advanced", description: "1+ years of regular boxing training", selected: formData.experience === 'Advanced' })] }) })] }));
const ExperienceCard = ({ value, icon, title, description, selected }) => (_jsxs("label", { className: `flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selected
        ? 'border-red-600 bg-red-50'
        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}`, children: [_jsx(RadioGroupItem, { value: value, className: "w-5 h-5" }), _jsxs("div", { className: "flex items-center gap-4 flex-1", children: [_jsx("div", { className: `p-3 rounded-full ${selected ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`, children: icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: title }), _jsx("p", { className: "text-sm text-gray-600", children: description })] })] })] }));
const Step2 = ({ formData, updateFormData }) => (_jsxs("div", { className: "fade-in", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "What do you want to achieve?" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Select your primary fitness goal" }), _jsx(RadioGroup, { value: formData.goal, onValueChange: (value) => updateFormData('goal', value), children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(GoalCard, { value: "Weight Loss", icon: _jsx(TrendingDown, { className: "w-6 h-6" }), title: "Weight Loss", description: "Burn calories and shed pounds through high-intensity boxing", selected: formData.goal === 'Weight Loss' }), _jsx(GoalCard, { value: "Endurance", icon: _jsx(Activity, { className: "w-6 h-6" }), title: "Build Endurance", description: "Improve cardiovascular fitness and stamina", selected: formData.goal === 'Endurance' }), _jsx(GoalCard, { value: "Technique", icon: _jsx(GraduationCap, { className: "w-6 h-6" }), title: "Learn Technique", description: "Master proper boxing form and techniques", selected: formData.goal === 'Technique' }), _jsx(GoalCard, { value: "Strength", icon: _jsx(Zap, { className: "w-6 h-6" }), title: "Build Strength", description: "Develop explosive power and muscular strength", selected: formData.goal === 'Strength' }), _jsx(GoalCard, { value: "Competition", icon: _jsx(Award, { className: "w-6 h-6" }), title: "Competition Prep", description: "Train for amateur boxing competitions", selected: formData.goal === 'Competition' }), _jsx(GoalCard, { value: "Fitness", icon: _jsx(Heart, { className: "w-6 h-6" }), title: "General Fitness", description: "Stay active and blow off steam", selected: formData.goal === 'Fitness' })] }) })] }));
const GoalCard = ({ value, icon, title, description, selected }) => (_jsxs("label", { className: `flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selected
        ? 'border-red-600 bg-red-50'
        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}`, children: [_jsx(RadioGroupItem, { value: value, className: "w-5 h-5 mb-3" }), _jsx("div", { className: `p-3 rounded-full w-fit mb-3 ${selected ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`, children: icon }), _jsx("h3", { className: "font-semibold text-gray-900", children: title }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: description })] }));
const Step3 = ({ formData, updateEquipment }) => {
    const equipmentOptions = [
        { value: 'None', icon: _jsx(Flame, { className: "w-6 h-6" }), label: 'None' },
        { value: 'Heavy Bag', icon: _jsx(Dumbbell, { className: "w-6 h-6" }), label: 'Heavy Bag' },
        { value: 'Speed Bag', icon: _jsx(Wind, { className: "w-6 h-6" }), label: 'Speed Bag' },
        { value: 'Jump Rope', icon: _jsx(Activity, { className: "w-6 h-6" }), label: 'Jump Rope' },
        { value: 'Hand Wraps & Gloves', icon: _jsx(Trophy, { className: "w-6 h-6" }), label: 'Hand Wraps & Gloves' },
        { value: 'Resistance Bands', icon: _jsx(Zap, { className: "w-6 h-6" }), label: 'Resistance Bands' },
    ];
    const isNoneSelected = formData.equipment.includes('None');
    return (_jsxs("div", { className: "fade-in", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "What equipment do you have access to?" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Select all that apply" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: equipmentOptions.map(option => (_jsxs("button", { onClick: () => updateEquipment(option.value), disabled: isNoneSelected && option.value !== 'None', className: `flex items-center gap-3 p-4 border-2 rounded-lg transition-all duration-200 ${formData.equipment.includes(option.value)
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'} ${isNoneSelected && option.value !== 'None' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`, children: [_jsx(Checkbox, { checked: formData.equipment.includes(option.value), disabled: isNoneSelected && option.value !== 'None' }), _jsx("div", { className: `p-2 rounded-lg ${formData.equipment.includes(option.value)
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-600'}`, children: option.icon }), _jsx("span", { className: "font-medium text-gray-900", children: option.label })] }, option.value))) })] }));
};
const Step4 = ({ formData, updateFormData }) => (_jsxs("div", { className: "fade-in", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "How much time do you have?" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Tell us about your availability" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-900 mb-3", children: "How long per session?" }), _jsxs(Select, { value: formData.duration, onValueChange: (value) => updateFormData('duration', value), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select duration" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "15", children: "15 minutes" }), _jsx(SelectItem, { value: "20", children: "20 minutes" }), _jsx(SelectItem, { value: "30", children: "30 minutes" }), _jsx(SelectItem, { value: "45", children: "45 minutes" }), _jsx(SelectItem, { value: "60", children: "60 minutes" })] })] }), _jsx("p", { className: "text-xs text-gray-600 mt-2", children: "Be realistic - it's better to complete shorter workouts consistently" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-900 mb-3", children: "How many days per week?" }), _jsxs(Select, { value: formData.frequency, onValueChange: (value) => updateFormData('frequency', value), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select frequency" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "2", children: "2 days" }), _jsx(SelectItem, { value: "3", children: "3 days" }), _jsx(SelectItem, { value: "4", children: "4 days" }), _jsx(SelectItem, { value: "5", children: "5 days" }), _jsx(SelectItem, { value: "6", children: "6 days" }), _jsx(SelectItem, { value: "7", children: "7 days" })] })] }), _jsx("p", { className: "text-xs text-gray-600 mt-2", children: "We recommend at least 3 sessions per week for best results" })] })] })] }));
const Step5 = ({ formData, updateFormData }) => (_jsxs("div", { className: "fade-in", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "How would you describe your current fitness?" }), _jsx("p", { className: "text-gray-600 mb-6", children: "This helps us customize workout intensity" }), _jsx(RadioGroup, { value: formData.fitnessLevel, onValueChange: (value) => updateFormData('fitnessLevel', value), children: _jsxs("div", { className: "space-y-3", children: [_jsx(FitnessCard, { value: "Low", title: "Low", subtitle: "Sedentary Lifestyle", description: "I don't currently exercise regularly and get winded easily", selected: formData.fitnessLevel === 'Low' }), _jsx(FitnessCard, { value: "Moderate", title: "Moderate", subtitle: "Somewhat Active", description: "I can handle 20-30 minutes of cardio comfortably", selected: formData.fitnessLevel === 'Moderate' }), _jsx(FitnessCard, { value: "High", title: "High", subtitle: "Very Active", description: "I exercise regularly 3+ times per week and have good endurance", selected: formData.fitnessLevel === 'High' })] }) })] }));
const FitnessCard = ({ value, title, subtitle, description, selected }) => (_jsxs("label", { className: `flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selected
        ? 'border-red-600 bg-red-50'
        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}`, children: [_jsx(RadioGroupItem, { value: value, className: "w-5 h-5 mt-1" }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: title }), _jsx("p", { className: "text-xs text-gray-500 font-medium mb-1", children: subtitle }), _jsx("p", { className: "text-sm text-gray-600", children: description })] })] }));
const Step6 = ({ formData, updateFocusAreas }) => {
    const focusOptions = [
        { value: 'Footwork', icon: _jsx(Move, { className: "w-6 h-6" }), label: 'Footwork & Movement' },
        { value: 'Power', icon: _jsx(Zap, { className: "w-6 h-6" }), label: 'Power Punching' },
        { value: 'Speed', icon: _jsx(Wind, { className: "w-6 h-6" }), label: 'Speed & Combinations' },
        { value: 'Defense', icon: _jsx(Shield, { className: "w-6 h-6" }), label: 'Defense & Head Movement' },
        { value: 'Conditioning', icon: _jsx(Flame, { className: "w-6 h-6" }), label: 'Conditioning / HIIT' },
    ];
    return (_jsxs("div", { className: "fade-in", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Any specific areas you want to focus on?" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Optional - select as many as you want" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: focusOptions.map(option => (_jsxs("button", { onClick: () => updateFocusAreas(option.value), className: `flex items-center gap-3 p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${formData.focusAreas.includes(option.value)
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}`, children: [_jsx(Checkbox, { checked: formData.focusAreas.includes(option.value) }), _jsx("div", { className: `p-2 rounded-lg ${formData.focusAreas.includes(option.value)
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-600'}`, children: option.icon }), _jsx("span", { className: "font-medium text-gray-900", children: option.label })] }, option.value))) }), _jsx("div", { className: "mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-900", children: [_jsx("span", { className: "font-semibold", children: "Ready to go!" }), " Click \"Generate My Workout\" to create your personalized boxing routine."] }) })] }));
};
export default OnboardingForm;
