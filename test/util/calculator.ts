/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/power-assert/power-assert.d.ts" />
import assert = require('power-assert');

import calculator = require('../../app/util/calculator');

describe('Calculator', function() {
  beforeEach(function() {
    this.calculator = new calculator.Calculator();
  });

  describe('#add', function() {
    context('with 1 and 2', function() {
      beforeEach(function() {
        this.x = 1;
        this.y = 2;
        this.expected = 3;
      });

      it('returns 3', function() {
        assert(this.calculator.add(this.x, this.y) === this.expected);
      });
    });

    context('with 0 and 1', function() {
      beforeEach(function() {
        this.x = 0;
        this.y = 1;
        this.expected = 1;
      });

      it('returns 1', function() {
        assert(this.calculator.add(this.x, this.y) === this.expected);
      });
    });
  });
});
