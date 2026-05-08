// js/supabase.js

const supabaseUrl = 'https://yxcnbdpzywilynjzfzcu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4Y25iZHB6eXdpbHluanpmemN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMDk1NDEsImV4cCI6MjA5MzU4NTU0MX0.XwcTJYIealg75HZDGrwz3k-LXbfL4xYtiNyKJUipgcc';


window.db = supabase.createClient(supabaseUrl, supabaseKey);

console.log("Supabase conectado com sucesso!");