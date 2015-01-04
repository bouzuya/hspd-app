gulp = require 'gulp'
gutil = require 'gulp-util'
ts = require 'gulp-typescript'

paths =
  appFiles: './app/**/*.ts'
  testFiles: './test/**/*.ts'
  distDir: './dist'
  compiledApp: './.tmp/app/index.js'
  compiledAppFiles: './.tmp/app/**/*.js'
  compiledAppDir: './.tmp/app'
  compiledTestFiles: './.tmp/test/**/*.js'
  compiledTestDir: './.tmp/test'
  coverageDir: './coverage'

typescriptProject = ts.createProject
  declarationFiles: true
  # noExternalResolve: true

typescript = ({ src, dest }) ->
  sourcemaps = require 'gulp-sourcemaps'
  merge = require 'merge-stream'
  compiled = gulp
    .src src
    .pipe ts typescriptProject
  merge(
    compiled.dts.pipe gulp.dest dest
    compiled.js.pipe gulp.dest dest
  )

webpack = (src, dst) ->
  wp = require 'gulp-webpack'
  options =
    output:
      filename: 'main.js'
    resolve:
      extensions: ['', '.js']
  gulp
    .src src
    .pipe wp options
    .pipe gulp.dest dst

gulp.task 'build', (done) ->
  typescript(src: paths.appFiles, dest: paths.compiledAppDir).on 'end', ->
    webpack(paths.compiledApp, paths.distDir).on 'end', done
  null

gulp.task 'clean', (done) ->
  del = require 'del'
  del [
    paths.compiledAppDir
    paths.compiledTestDir
    paths.distDir
  ], done

gulp.task 'deps', ['tsd']

gulp.task 'typescript', ->
  typescript(src: paths.appFiles, dest: paths.compiledAppDir)

gulp.task 'test', (done) ->
  espower = require 'gulp-espower'
  merge = require 'merge-stream'
  mocha = require 'gulp-mocha'
  sourcemaps = require 'gulp-sourcemaps'
  istanbul = require 'gulp-istanbul'

  gulp
    .src paths.appFiles
    .pipe sourcemaps.init()
    .pipe ts typescriptProject
    .js
    .pipe sourcemaps.write()
    .pipe gulp.dest paths.compiledAppDir
    .on 'end', ->
      gulp
        .src paths.compiledAppFiles
        .pipe istanbul(includeUntested: true)
        .pipe istanbul.hookRequire()
        .on 'finish', ->
          gulp
            .src paths.testFiles
            .pipe sourcemaps.init()
            .pipe ts typescriptProject
            .js
            .pipe espower()
            .pipe sourcemaps.write()
            .pipe gulp.dest(paths.compiledTestDir)
            .on 'end', ->
              gulp
                .src paths.compiledTestFiles
                .pipe mocha().on('error', gutil.log)
                .pipe istanbul.writeReports(paths.coverageDir)
                .on 'end', done
  null

gulp.task 'tsd', ->
  tsd = require 'tsd'
  path = require 'path'
  api = new tsd.getAPI(path.resolve(__dirname, 'tsd.json'))
  api.readConfig().then ->
    options = tsd.Options.fromJSON
      overwriteFiles: true
      saveToConfig: false
    api.reinstall options

gulp.task 'watch', ->
  gulp.watch [paths.appFiles, paths.testFiles], ['test']

gulp.task 'webpack', ->
  webpack(paths.compiled, paths.distDir)

gulp.task 'default', ['clean', 'build']