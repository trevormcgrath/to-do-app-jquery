var browserSync = require('browser-sync').create(),
    gulpPath = require('../gulp.config.js').path;

/*================================
    BROSWER SYNC + WATCH TASK
================================*/

module.exports = {
    dep: ['compile:_task'],
    fn: function(gulp, callback) {
        browserSync.init({
            server: gulpPath.src
        });
        //WATCH FOR CHANGES TO SCSS, PUG, HTML AND JS FILES AND RUN BACKUP
        gulp.watch(gulpPath.src + gulpPath.scss + 'main.scss', ['compile:sass']).on('change', browserSync.reload);
        gulp.watch(gulpPath.src + '*.html').on('change', browserSync.reload);
        gulp.watch(gulpPath.src + gulpPath.js + '*.js').on('change', browserSync.reload);
    }
}
