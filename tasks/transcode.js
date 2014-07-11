/*
 * grunt-transcode
 * https://github.com/toruta39/grunt-transcode
 *
 * Copyright (c) 2014 Joshua Zhang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var iconv = require('iconv-lite');

  grunt.registerMultiTask('transcode', 'A file encoding converter that really works!', function () {

    var options = this.options({
      fromEncoding: 'utf8',
      toEncoding: 'utf8'
    });

    var copyOptions = {
      encoding: 'binary',
      process: function(content) {
        content = iconv.decode(new Buffer(content, 'binary'), options.fromEncoding);
        content = iconv.encode(content, options.toEncoding);

        return content;
      }
    };

    var dest;
    var isExpandedPair;
    var tally = {
      dirs: 0,
      files: 0
    };

    this.files.forEach(function(filePair) {
      isExpandedPair = filePair.orig.expand || false;

      filePair.src.forEach(function(src) {
        if (detectDestType(filePair.dest) === 'directory') {
          dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
        } else {
          dest = filePair.dest;
        }

        if (grunt.file.isDir(src)) {
          grunt.verbose.writeln('Creating ' + dest.cyan);
          grunt.file.mkdir(dest);
          tally.dirs++;
        } else {
          grunt.verbose.writeln('Converting ' + src.cyan + ' -> ' + dest.cyan);
          grunt.file.copy(src, dest, copyOptions);
          tally.files++;
        }
      });
    });

    if (tally.dirs) {
      grunt.log.write('Created ' + tally.dirs.toString().cyan + ' directories');
    }

    if (tally.files) {
      grunt.log.write((tally.dirs ? ', converted ' : 'Converted ') + tally.files.toString().cyan + ' files');
    }

    grunt.log.writeln();
  });

  var detectDestType = function(dest) {
    if (grunt.util._.endsWith(dest, '/')) {
      return 'directory';
    } else {
      return 'file';
    }
  };

  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
};
