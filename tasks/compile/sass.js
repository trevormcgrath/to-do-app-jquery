var browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpPath = require('../../gulp.config.js').path;

/*================================
    SASS TASK
================================*/
module.exports = function(gulp, callback) {
    return gulp.src(gulpPath.src + gulpPath.scss + 'main.scss')
        //INIT SOURCEMAPS
        .pipe(sourcemaps.init())
        //COMPILE SCSS IF NO ERROR
        .pipe(sass().on('error', sass.logError))
        //WRITE SOURCEMAPS FOR COMPILED SCSS
        .pipe(sourcemaps.write('.'))
        //MOVE COMPILED SCSS TO CSS FOLDER
        .pipe(gulp.dest(gulpPath.src + gulpPath.css))
        //RELOAD SERVER
        .pipe(browserSync.stream());
}
