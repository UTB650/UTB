import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Target, Clock, Flame, Dumbbell, CheckCircle, Lightbulb, MessageCircle, Play, Save, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

const mockWorkout = {
  workout_id: "mock_workout_001",
  title: "30-Minute Beginner Fat Burn Boxing",
  duration_minutes: 30,
  difficulty: "Beginner",
  focus: "Weight Loss",
  equipment_needed: ["None"],
  estimated_calories: 250,
  sections: [
    {
      section_name: "Warm-up",
      duration_minutes: 5,
      exercises: [
        {
          exercise_name: "Jumping Jacks",
          duration_seconds: 60,
          rest_seconds: 0,
          instructions: "Keep your core tight and land softly on the balls of your feet. Maintain steady rhythm.",
          tips: "This gets your heart rate up and loosens your shoulders for punching.",
          form_cues: ["Keep core engaged", "Land softly", "Breathe rhythmically"]
        },
        {
          exercise_name: "Arm Circles",
          duration_seconds: 30,
          rest_seconds: 0,
          instructions: "Make large circles forward for 15 seconds, then backward for 15 seconds. Keep arms straight.",
          tips: "Loosens shoulder joints to prepare for punching movements.",
          form_cues: ["Full range of motion", "Control the movement", "Keep shoulders down"]
        }
      ]
    },
    {
      section_name: "Technique Drills",
      duration_minutes: 8,
      exercises: [
        {
          exercise_name: "Jab Practice",
          rounds: 2,
          work_seconds: 120,
          rest_seconds: 60,
          instructions: "Stand in orthodox stance. Extend your lead hand straight out, rotating your fist so thumb points down at full extension. Snap it back quickly to your chin. Focus on speed, not power.",
          tips: "The jab is your most important punch. Master this before moving to power punches.",
          form_cues: [
            "Chin tucked, look through your eyebrows",
            "Shoulder up to protect chin on extension",
            "Snap the punch back as fast as you threw it",
            "Exhale sharply with each jab"
          ]
        }
      ]
    },
    {
      section_name: "Main Work",
      duration_minutes: 15,
      exercises: [
        {
          exercise_name: "Shadowboxing - Jab/Cross Combinations",
          rounds: 3,
          work_seconds: 180,
          rest_seconds: 60,
          instructions: "Throw 1-2 combinations (jab-cross) while moving around. Imagine an opponent in front of you. Focus on turning your hips with the cross.",
          tips: "Mix in single jabs between combinations. Stay light on your feet and keep moving.",
          form_cues: [
            "Pivot back foot on cross for power",
            "Full hip rotation drives the cross",
            "Hands return to guard immediately",
            "Move after every combination"
          ]
        }
      ]
    },
    {
      section_name: "Cool-down",
      duration_minutes: 2,
      exercises: [
        {
          exercise_name: "Light Shadowboxing",
          duration_seconds: 60,
          rest_seconds: 0,
          instructions: "Very light, slow punches focusing on form and breathing. Bring your intensity down gradually.",
          tips: "Don't stop moving abruptly - bring your heart rate down gradually."
        },
        {
          exercise_name: "Shoulder Stretch",
          duration_seconds: 60,
          rest_seconds: 0,
          instructions: "Pull each arm across your chest and hold for 30 seconds per side. Breathe deeply.",
          tips: "You should feel a gentle stretch in the back of your shoulder."
        }
      ]
    }
  ],
  coach_notes: "Great first workout! Focus on keeping your hands up and chin down throughout the session. Don't worry about power yet - we're building good habits and muscle memory. Remember: speed comes from relaxation, not tension.",
  next_workout_preview: "Next session we'll introduce hooks and work on lateral movement patterns."
};

const sectionColors: Record<string, { accent: string; light: string; badge: string }> = {
  "Warm-up": { accent: "blue", light: "bg-blue-50", badge: "bg-blue-100 text-blue-700" },
  "Technique Drills": { accent: "purple", light: "bg-purple-50", badge: "bg-purple-100 text-purple-700" },
  "Main Work": { accent: "red", light: "bg-red-50", badge: "bg-red-100 text-red-700" },
  "Cool-down": { accent: "green", light: "bg-green-50", badge: "bg-green-100 text-green-700" }
};

function getDifficultyColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "bg-green-100 text-green-700";
    case "intermediate":
      return "bg-yellow-100 text-yellow-700";
    case "advanced":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

interface ExerciseCardProps {
  exercise: any;
  sectionName: string;
}

