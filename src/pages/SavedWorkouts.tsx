import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

export function SavedWorkouts() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-red-900/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">BoxFit<span className="text-red-600">AI</span></span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Saved Workouts</h1>
          <p className="text-gray-400">Coming soon...</p>
          <Button
            onClick={() => navigate('/')}
            className="mt-8 bg-red-600 hover:bg-red-700"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
