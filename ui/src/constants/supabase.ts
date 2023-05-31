import { createClient } from '@supabase/supabase-js';
import {
  VITE_PUBLIC_SUPABASE_ANON_KEY,
  VITE_PUBLIC_SUPABASE_URL,
} from './config';

export const supabase = createClient(
  VITE_PUBLIC_SUPABASE_URL,
  VITE_PUBLIC_SUPABASE_ANON_KEY,
);
