module.exports = {
    publicPath: './',
    lintOnSave: false,
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'btn-primary-bg': '#57c07c',
                    'btn-primary-color': '#fff',
                    'switch-color': '#57c07c'
                },
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        host: 'localhost',
        port: 10002,
        https: false,
        open: true
    }
};
