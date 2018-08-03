//****************************************
// Enter external name of the package here

var packageName = 'CustomCards';

//****************************************


var fs     = require('fs');
var path   = require('path');
var gulp   = require('gulp');
var gutil  = require('gulp-util');
var less  = require('gulp-less');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var browserifyGulp = require('gulp-browserify');
var rename = require('gulp-rename');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

////////////////////////
var sources = 'modules/**/*';
var root = 'modules/';
var nlsFile = 'nls/react-modules/messages-en.json';
var lessFile = 'modules/Modules.less';
var srcFile = 'modules/Modules.jsx';
var destFile = packageName + '.js';
var destJSFolder = 'public/js/';
var destCSSFolder = 'public/css/';
var destResFolder = 'public/resources';
var destNLSFolder = 'public/nls/react-modules/';

function getModuleFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

var customOpts = {
  standalone: packageName,
  cache: {}, // required for watchify
  packageCache: {}, // required for watchify
  fullPaths: true // required to be true only for watchify
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify('./'+srcFile,opts));

gulp.task('rebundle-js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle);
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(destFile))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(destJSFolder));
}

function buildJS() {
  gutil.log("Compiling: " + srcFile);
  return gulp.src(srcFile)
      .pipe(browserifyGulp({
        standalone: packageName
      }))
    .on('error', function(e) { console.log(e) })
      .pipe(rename(destFile))
      .pipe(gulp.dest(destJSFolder));
}
gulp.task('build-js', function() {
  return buildJS();
});

function buildResources() {
  gutil.log("Building resources");
  var folders = getModuleFolders(root);
  for (var i in folders) {
    folders[i] = "components/" + folders[i] + "/resources/**/*";
  }
  return gulp
        .src(folders)
        .pipe(gulp.dest(destResFolder));
}
gulp.task('build-res', function() {
  return buildResources();
});

function buildCSS() {
  gutil.log("Compiling: " + lessFile);
  return gulp.src(lessFile)
    .pipe(less())
    .pipe(rename(packageName + '.css'))
    .pipe(gulp.dest(destCSSFolder))
}
gulp.task('build-css', function() {
  return buildCSS();
});

function buildNLS() {
  gutil.log("Exporting: " + nlsFile);
  return gulp.src(nlsFile)
    .pipe(gulp.dest(destNLSFolder))
}
gulp.task('build-nls', function() {
  return buildNLS();
});

gulp.task('compress-js',['build-js'], function() {
  return gulp.src('public/js/' + destFile)
     .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch(sources + '.js', ['rebundle-js']);
  gulp.watch(sources + '.jsx', ['rebundle-js']);
  gulp.watch(sources + '.json', ['rebundle-js']);
  gulp.watch(nlsFile, ['build-nls']);
  gulp.watch(sources + '.less', ['build-css']);
});

gulp.task('default', ['rebundle-js', 'build-res', 'build-css', 'build-nls','watch']);
