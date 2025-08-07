const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber-report/report.json',
  output: 'cucumber-report/report.html',
  reportSuiteAsScenarios: true,
  launchReport: true, // <--- opens in browser automatically
};

reporter.generate(options);
