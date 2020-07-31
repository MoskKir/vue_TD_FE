module.exports = {
    chainWebpack: config => {
        config.module
            .rule('bin')
            .test(/\.(bin)$/)
            .use('file-loader')
                .loader('file-loader')
                .end()
        config.module
            .rule('glft')
            .test(/\.(gltf)$/)
            .use('gltf-webpack-loader')
                .loader('gltf-webpack-loader')
                .end()
    }
}