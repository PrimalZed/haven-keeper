const CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
  plugins:[
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
      filename: '[path][base].gz'
    }),
    new CompressionPlugin({
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
      filename: '[path][base].br'
    })
  ]
};
