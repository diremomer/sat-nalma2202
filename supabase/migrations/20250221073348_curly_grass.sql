/*
  # Create users table and policies

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `department` (text)
      - `role` (text)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `users` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text NOT NULL,
  department text NOT NULL,
  role text NOT NULL DEFAULT 'talep_acan',
  status text NOT NULL DEFAULT 'beklemede',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar kendi profillerini görüntüleyebilir
CREATE POLICY "Kullanıcılar kendi profillerini görüntüleyebilir"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Yöneticiler tüm kullanıcıları görüntüleyebilir
CREATE POLICY "Yöneticiler tüm kullanıcıları görüntüleyebilir"
  ON users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'mudur'
    )
  );

-- Satın alma uzmanları tüm kullanıcıları görüntüleyebilir
CREATE POLICY "Satın alma uzmanları tüm kullanıcıları görüntüleyebilir"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'satin_alma_uzmani'
    )
  );