let gulp = require('gulp');
let svgSprite = require('gulp-svg-sprite');
let minifyCSS = require('gulp-minify-css');
let autoprefixer = require('gulp-autoprefixer');
let concat = require('gulp-concat');

gulp.task('sprite', () => 
  gulp.src('assets/icons/**/*.svg')
  .pipe(svgSprite({
    mode: {
      symbol: {
        dest: 'assets/icons/sprite',
        sprite: 'sprite.svg',
        example: false
      },
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false
      }
    }
  }))
  .pipe(gulp.dest('.'))
);

gulp.task('css', () => 
  gulp.src([
    'css/base/reset.css', 
    'css/base/**/*.css',
    'css/**/*.css',
    '!css/style.min.css' 
  ])
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('css'))
);

gulp.task('default', gulp.series('sprite', 'css'));