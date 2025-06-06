import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qffzrhxtuwvsqvrkyptx.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmZnpyaHh0dXd2c3F2cmt5cHR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNzM1MDMsImV4cCI6MjA2NDY0OTUwM30.ZKhh3xIhiA5hgprgAXS6dK-nS5sj3D317HhW5H6bFnI";
export const supabase = createClient(supabaseUrl, supabaseKey);
