export async function generateWorkout(userProfile) {
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
        throw new Error('Please add your OpenAI API key in settings');
    }
    const systemPrompt = `You are an expert boxing coach and personal trainer with 15+ years of experience training fighters of all levels. You create safe, effective, and personalized boxing workouts.

Generate a ${userProfile.duration}-minute boxing workout for the following user profile:

Experience Level: ${userProfile.experience}
Primary Goal: ${userProfile.goal}
Available Equipment: ${userProfile.equipment.join(', ') || 'None (shadowboxing only)'}
Current Fitness Level: ${userProfile.fitnessLevel}
Focus Areas: ${userProfile.focusAreas.join(', ') || 'General boxing fitness'}
Training Frequency: ${userProfile.frequency} days per week

CRITICAL REQUIREMENTS:

STRUCTURE: The workout MUST include these four sections in order:
1. Warm-up (8-12% of total time)
2. Technique Drills (20-30% of total time)
3. Main Work (50-60% of total time)
4. Cool-down (5-10% of total time)

EXPERIENCE-BASED ADJUSTMENTS:

BEGINNER:
- Work/Rest ratio: 2 minutes work / 1 minute rest
- Keep combinations simple: 1-2 punch combos only (jab, cross, basic hooks)
- Focus 40% on technique, 30% on conditioning, 30% on application
- Include detailed form instructions for every exercise
- Total rounds: 4-8 maximum
- Emphasize safety and building good habits
- Avoid complex footwork or defensive movements

INTERMEDIATE:
- Work/Rest ratio: 3 minutes work / 1 minute rest
- Introduce complex combinations: 4-6 punch combos
- Focus 30% technique, 30% conditioning, 40% application
- Mix of heavy bag work (if available) and shadowboxing
- Total rounds: 6-12 rounds
- Include some defensive movements and footwork drills

ADVANCED:
- Work/Rest ratio: 3 minutes work / 30-45 seconds rest
- Complex combinations, defensive patterns, and fight simulation
- Focus 20% technique, 30% conditioning, 50% application
- High intensity throughout
- Total rounds: 8-15 rounds
- Include sparring-style drills and advanced techniques

GOAL-BASED ADJUSTMENTS:

WEIGHT LOSS / FAT BURN:
- High volume, moderate intensity
- Include 30% HIIT-style exercises (burpees, mountain climbers, jump squats)
- Shorter rest periods (30-45 seconds)
- Continuous movement focus
- Estimated calories: 8-12 per minute

BUILD ENDURANCE:
- Longer rounds (3-4 minutes)
- Consistent pace throughout
- Minimal rest between exercises
- Include jump rope if available
- Focus on aerobic capacity

LEARN TECHNIQUE:
- Slower pace, deliberate movements
- More technique drills (40-50% of workout)
- Single technique focus before combinations
- Longer rest to maintain form quality
- Include mirror work cues

BUILD STRENGTH & POWER:
- Focus on explosive movements
- Shorter, intense rounds (1-2 minutes)
- Longer rest for full recovery (1-2 minutes)
- Include resistance work if equipment available
- Power punches emphasized

COMPETITION PREP:
- Simulate fight conditions (3-minute rounds)
- Mix of offense, defense, and conditioning
- High intensity sustained throughout
- Include ring-style movement patterns

EQUIPMENT CONSIDERATIONS:
- If "None": 100% shadowboxing and bodyweight conditioning
- If "Heavy Bag": 50-70% bag work, balance shadowboxing/conditioning
- If "Jump Rope": Include in warm-up and conditioning
- If "Speed Bag": Add speed bag intervals for hand-eye coordination
- Only include exercises using available equipment

OUTPUT FORMAT:
Return ONLY valid JSON (no markdown, no explanations) in this EXACT structure:

{
  "workout_id": "unique_id_string",
  "title": "Descriptive Workout Title (e.g., '30-Min Beginner Fat Burn Boxing')",
  "duration_minutes": ${userProfile.duration},
  "difficulty": "${userProfile.experience}",
  "focus": "${userProfile.goal}",
  "equipment_needed": ${JSON.stringify(userProfile.equipment)},
  "estimated_calories": <realistic_calorie_estimate>,
  "sections": [
    {
      "section_name": "Warm-up",
      "duration_minutes": <calculated_from_total>,
      "exercises": [
        {
          "exercise_name": "Exercise Name",
          "duration_seconds": <number>,
          "rest_seconds": <number>,
          "instructions": "Clear step-by-step instructions",
          "tips": "Helpful coaching tip",
          "form_cues": ["Cue 1", "Cue 2", "Cue 3"]
        }
      ]
    },
    {
      "section_name": "Technique Drills",
      "duration_minutes": <calculated>,
      "exercises": [
        {
          "exercise_name": "Exercise Name",
          "rounds": <number>,
          "work_seconds": <number>,
          "rest_seconds": <number>,
          "instructions": "Detailed instructions",
          "tips": "Coaching tip",
          "form_cues": ["Cue 1", "Cue 2", "Cue 3", "Cue 4"]
        }
      ]
    },
    {
      "section_name": "Main Work",
      "duration_minutes": <calculated>,
      "exercises": [<similar structure>]
    },
    {
      "section_name": "Cool-down",
      "duration_minutes": <calculated>,
      "exercises": [<similar structure>]
    }
  ],
  "coach_notes": "Encouraging message about what to focus on, realistic expectations, and motivation for this specific workout",
  "next_workout_preview": "Brief preview of what the next workout will introduce or focus on"
}

QUALITY REQUIREMENTS:
- Instructions must be clear enough for someone with zero boxing experience
- Form cues should be specific and actionable
- Calorie estimates should be realistic (general range: 6-15 cal/min depending on intensity)
- Total workout time across all sections must equal requested duration
- Exercise variety: don't repeat the same exercise more than twice
- Progression: exercises should flow logically (easy → hard → cool down)

SAFETY CONSIDERATIONS:
- Always include proper warm-up
- Never skip cool-down
- For beginners, emphasize form over intensity
- Mention breathing patterns where relevant
- Include rest periods appropriate to fitness level`;
    const userPrompt = `Generate a personalized boxing workout for this user profile: ${JSON.stringify(userProfile)}`;
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 2500
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'OpenAI API request failed');
            }
            const data = await response.json();
            const content = data.choices[0].message.content;
            const workout = JSON.parse(content);
            validateWorkout(workout, userProfile);
            return workout;
        }
        catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed:`, error);
            if (attempts >= maxAttempts) {
                throw new Error(`Failed to generate workout after ${maxAttempts} attempts: ${error instanceof Error ? error.message : String(error)}`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
    }
}
function validateWorkout(workout, userProfile) {
    const requiredFields = ['workout_id', 'title', 'duration_minutes', 'difficulty', 'sections'];
    for (const field of requiredFields) {
        if (!workout[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    const requiredSections = ['Warm-up', 'Technique Drills', 'Main Work', 'Cool-down'];
    const sectionNames = workout.sections.map((s) => s.section_name);
    for (const section of requiredSections) {
        if (!sectionNames.includes(section)) {
            throw new Error(`Missing required section: ${section}`);
        }
    }
    const totalDuration = workout.sections.reduce((sum, section) => sum + section.duration_minutes, 0);
    if (Math.abs(totalDuration - userProfile.duration) > 2) {
        console.warn(`Duration mismatch: requested ${userProfile.duration}, got ${totalDuration}`);
    }
    return true;
}
