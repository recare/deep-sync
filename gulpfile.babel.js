import gulp from 'gulp';
import babel from 'gulp-babel';
import path from 'path';


gulp.task('build', function(){
    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest(path.join(__dirname, 'build')));
});