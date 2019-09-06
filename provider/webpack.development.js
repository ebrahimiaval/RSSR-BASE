const
    webpack = require('webpack'),
    Dotenv = require('dotenv-webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    c = require('./setup/constant');


//?quiet=true
module.exports = [
    //---------------- client ----------------//
    {
        name: 'client',
        mode: 'development',
        target: 'web',
        devtool: 'source-map',
        entry: ['webpack-hot-middleware/client?name=client&reload=true', c.PATH_CLIENT],
        output: {
            filename: c.NAME_CLIENT,
            publicPath: c.ROUTE_DIST,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        "babel-loader",
                        "eslint-loader"
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: 'css-hot-loader?cssModule=true',
                        },
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[local]__[hash:base64:5]',
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [c.PATH_SCSS]
                            }
                        }
                    ]
                },
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                }
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            new Dotenv({systemvars: true}),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.IgnorePlugin(/async-local-storage/)
        ]
    },

    //---------------- server ----------------//
    {
        name: 'server',
        mode: 'development',
        target: 'node',
        devtool: 'source-map',
        entry: ['webpack-hot-middleware/client?name=server&reload=true', c.PATH_SERVER],
        output: {
            filename: c.NAME_SERVER,
            libraryTarget: 'commonjs2',
            publicPath: c.ROUTE_DIST,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        "babel-loader",
                        "eslint-loader"
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: 'isomorphic-style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[local]__[hash:base64:5]',
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [c.PATH_SCSS]
                            }
                        }
                    ]
                }
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
];
