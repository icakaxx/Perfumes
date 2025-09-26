// Simple Node.js script to test Supabase connection
// Run this with: node test-supabase-connection.js

const { createClient } = require('@supabase/supabase-js');

// Your Supabase credentials
const supabaseUrl = 'https://mgyjouymbqlufcczmoru.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1neWpvdXltYnFsdWZjY3ptb3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MzI3MDMsImV4cCI6MjA3NDQwODcwM30.qa5su_gnfjIMuJwosMSTwYrFZnDlez_DXVHbmSshlgs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test data
    const testProduct = {
      id: 'test-1',
      name: 'Test Perfume',
      brand: 'Test Brand',
      description: 'This is a test product to verify database connection',
      image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
      concentration: 'EDT',
      gender_profile: 'Unisex',
      top_notes: ['Test Note 1', 'Test Note 2'],
      heart_notes: ['Test Heart 1'],
      base_notes: ['Test Base 1'],
      variants: [
        {
          id: 'test-1-50',
          volumeMl: 50,
          price: 99.99,
          inStock: true
        }
      ],
      rating: 4.5
    };

    console.log('Attempting to insert test product...');
    
    const { data, error } = await supabase
      .from('products')
      .insert([testProduct])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return;
    }

    console.log('✅ Successfully inserted test product:', data);
    console.log('🎉 Database connection is working!');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

// Run the test
testConnection();

