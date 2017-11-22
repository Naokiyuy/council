const gulp = require('gulp');
const argv = require('yargs').argv;
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const yarn = require('gulp-yarn');
const shell = require('gulp-shell');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util');
const git = require('gulp-git');
import manageTranslations from 'react-intl-translations-manager';
import globalsi18n from './app/utils/config/globals.i18n';
import sidebari18n from './app/layout/sidebar/sidebar.i18n';
import fs from 'fs';
import run from 'gulp-run';

gulp.task('archive', ['webpack'], function () {
  return gulp.src(['scminfo.txt', 'public/**', 'server/**', 'server/.babelrc'], {base: '.'})
    .pipe(zip('council.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('archive-without-yarn', ['webpack', 'scm-info'], function () {
  return gulp.src(['scminfo.txt', 'public/**', 'server/**', 'server/.babelrc'], {base: '.'})
    .pipe(zip('council.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('install-root-npm-dependencies', ['clean'], function () {
  return gulp.src(['./package.json', './yarn.lock']).pipe(yarn());
});

gulp.task('fix-bug-on-history-lib', ['install-root-npm-dependencies'], function () {
  return gulp.src(['./app/utils/DOMStateStorage.js'])
    .pipe(gulp.dest('node_modules/history/es6'))
    .pipe(gulp.dest('node_modules/history/lib'))
    .pipe(gulp.dest('node_modules/history/modules'));
});

gulp.task('install-server-npm-dependencies', ['fix-bug-on-history-lib'], function () {
  return gulp.src(['./server/package.json', './server/yarn.lock']).pipe(yarn());
});

gulp.task('webpack', ['scm-info'], shell.task('webpack'));

gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_modules/**', '!server/node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('environment', function () {
  var env = argv.profile || 'production';
  gutil.log('Set process.env.NODE_ENV = ' + env);
  return process.env.NODE_ENV = env;
});

gulp.task('clean', ['environment'], function () {
  return gulp.src(['dist', 'public']).pipe(clean());
});

gulp.task('make-dll', shell.task('webpack --config webpack.config.dll.babel.js'));

gulp.task('default', ['archive']);

gulp.task('extract-i18n', ['clean', 'create-sources-folder', 'extract-i18n-sidebar', 'extract-i18n-global-config'], shell.task('webpack --config webpack.config.i18n.babel.js'));

gulp.task('scm-info', ['install-server-npm-dependencies'], function () {
  git.exec({args: 'log -n 1'}, function(err, stdout) {
    fs.writeFile('./scminfo.txt', stdout);
  });
});

gulp.task('create-sources-folder', function () {
  const path = './app/utils/langs/sources/';
  fs.stat(path, function (err, stats) {
    if (err) {
      console.log(err);
      return;
    }
    if (!stats.isDirectory()) {
      fs.mkdirSync(path);
    }
  });
});

gulp.task('extract-i18n-global-config', function () {
  fs.writeFile('./app/utils/langs/sources/globals-config.i18n.json', JSON.stringify(globalsi18n, null, 2));
});

gulp.task('extract-i18n-sidebar', function () {
  const r = Object.keys(sidebari18n).map(key => {
      return sidebari18n[key];
});
  fs.writeFile('./app/utils/langs/sources/sidebar.i18n.json', JSON.stringify(r, null, 2));
});

gulp.task('i18n', ['extract-i18n'], function () {
  manageTranslations({
    messagesDirectory: 'app/utils/langs/sources',
    translationsDirectory: 'app/utils/langs',
    whitelistsDirectory: 'app/utils/langs/whitelist',
    singleMessagesFile: true,
    languages: ['de_DE', 'fr_FR', 'ja_JP', 'ko_KR', 'pt_BR', 'zh_CN', 'zh_TW'] // any language you need
  });
});
