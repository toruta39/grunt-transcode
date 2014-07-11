# grunt-transcode

> A file encoding converter that really works! 

Supporting many encodings, including multi-byte such as Shift_JIS, EUC-JP, GB2312, GBK, GB18030, KS_C_5601, Big5, Big5-HKSCS, etc.

A full list of supported encodings can be referred from [iconv-lite](https://github.com/ashtuchkin/iconv-lite)'s wiki:  
<https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings>

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-transcode --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-transcode');
```

## The "transcode" task

### Overview
In your project's Gruntfile, add a section named `transcode` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  transcode: {
    options: {
      fromEncoding: 'sjis', // Source file encoding
      toEncoding: 'utf8' // Target file encoding
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.fromEncoding
Type: `String`
Default value: `'utf8'`

A string value that suggests the source file encoding.

#### options.toEncoding
Type: `String`
Default value: `'utf8'`

A string value that suggests the target file encoding.

### Usage Examples

#### Simple file list

In this example, a GBK file is converted to UTF-8 with an assgined filename.

```js
grunt.initConfig({
  transcode: {
    sjis: {
      options: {
        fromEncoding: 'gbk',
        toEncoding: 'utf8'
      },
      files: {
        'js/templates.utf8.js': ['js/templates.gbk.js']
      }
    }
  }
})
```

#### Expanded file list

In this example, JavaScript files with `.utf8` suffix are converted to Shift-JIS with `.sjis` suffix.

```js
grunt.initConfig({
  transcode: {
    js: {
      options: {
        fromEncoding: 'utf8',
        toEncoding: 'sjis'
      },
      files: [{
        expand: true,
        cwd: 'js/',
        src: '**/*.utf8.js',
        dest: 'js/',
        ext: '.sjis.js'
      }]
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Joshua Zhang. Licensed under the MIT license.
