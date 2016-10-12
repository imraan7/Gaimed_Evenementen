'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('evenement service', function() {
  it('registered the evenements service', () => {
    assert.ok(app.service('evenements'));
  });
});
