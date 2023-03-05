module.exports = {
  webpack: {
    configure: (webpackConfig, {env, paths}) => {
      return {
        ...webpackConfig,
        entry: {
          main: [env === 'development' &&
          require.resolve('react-dev-utils/webpackHotDevClient'),paths.appIndexJs].filter(Boolean),
          // content: './src/chromeServices/index2.tsx'
        },
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].js',
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
          minimize: false, // 不要压缩
        },
        // devtool: 'hidden-source-map' // 不要sourcemap
      }
    },
  }
}