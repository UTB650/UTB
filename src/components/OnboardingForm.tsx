import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Star, Flame, Trophy, TrendingDown, Activity, GraduationCap,
  Zap, Award, Heart, Dumbbell, Wind, Shield, Move, AlertCircle
} from 'lucide-react';
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
      } else if (newEquipment.includes('None') && newEquipment.length > 1) {
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate workout';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const progressPercentage = (currentStep / 6) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Workout</h1>
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of 6</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="relative min-h-96">
          {currentStep === 1 && <Step1 formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <Step2 formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <Step3 formData={formData} updateEquipment={updateEquipment} />}
          {currentStep === 4 && <Step4 formData={formData} updateFormData={updateFormData} />}
          {currentStep === 5 && <Step5 formData={formData} updateFormData={updateFormData} />}
          {currentStep === 6 && <Step6 formData={formData} updateFocusAreas={updateFocusAreas} />}
        </div>

        {error && (
          <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-600">{error}</span>
          </div>
        )}

        <div className="mt-8 flex gap-3 justify-between">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="px-6"
            >
              Back
            </Button>
          )}
          <div className={currentStep === 1 ? 'ml-auto' : ''}>
            {currentStep === 6 ? (
              <Button
                onClick={handleComplete}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-8"
              >
                {isLoading ? 'Generating...' : 'Generate My Workout'}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-red-600 hover:bg-red-700 text-white px-8"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Step1 = ({ formData, updateFormData }) => (
  <div className="fade-in">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your boxing experience?</h2>
    <p className="text-gray-600 mb-6">Help us tailor your workout to your skill level</p>

    <RadioGroup value={formData.experience} onValueChange={(value) => updateFormData('experience', value)}>
      <div className="space-y-3">
        <ExperienceCard
          value="Beginner"
          icon={<Star className="w-6 h-6" />}
          title="Beginner"
          description="Never boxed before or less than 3 months of training"
          selected={formData.experience === 'Beginner'}
        />
        <ExperienceCard
          value="Intermediate"
          icon={<Flame className="w-6 h-6" />}
          title="Intermediate"
          description="3-12 months of consistent training"
          selected={formData.experience === 'Intermediate'}
        />
        <ExperienceCard
          value="Advanced"
          icon={<Trophy className="w-6 h-6" />}
          title="Advanced"
          description="1+ years of regular boxing training"
          selected={formData.experience === 'Advanced'}
        />
      </div>
    </RadioGroup>
  </div>
);

const ExperienceCard = ({ value, icon, title, description, selected }) => (
  <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
    selected
      ? 'border-red-600 bg-red-50'
      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
  }`}>
    <RadioGroupItem value={value} className="w-5 h-5" />
    <div className="flex items-center gap-4 flex-1">
      <div className={`p-3 rounded-full ${selected ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </label>
);

const Step2 = ({ formData, updateFormData }) => (
  <div className="fade-in">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you want to achieve?</h2>
    <p className="text-gray-600 mb-6">Select your primary fitness goal</p>

    <RadioGroup value={formData.goal} onValueChange={(value) => updateFormData('goal', value)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GoalCard
          value="Weight Loss"
          icon={<TrendingDown className="w-6 h-6" />}
          title="Weight Loss"
          description="Burn calories and shed pounds through high-intensity boxing"
          selected={formData.goal === 'Weight Loss'}
        />
        <GoalCard
          value="Endurance"
          icon={<Activity className="w-6 h-6" />}
          title="Build Endurance"
          description="Improve cardiovascular fitness and stamina"
          selected={formData.goal === 'Endurance'}
        />
        <GoalCard
          value="Technique"
          icon={<GraduationCap className="w-6 h-6" />}
          title="Learn Technique"
          description="Master proper boxing form and techniques"
          selected={formData.goal === 'Technique'}
        />
        <GoalCard
          value="Strength"
          icon={<Zap className="w-6 h-6" />}
          title="Build Strength"
          description="Develop explosive power and muscular strength"
          selected={formData.goal === 'Strength'}
        />
        <GoalCard
          value="Competition"
          icon={<Award className="w-6 h-6" />}
          title="Competition Prep"
          description="Train for amateur boxing competitions"
          selected={formData.goal === 'Competition'}
        />
        <GoalCard
          value="Fitness"
          icon={<Heart className="w-6 h-6" />}
          title="General Fitness"
          description="Stay active and blow off steam"
          selected={formData.goal === 'Fitness'}
        />
      </div>
    </RadioGroup>
  </div>
);

const GoalCard = ({ value, icon, title, description, selected }) => (
  <label className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
    selected
      ? 'border-red-600 bg-red-50'
      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
  }`}>
    <RadioGroupItem value={value} className="w-5 h-5 mb-3" />
    <div className={`p-3 rounded-full w-fit mb-3 ${selected ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
      {icon}
    </div>
    <h3 className="font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </label>
);

const Step3 = ({ formData, updateEquipment }) => {
  const equipmentOptions = [
    { value: 'None', icon: <Flame className="w-6 h-6" />, label: 'None' },
    { value: 'Heavy Bag', icon: <Dumbbell className="w-6 h-6" />, label: 'Heavy Bag' },
    { value: 'Speed Bag', icon: <Wind className="w-6 h-6" />, label: 'Speed Bag' },
    { value: 'Jump Rope', icon: <Activity className="w-6 h-6" />, label: 'Jump Rope' },
    { value: 'Hand Wraps & Gloves', icon: <Trophy className="w-6 h-6" />, label: 'Hand Wraps & Gloves' },
    { value: 'Resistance Bands', icon: <Zap className="w-6 h-6" />, label: 'Resistance Bands' },
  ];

  const isNoneSelected = formData.equipment.includes('None');

  return (
    <div className="fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">What equipment do you have access to?</h2>
      <p className="text-gray-600 mb-6">Select all that apply</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipmentOptions.map(option => (
          <button
            key={option.value}
            onClick={() => updateEquipment(option.value)}
            disabled={isNoneSelected && option.value !== 'None'}
            className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all duration-200 ${
              formData.equipment.includes(option.value)
                ? 'border-red-600 bg-red-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            } ${isNoneSelected && option.value !== 'None' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <Checkbox
              checked={formData.equipment.includes(option.value)}
              disabled={isNoneSelected && option.value !== 'None'}
            />
            <div className={`p-2 rounded-lg ${
              formData.equipment.includes(option.value)
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {option.icon}
            </div>
            <span className="font-medium text-gray-900">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Step4 = ({ formData, updateFormData }) => (
  <div className="fade-in">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">How much time do you have?</h2>
    <p className="text-gray-600 mb-8">Tell us about your availability</p>

    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          How long per session?
        </label>
        <Select value={formData.duration} onValueChange={(value) => updateFormData('duration', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="20">20 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">60 minutes</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-600 mt-2">Be realistic - it's better to complete shorter workouts consistently</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          How many days per week?
        </label>
        <Select value={formData.frequency} onValueChange={(value) => updateFormData('frequency', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 days</SelectItem>
            <SelectItem value="3">3 days</SelectItem>
            <SelectItem value="4">4 days</SelectItem>
            <SelectItem value="5">5 days</SelectItem>
            <SelectItem value="6">6 days</SelectItem>
            <SelectItem value="7">7 days</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-600 mt-2">We recommend at least 3 sessions per week for best results</p>
      </div>
    </div>
  </div>
);

const Step5 = ({ formData, updateFormData }) => (
  <div className="fade-in">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">How would you describe your current fitness?</h2>
    <p className="text-gray-600 mb-6">This helps us customize workout intensity</p>

    <RadioGroup value={formData.fitnessLevel} onValueChange={(value) => updateFormData('fitnessLevel', value)}>
      <div className="space-y-3">
        <FitnessCard
          value="Low"
          title="Low"
          subtitle="Sedentary Lifestyle"
          description="I don't currently exercise regularly and get winded easily"
          selected={formData.fitnessLevel === 'Low'}
        />
        <FitnessCard
          value="Moderate"
          title="Moderate"
          subtitle="Somewhat Active"
          description="I can handle 20-30 minutes of cardio comfortably"
          selected={formData.fitnessLevel === 'Moderate'}
        />
        <FitnessCard
          value="High"
          title="High"
          subtitle="Very Active"
          description="I exercise regularly 3+ times per week and have good endurance"
          selected={formData.fitnessLevel === 'High'}
        />
      </div>
    </RadioGroup>
  </div>
);

const FitnessCard = ({ value, title, subtitle, description, selected }) => (
  <label className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
    selected
      ? 'border-red-600 bg-red-50'
      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
  }`}>
    <RadioGroupItem value={value} className="w-5 h-5 mt-1" />
    <div className="flex-1">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 font-medium mb-1">{subtitle}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </label>
);

const Step6 = ({ formData, updateFocusAreas }) => {
  const focusOptions = [
    { value: 'Footwork', icon: <Move className="w-6 h-6" />, label: 'Footwork & Movement' },
    { value: 'Power', icon: <Zap className="w-6 h-6" />, label: 'Power Punching' },
    { value: 'Speed', icon: <Wind className="w-6 h-6" />, label: 'Speed & Combinations' },
    { value: 'Defense', icon: <Shield className="w-6 h-6" />, label: 'Defense & Head Movement' },
    { value: 'Conditioning', icon: <Flame className="w-6 h-6" />, label: 'Conditioning / HIIT' },
  ];

  return (
    <div className="fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Any specific areas you want to focus on?</h2>
      <p className="text-gray-600 mb-6">Optional - select as many as you want</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {focusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => updateFocusAreas(option.value)}
            className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
              formData.focusAreas.includes(option.value)
                ? 'border-red-600 bg-red-50'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <Checkbox
              checked={formData.focusAreas.includes(option.value)}
            />
            <div className={`p-2 rounded-lg ${
              formData.focusAreas.includes(option.value)
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {option.icon}
            </div>
            <span className="font-medium text-gray-900">{option.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Ready to go!</span> Click "Generate My Workout" to create your personalized boxing routine.
        </p>
      </div>
    </div>
  );
};

export default OnboardingForm;
