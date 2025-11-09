import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Target, Dumbbell, Settings } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-red-900/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">BoxFit<span className="text-red-600">AI</span></span>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/settings')}
              variant="outline"
              size="sm"
              className="border-red-600/50 text-gray-300 hover:text-white hover:bg-red-600/10"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button
              onClick={() => navigate('/onboarding')}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-black z-0"></div>
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000)',
            filter: 'grayscale(50%)'
          }}
        ></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-red-600/20 border border-red-600/40 rounded-full text-sm font-medium text-red-400">
                AI-Powered Boxing Training
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Your Personal Boxing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                Coach in Your Pocket
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Get personalized boxing workouts powered by advanced AI. Whether you're a beginner or pro,
              BoxFit AI adapts to your skill level, fitness goals, and available equipment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/onboarding')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all"
              >
                Start Your Boxing Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/workouts')}
                className="border-2 border-red-600/50 text-white hover:bg-red-600/10 font-bold text-lg px-8 py-6 rounded-lg"
              >
                View Sample Workouts
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-400">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-400">Personalized in seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-400">All skill levels welcome</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-red-600">BoxFit AI</span>?
            </h2>
            <p className="text-gray-400 text-lg">
              Train smarter, not harder with AI-powered personalization
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-neutral-900 border-neutral-800 hover:border-red-600/50 transition-all duration-300 group">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">AI-Powered Plans</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our advanced AI analyzes your fitness level, goals, and preferences to create
                  perfectly tailored boxing workouts that evolve with your progress.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border-neutral-800 hover:border-red-600/50 transition-all duration-300 group">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">All Skill Levels</h3>
                <p className="text-gray-400 leading-relaxed">
                  From complete beginners to seasoned fighters, BoxFit AI adapts to your experience
                  level and helps you master technique while building strength.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border-neutral-800 hover:border-red-600/50 transition-all duration-300 group">
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">No Equipment Needed</h3>
                <p className="text-gray-400 leading-relaxed">
                  Train anywhere, anytime. Get effective shadow boxing workouts with no equipment,
                  or level up with bags, gloves, and more if you have them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517438984742-1262db08379e?q=80&w=2000)',
            filter: 'grayscale(100%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black"></div>

        <div className="container mx-auto relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                Boxing Training?
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Join thousands of athletes training smarter with AI-powered workouts
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/onboarding')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-12 py-6 rounded-lg shadow-2xl shadow-red-600/40 hover:shadow-red-600/60 transition-all"
            >
              Start Training Now
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 border-t border-neutral-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">BoxFit<span className="text-red-600">AI</span></span>
            </div>

            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                AI-powered personalized boxing workouts for all skill levels
              </p>
              <p className="text-gray-500 text-xs mt-2">
                © 2025 BoxFit AI. Train smarter, fight stronger.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
