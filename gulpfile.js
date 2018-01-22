// ///////////////////////////////////////////////
// Required
// ///////////////////////////////////////////////

let gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require("gulp-sass"),
    // cleanCSS = require('gulp-clean-css'),
    webserver = require('gulp-webserver');

// ///////////////////////////////////////////////
// File move and prefix Task
// ///////////////////////////////////////////////

gulp.task('mover', function() {
  gulp.src(['javascript/game_controller.js', 'javascript/redux_3_7_2.min.js', 'index.html', 'assets/fonts/gochihand/*.ttf', 'assets/sound/music/*.mp3', 'assets/sound/sfx/*.mp3'])
    .pipe(rename({prefix:'xp_webtech_krf_'}))
    .pipe(gulp.dest('build'));
});

// ///////////////////////////////////////////////
// Sass Task
// ///////////////////////////////////////////////

gulp.task('style', function() {
  gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({prefix:'xp_webtech_krf_'}))
    // .pipe(cleanCSS())
    .pipe(gulp.dest('build'));
});

// ///////////////////////////////////////////////
// Webserver task
// ///////////////////////////////////////////////

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
      port: 3000,
      livereload: true,
      open: true,
      fallback: 'xp_webtech_krf_index.html'
    }));
});

// ///////////////////////////////////////////////
// Watch Task
// ///////////////////////////////////////////////

gulp.task('watch', function() {
  gulp.watch([
    'javascript/redux_3_7_2.min.js',
    'javascript/game_controller.js',
    'index.html',
    'assets/sound/music/*.mp3',
    'assets/sound/sfx/*.mp3',
    'assets/fonts/gochihand/*.ttf'],
    ['mover']);
  gulp.watch('scss/**/*.scss', ['style']);
});

// ///////////////////////////////////////////////
// Default Task
// ///////////////////////////////////////////////

gulp.task('default', ['mover', 'style', 'watch', 'webserver']);
