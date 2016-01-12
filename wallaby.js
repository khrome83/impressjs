module.exports = function (wallaby) {
  return {
    files: [
      'lib/**/*.js'
    ],
    tests: [
      {pattern: 'test/**/*.js'}
    ],
    testFramework: "mocha",
    env: {
        type: 'node',
        runner: 'node'
    },
    bootstrap: function () {
      var chai = require('chai');
      var should = chai.should();
    }
  };
};