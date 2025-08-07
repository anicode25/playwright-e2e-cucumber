module.exports = {
  default: {
    require: ['tests/steps/**/*.ts', 'tests/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    paths: ['tests/features/**/*.feature'],
    format: ['progress'],
    publishQuiet: true
  }
};
