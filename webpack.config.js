const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const env = process.env.NODE_ENV || 'development';

const getPlugins = function () {
    return [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, env == 'production' ? 'app/index.tpl.html' : 'app/index-dev.tpl.html'),
            inject: 'body',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'app/assets/',
                to: 'assets/'
            }
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity,
            filename: 'assets/common-[chunkhash].js'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(env)}
        }),
        new ExtractTextPlugin({filename: 'assets/[name]-[chunkhash].css', disable: false, allChunks: true})];
};


const getEntry = function () {
    return {
        common: ['react', 'react-addons-create-fragment', 'react-bootstrap-daterangepicker', 'react-breadcrumbs', 'react-dom', 'react-dropzone', 'react-highcharts', 'react-intl', 'react-modal', 'react-paginate', 'react-redux', 'react-router', 'react-router-redux', 'jquery'],
        app: ['babel-polyfill', path.join(__dirname, 'app/index.js')]
    }
};

const getLoaders = function (isDev) {
    return [
        {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                plugins: [
                    'transform-runtime',
                    'add-module-exports',
                    'transform-decorators-legacy',
                    'babel-plugin-transform-strict-mode'
                ],
                presets: ['es2015', 'react', 'stage-0']
            }
        },
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.css|scss$/, loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})},
        {test: /\.(ttf|eot)/, loader: 'file-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}},
        {test: /\.(woff|woff2)/, loader: 'url-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}},
        {
            test: /\.(png|jpg|jpeg|gif|svg)/,
            loader: 'url-loader',
            query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}
        }
    ];
};

module.exports = {
    name: 'app',
    devtool: false,
    entry: getEntry(),
    output: {
        path: path.join(__dirname, 'public/'),
        filename: 'assets/[name]-[chunkhash].js',
        publicPath: '/',
        hotUpdateChunkFilename: "[id].hot-update.js",
        hotUpdateMainFilename: "hot-update.json"
    },
    module: {
        loaders: getLoaders()
    },
    resolve: {
        modules: [path.resolve(__dirname, "app"), "node_modules"],
        extensions: ['.json', '.js', '.jsx']
    },
    plugins: getPlugins(),
    target: 'web'
};
