const assert = require('assert');

let taggeo = require('./index');

taggeo = new taggeo.Analytics();
assert.ok(typeof taggeo.healthCheck === 'function');
