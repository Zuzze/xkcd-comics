module.exports = {
  devServer: {
    proxy: process.env.PROXY_URL
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
