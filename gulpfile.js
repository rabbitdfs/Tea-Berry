'use strict';

const { src, dest, task, series, watch } = require('gulp')
const less = require('gulp-less');
const path = require('path');
// const watch = require('gulp-watch');

task('less', function () {
    return src('./less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(dest('./css'));
});


// task('stream', function () {
//     return watch('./less/*.less', series('less'))
// });

task('less:watch', function () {
    watch('./less/*.less', series('less'));
});