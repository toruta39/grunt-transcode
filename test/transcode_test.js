var grunt = require('grunt');
var fs = require('fs');

exports.transcode = {
  main: function(test) {
    'use strict';

    test.expect(3);

    var actual = fs.readdirSync('tmp/transcode_test_files').sort();
    var expected = fs.readdirSync('test/expected/transcode_test_files').sort();
    test.deepEqual(expected, actual, 'should transcode several files');

    actual = fs.readdirSync('tmp/transcode_test_mix').sort();
    expected = fs.readdirSync('test/expected/transcode_test_mix').sort();
    test.deepEqual(expected, actual, 'should transcode a mix of folders and files');

    actual = fs.readdirSync('tmp/transcode_test_v0.1.0').sort();
    expected = fs.readdirSync('test/expected/transcode_test_v0.1.0').sort();
    test.deepEqual(expected, actual, 'should parse both dest and src templates');

    test.done();
  },

  flatten: function(test) {
    'use strict';

    test.expect(1);

    var actual = fs.readdirSync('tmp/transcode_test_flatten').sort();
    var expected = fs.readdirSync('test/expected/transcode_test_flatten').sort();
    test.deepEqual(expected, actual, 'should create a flat structure');

    test.done();
  },

  single: function(test) {
    'use strict';

    test.expect(1);

    var actual = grunt.file.read('tmp/single.js');
    var expected = grunt.file.read('test/expected/single.js');
    test.equal(expected, actual, 'should allow for single file transcode');

    test.done();
  }
};
