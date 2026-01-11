const { ipwhois, getIpInfo, getMyIpInfo } = require('../dist/index');

async function runExamples() {
  console.log('=== IP Whois Module Examples ===\n');
  
  try {
    // Example 1: Get info for current IP
    console.log('1. Getting info for your current IP...');
    const myInfo = await getMyIpInfo();
    console.log(`   IP: ${myInfo.ip}`);
    console.log(`   Country: ${myInfo.country} (${myInfo.country_code})`);
    console.log(`   City: ${myInfo.city}`);
    console.log(`   ISP: ${myInfo.isp}`);
    console.log(`   Timezone: ${myInfo.timezone}\n`);
    
    // Example 2: Get info for a specific IP (Google DNS)
    console.log('2. Getting info for Google DNS (8.8.8.8)...');
    const googleInfo = await getIpInfo('8.8.8.8');
    console.log(`   IP: ${googleInfo.ip}`);
    console.log(`   Country: ${googleInfo.country} (${googleInfo.country_code})`);
    console.log(`   City: ${googleInfo.city}`);
    console.log(`   Organization: ${googleInfo.org}`);
    console.log(`   Timezone: ${googleInfo.timezone}\n`);
    
    // Example 3: Using main function with options
    console.log('3. Getting info for Cloudflare DNS (1.1.1.1)...');
    const cloudflareInfo = await ipwhois({ ip: '1.1.1.1', timeout: 5000 });
    console.log(`   IP: ${cloudflareInfo.ip}`);
    console.log(`   Country: ${cloudflareInfo.country} (${cloudflareInfo.country_code})`);
    console.log(`   City: ${cloudflareInfo.city}`);
    console.log(`   Latitude: ${cloudflareInfo.latitude}`);
    console.log(`   Longitude: ${cloudflareInfo.longitude}\n`);
    
    console.log('✅ All examples completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

runExamples();
