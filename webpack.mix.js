let { mix } = require('laravel-mix');

// Globbing
mix.webpackConfig({
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.s[ac]ss$/,
            loader: 'import-glob-loader'
        }]
    }
});

// Configuration
mix.setPublicPath('public');
mix.autoload({
    axios: 'axios',
    lodash: '_'
});

// Mix
mix.react('src/js/app.js', 'public/js/bundle.js')
    .sass('src/scss/style.scss', 'public/css/style.css');
