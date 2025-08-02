const axios = require('axios');

const BASE_URL = 'http://localhost:3003';

async function testAPI() {
  console.log('Testing API endpoints...\n');

  // Test 1: Check if server is running
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/providers`);
    console.log('✅ Server is running and NextAuth is configured');
  } catch (error) {
    console.log('❌ Server is not running or NextAuth is not configured');
    return;
  }

  // Test 2: Test signup endpoint
  try {
    const signupData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "user"
    };
    
    const response = await axios.post(`${BASE_URL}/api/auth/register`, signupData);
    console.log('✅ Signup endpoint is working');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Signup endpoint error:', error.response?.data || error.message);
  }

  console.log('\nAPI test completed!');
}

testAPI(); 