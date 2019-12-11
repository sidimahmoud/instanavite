let mix = require('laravel-mix');
const webpackConfig = require('./webpack.config')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public');
mix.js('src/js/app.js', 'js');
mix.sass('src/scss/app.scss', 'css');

// Run only if in development environment.
if (!mix.inProduction()) {
    mix.sourceMaps();
}
mix.options({
    hmrOptions: {
        host: 'localhost',
        port: '8080'
    }
});

mix.webpackConfig(webpackConfig);
