#!/usr/bin/env node
/**
 * Setup script for HRMS Lite Frontend
 */
const { execSync } = require('child_process');
const fs = require('fs');

function runCommand(command) {
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`✓ ${command}`);
        return true;
    } catch (error) {
        console.log(`✗ ${command}`);
        console.error(`Error: ${error.message}`);
        return false;
    }
}

function main() {
    console.log('Setting up HRMS Lite Frontend...');
    
    // Check if package.json exists
    if (!fs.existsSync('package.json')) {
        console.error('Error: package.json not found');
        process.exit(1);
    }
    
    // Install dependencies
    console.log('\n1. Installing dependencies...');
    if (!runCommand('npm install')) {
        process.exit(1);
    }
    
    console.log('\n✓ Frontend setup complete!');
    console.log('\nTo start the development server, run:');
    console.log('npm start');
}

if (require.main === module) {
    main();
}