function ExerciseCard({ exercise, sectionName }: ExerciseCardProps) {
  const [showFormCues, setShowFormCues] = useState(false);
  const colors = sectionColors[sectionName] || sectionColors["Warm-up"];

  return (
    <div className="border border-gray-200 rounded-lg p-5 mb-4 hover:shadow-md transition-shadow">
      <div className="mb-3">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{exercise.exercise_name}</h4>

        {exercise.rounds ? (
          <p className="text-sm text-gray-600">
            {exercise.rounds} rounds × {formatTime(exercise.work_seconds)} work / {formatTime(exercise.rest_seconds)} rest
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Duration: {formatTime(exercise.duration_seconds)}
          </p>
        )}
      </div>

      <div className="mb-4 pb-4 border-b border-gray-100">
        <p className="text-sm text-gray-700 leading-relaxed">{exercise.instructions}</p>
      </div>

      {exercise.tips && (
        <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex gap-2 items-start">
            <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 italic">{exercise.tips}</p>
          </div>
        </div>
      )}

      {exercise.form_cues && exercise.form_cues.length > 0 && (
        <Collapsible open={showFormCues} onOpenChange={setShowFormCues}>
          <CollapsibleTrigger>
            Show Form Cues ({exercise.form_cues.length})
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 mt-3">
              {exercise.form_cues.map((cue: string, idx: number) => (
                <div key={idx} className="flex gap-2 items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{cue}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

interface WorkoutSectionProps {
  section: any;
  isOpen: boolean;
  onToggle: () => void;
}

function WorkoutSection({ section, isOpen, onToggle }: WorkoutSectionProps) {
  const colors = sectionColors[section.section_name] || sectionColors["Warm-up"];

  return (
    <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={onToggle}
        className={`w-full px-6 py-4 flex items-center justify-between font-semibold transition-colors ${
          isOpen ? `${colors.light} border-b border-gray-200` : "hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-1 h-8 rounded-full bg-${colors.accent}-600`} />
          <div className="text-left">
            <h3 className="text-lg text-gray-900">{section.section_name}</h3>
            <p className="text-sm text-gray-600">{section.duration_minutes} min · {section.exercises.length} exercise{section.exercises.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-white">
          {section.exercises.map((exercise: any, idx: number) => (
            <div key={idx}>
              <ExerciseCard exercise={exercise} sectionName={section.section_name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function WorkoutDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Warm-up": true,
    "Technique Drills": false,
    "Main Work": false,
    "Cool-down": false
  });
  const [saveMessage, setSaveMessage] = useState("");

  const getWorkout = () => {
    if (location.state?.workout) {
      return location.state.workout;
    }
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    if (savedWorkouts.length > 0) {
      return savedWorkouts[0];
    }
    return mockWorkout;
  };

  const workout = getWorkout();

  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleStartWorkout = () => {
    console.log("Starting workout...");
    navigate('/workout/timer', { state: { workout } });
  };

  const handleSaveWorkout = () => {
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    const workoutToSave = {
      ...workout,
      saved_at: new Date().toISOString()
    };
    savedWorkouts.push(workoutToSave);
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));

    setSaveMessage("Workout saved!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

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

      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Card */}
          <Card className="mb-8 p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{workout.title}</h1>

              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{workout.duration_minutes} min</span>
                </div>

                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getDifficultyColor(workout.difficulty)}`}>
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">{workout.difficulty}</span>
                </div>

                <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg border border-orange-200">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-medium">~{workout.estimated_calories} cal</span>
                </div>

                {workout.equipment_needed.filter((eq: string) => eq !== "None").map((equipment: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300">
                    <Dumbbell className="w-4 h-4" />
                    <span className="text-sm font-medium">{equipment}</span>
                  </div>
                ))}
              </div>

              <p className="text-gray-700 mb-6">
                <span className="font-semibold">Focused on:</span> {workout.focus}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                <Button
                  onClick={handleStartWorkout}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base font-semibold flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Workout
                </Button>
                <Button
                  onClick={handleSaveWorkout}
                  variant="outline"
                  className="px-8 py-3 text-base font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Workout
                </Button>
              </div>

              {saveMessage && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                  ✓ {saveMessage}
                </div>
              )}
            </div>
          </Card>

          {/* Workout Sections */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Workout Breakdown</h2>
            {workout.sections.map((section: any, idx: number) => (
              <WorkoutSection
                key={idx}
                section={section}
                isOpen={openSections[section.section_name]}
                onToggle={() => toggleSection(section.section_name)}
              />
            ))}
          </div>

          {/* Coach Notes */}
          <Card className="bg-red-50 border border-red-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-200">
                  <MessageCircle className="w-6 h-6 text-red-700" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Coach's Notes</h3>
                <p className="text-red-800 mb-4">{workout.coach_notes}</p>
                {workout.next_workout_preview && (
                  <div className="pt-4 border-t border-red-200">
                    <p className="text-sm text-red-700">
                      <span className="font-semibold">What's Next:</span> {workout.next_workout_preview}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
