const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'cucumber-report', // The folder containing the Cucumber JSON
  reportPath: 'cucumber-report/html', // The output folder for HTML
  metadata: {
    browser: {
      name: 'chrome',
      version: '126'
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '10'
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

