/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/power-assert/power-assert.d.ts" />
import assert = require('power-assert');

import main = require('../app/index');

describe('Main', function() {
  beforeEach(function() {
    this.main = new main.Main();
  });

  describe('#getValue', function() {
    context('called #add(1)', function() {
      beforeEach(function() { this.main.add(1); });
      it('returns 1', function() {
        assert(this.main.getValue() === 1);
      });
    })
  });
});
