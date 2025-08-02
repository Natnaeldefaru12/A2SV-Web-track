const axios = require('axios');

const BASE_URL = 'https://akil-backend.onrender.com';

async function testExternalAPI() {
  console.log('Testing External API endpoints...\n');

  // Test 1: Test signup
  try {
    const signupData = {
      name: "Test User API",
      email: "testapi@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "user"
    };
    
    console.log('Testing signup...');
    const signupResponse = await axios.post(`${BASE_URL}/signup`, signupData);
    console.log('✅ Signup successful:', signupResponse.data);
  } catch (error) {
    console.log('❌ Signup failed:', error.response?.data || error.message);
  }

  // Test 2: Test login with the same credentials
  try {
    const loginData = {
      email: "testapi@example.com",
      password: "password123"
    };
    
    console.log('\nTesting login...');
    const loginResponse = await axios.post(`${BASE_URL}/login`, loginData);
    console.log('✅ Login successful:', loginResponse.data);
    console.log('Response structure:', Object.keys(loginResponse.data));
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data || error.message);
    console.log('Status:', error.response?.status);
  }

  console.log('\nExternal API test completed!');
}

testExternalAPI(); 