const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
// const imagemin = require('gulp-imagemin');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

function css() {
  return gulp.src('./src/**/*.scss')
    .pipe(
      sass()
        .on('error', handleError)
    )
    .pipe(rename(function (path) {
      path.dirname = '';
      return path;
    }))
    .pipe(gulp.dest('./dist/css'));
}

function cssComponents() {
  return gulp
    .src("./components/**/*.scss")
    .pipe(sass().on("error", handleError))
    .pipe(gulp.dest("./components"));
}

function lintCssComponents() {
  return gulp
    .src("./components/**/*.scss")
    .pipe(
      gulpStylelint({
        reporters: [
          {
            formatter: 'string', console: true
          }
        ],
      })
    );
}

// function compress() {
//   return gulp.src('./src/**/*{.png,.jpg,.svg}')
//     .pipe(imagemin({
//       progressive: true,
//       svgoPlugins: [{
//         removeViewBox: false
//       }]
//     }))
//     .pipe(rename(function (path) {
//       path.dirname = '';
//       return path;
//     }))
//     .pipe(gulp.dest('./dist/assets'));
// }

function lintCss() {
  return gulp.src('./src/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}

function lintJs() {
  return gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
}

exports.watch = function () {
  gulp.watch(["./**/*.scss"], gulp.series(lintCssComponents, cssComponents, css));
};

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
  // lintCss();
  // lintCssComponents();
  lintJs();
  css();
  cssComponents();
  cb();
}

function lint(cb) {
  lintCss();
  lintCssComponents();
  lintJs();
  cb();
}

exports.default = build;
exports.lint = lint;
