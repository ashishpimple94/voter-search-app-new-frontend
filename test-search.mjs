// Test script to debug voter search
import { fetchVoters } from './src/services/apiService.js';

async function testSearch() {
  console.log('Testing voter search...\n');
  
  try {
    // Test 1: Search by name
    console.log('1. Testing search by name: "Adgale"');
    const voters1 = await fetchVoters('name', 'Adgale');
    console.log(`Found ${voters1.length} voters\n`);
    
    // Test 2: Search by full name
    console.log('2. Testing search by full name: "ADAGLE RAOSAHEB KISAN"');
    const voters2 = await fetchVoters('name', 'ADAGLE RAOSAHEB KISAN');
    console.log(`Found ${voters2.length} voters\n`);
    
    // Test 3: Search by last name
    console.log('3. Testing search by last name: "Kisan"');
    const voters3 = await fetchVoters('name', 'Kisan');
    console.log(`Found ${voters3.length} voters\n`);
    
    console.log('✅ All API tests passed!');
    
  } catch (error) {
    console.error('❌ API Test failed:', error.message);
  }
}

testSearch();