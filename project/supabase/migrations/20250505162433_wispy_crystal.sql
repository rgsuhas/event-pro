/*
  # Create events table

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text)
      - `date` (date)
      - `location` (text)
      - `type` (text)
      - `link` (text)
      - `description` (text)
      - `source` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on `events` table
    - Add policies for:
      - Anyone can read events
      - Authenticated users can create events
      - Users can update/delete their own events
*/

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date date NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('hackathon', 'workshop', 'talk')),
  link text NOT NULL,
  description text NOT NULL,
  source text NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'scraped')),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read events
CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Policy: Authenticated users can create events
CREATE POLICY "Authenticated users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Users can update their own events
CREATE POLICY "Users can update their own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own events
CREATE POLICY "Users can delete their own events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);