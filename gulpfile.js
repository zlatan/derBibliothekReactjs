var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require("vinyl-source-stream");
var babel = require('gulp-babel');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');
var del = require('del');
var shell = require('gulp-shell');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
// webpack config to build and serve examples
var exampleConfig = require('./webpack.config');

var watching = false;
var demo = false;


gulp.task('default', ['prod']);

gulp.task('clean', function() {
  return del([
    './dist/*',
    './lib/**'
  ]);
})

//------------
// EXAMPLES
// -----------
gulp.task('server', function() {

  new WebpackDevServer(webpack(exampleConfig), {
    publicPath: exampleConfig.serverConfig.publicPath,
    contentBase: exampleConfig.serverConfig.contentBase,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true
  }).listen(exampleConfig.serverConfig.port, 'localhost', function(err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3004');
  });

});
