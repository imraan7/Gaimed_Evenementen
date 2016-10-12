'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('inwoner service', function() {
  it('registered the inwoners service', () => {
    assert.ok(app.service('inwoners'));
  });
});
