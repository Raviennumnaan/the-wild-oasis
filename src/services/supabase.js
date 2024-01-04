import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dueivvrnriwhfmvcxuxr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1ZWl2dnJucml3aGZtdmN4dXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwNTM3NDAsImV4cCI6MjAxODYyOTc0MH0.PaehAc2_p8ONCuHfCAov25kAyaZKWbnZgyaQRRRqthQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
