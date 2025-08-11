const report = require('multiple-cucumber-html-reporter');
const os = require('os');
const { execSync } = require('child_process');

// Detect platform info
const platformName = os.platform() === 'win32' ? 'windows' : os.platform();
const platformVersion = os.release();

// Detect Chrome version from Playwright (works for Chromium too)
let browserVersion = 'unknown';
try {
  browserVersion = execSync('npx playwright --version').toString().trim();
} catch (err) {
  console.error('Could not detect browser version', err);
}

report.generate({
  jsonDir: 'cucumber-report',
  reportPath: 'cucumber-report/html',
  metadata: {
    browser: {
      name: 'chromium', // match your Playwright browser name
      version: browserVersion
    },
    device: os.hostname(),
    platform: {
      name: platformName,
      version: platformVersion
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Swag Labs_e2e' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
      { label: 'Execution End Time', value: new Date().toLocaleString() }
    ]
  }
});
