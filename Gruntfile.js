/*
 * grunt-transcode
 * https://github.com/toruta39/grunt-transcode
 *
 * Copyright (c) 2014 Joshua Zhang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    test_vars: {
      name: 'grunt-contrib-copy',
      version: '0.1.0',
      match: 'folder_one/*'
    },

    // Configuration to be run (and then tested).
    transcode: {
      main: {
        files: [
          {expand: true, cwd: 'test/fixtures', src: ['*.*'], dest: 'tmp/transcode_test_files/'},
          {expand: true, cwd: 'test/fixtures', src: ['**'], dest: 'tmp/transcode_test_mix/'},
          {expand: true, cwd: 'test/fixtures', src: ['<%= test_vars.match %>'], dest: 'tmp/transcode_test_v<%= test_vars.version %>/'}
        ]
      },

      flatten: {
        files: [
          {expand: true, flatten: true, filter: 'isFile', src: ['test/fixtures/**'], dest: 'tmp/transcode_test_flatten/'}
        ]
      },

      single: {
        files: {
          'tmp/single.js': ['test/fixtures/test.js']
        }
      },

      verbose: {
        files: [
          {expand: true, src: ['test/fixtures/**'], dest: 'tmp/transcode_test_verbose/'}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'transcode', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
