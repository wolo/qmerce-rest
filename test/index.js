const should = require('chai').should();
const rest = require('../rest');
const api = rest("url", {user: "user", password: "pass"});

describe('sync methods', function() {
  for(var method of 'get|post|put|delete'.split('|')) {
    it(method + ' exists', function() {
      api.should.have.property(method);
    });
  }
});

describe('async methods', function() {
  for(var method of 'get|post|put|delete'.split('|')) {
    method = method + "Async";
    it(method + ' exists', function() {
      api.should.have.property(method);
    });
  }
});

describe('negative test', function() {
  const method = "invalid";
  it(method + ' exists', function() {
    api.should.not.have.property(method);
  });
});
