import { createClient } from "@supabase/supabase-js";
import config from './config';

const supabaseKey =  config.SUPABASE_API_KEY
const supabaseUrl = config.SUPABASE_URL

export const supabase = createClient(supabaseUrl, supabaseKey)
