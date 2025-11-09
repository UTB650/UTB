/*
  # Create exercises table

  1. New Tables
    - `exercises`
      - `id` (uuid, primary key)
      - `exercise_id` (text, unique slug)
      - `name` (text)
      - `category` (text)
      - `difficulty` (text)
      - `equipment_required` (jsonb array)
      - `primary_focus` (text)
      - `instructions_short` (text)
      - `instructions_detailed` (text)
      - `form_cues` (jsonb array)
      - `duration_typical` (integer)
      - `calories_per_minute` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `exercises` table
    - Add policy for all users to read exercises
*/

CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exercise_id text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  equipment_required jsonb DEFAULT '[]',
  primary_focus text NOT NULL,
  instructions_short text NOT NULL,
  instructions_detailed text NOT NULL,
  form_cues jsonb DEFAULT '[]',
  duration_typical integer DEFAULT 120,
  calories_per_minute integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read exercises"
  ON exercises
  FOR SELECT
  TO anon, authenticated
  USING (true);
