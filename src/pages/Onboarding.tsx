import { useNavigate } from 'react-router-dom';
import OnboardingForm from '@/components/OnboardingForm';
import { Target } from 'lucide-react';

export function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">BoxFit<span className="text-red-600">AI</span></span>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <OnboardingForm />
      </div>
    </div>
  );
}
