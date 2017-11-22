import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const getPlugins = function (environment, isDev) {
    return [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index-dev.tpl.html'),
            inject: 'body',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'app/assets/',
                to: '/assets/'
            }
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: isDev
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()];
};

const getEntry = function () {
    return {
        app: [
            'webpack-hot-middleware/client?reload=true',
            'babel-polyfill',
            path.join(__dirname, 'app/index.js')
        ]
    }
};

const getLoaders = function () {
    return [
        {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            include: [
                path.join(__dirname, "app")
            ],
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                plugins: [
                    'transform-runtime',
                    'add-module-exports',
                    'transform-decorators-legacy',
                    'babel-plugin-transform-strict-mode'
                ],
                presets: ['es2015', 'react', 'stage-0', 'react-hmre']
            }
        },
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.(ttf|eot)/, loader: 'file-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 819200}},
        {test: /\.(woff|woff2)/, loader: 'url-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 819200}},
        {
            test: /\.(png|jpg|jpeg|gif|svg)/,
            loader: 'url-loader',
            query: {name: 'assets/[name]-[hash].[ext]', limit: 819200}
        }
    ];
};

export default {
    name: 'app',
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    entry: getEntry(),
    output: {
        path: path.join(__dirname, 'public/'),
        filename: 'assets/[name]-[hash].js',
        publicPath: '/',
        hotUpdateChunkFilename: "[id].hot-update.js",
        hotUpdateMainFilename: "hot-update.json"
    },
    module: {
        loaders: getLoaders()
    },
    resolve: {
        modules: [path.resolve(__dirname, "app"), "node_modules"],
        extensions: ['.json', '.js', '.jsx'],
        unsafeCache: true
    },
    plugins: getPlugins(),
    target: 'web'
};
