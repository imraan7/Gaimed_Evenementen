'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('attendee service', function() {
  it('registered the attendees service', () => {
    assert.ok(app.service('attendees'));
  });
});
