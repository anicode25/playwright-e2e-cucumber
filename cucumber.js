module.exports = {
  default: {
    require: ['tests/steps/**/*.ts', 'tests/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    paths: ['tests/features/**/*.feature'],
    format: ['json:cucumber-report/report.json','progress'],
    publishQuiet: true
  }
};
