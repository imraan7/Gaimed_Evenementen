'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('ambtenaar service', function() {
  it('registered the ambtenaars service', () => {
    assert.ok(app.service('ambtenaars'));
  });
});
