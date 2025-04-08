
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://txrbilfifphjoodvhwfl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cmJpbGZpZnBoam9vZHZod2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyOTgzNjIsImV4cCI6MjA1Nzg3NDM2Mn0.tSngeQwWlot8o5IOw7ufn-tynXVCSOg6jMmpeQqXWQU'
export const supabase = createClient(supabaseUrl, supabaseKey)