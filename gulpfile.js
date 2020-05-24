var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var clean = require('gulp-clean');
debug = require('gulp-debug');
//Clean All file
gulp.task('clean-scripts', function () {
    return gulp.src(['src/js/*.js','src/css/*.css'], {read: false})
        .pipe(clean());
});

//move js file to src/js
gulp.task('build-js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// compile sass & Inject into broserSync move font awesome css to src/css
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','node_modules/font-awesome/css/font-awesome.min.css', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(debug())
        .pipe(browserSync.stream());
});

//move font folder to Instruction
gulp.task('fonts-awesome', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("src/fonts"));
});

gulp.task('image', function () {
    return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
        .pipe(gulp.dest("src/img"));

});

function reload(done) {
    browserSync.reload();
    done();
}

// Server + watching scss/js files
gulp.task('default', function () {
    browserSync.init({
        notify: false,
        server: "./src"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.parallel('sass'));
    gulp.watch(['js/*.js'], gulp.parallel(reload));
    gulp.watch(['src/*.html']).on('change', browserSync.reload);
});

gulp.task('build', gulp.series('build-js', 'image', 'fonts-awesome', 'sass'));
