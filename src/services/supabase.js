import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://elpfmqqkkdfwvlribcmq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscGZtcXFra2Rmd3ZscmliY21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2OTkyMjcsImV4cCI6MjAxOTI3NTIyN30.qUIwCK2sdbm7JpO7J0fBnS2xCCf7L-k_LKYebahplXE'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase