const ZipPlugin = require("zip-webpack-plugin")
// const CopyPlugin = require("copy-webpack-plugin");
const path = require("path")

const config = {
  //what are the entry points to our functions
  entry: {
      main: "./src/health.data.ts",
  },
  //how we want the output
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/"),
    libraryTarget: 'commonjs2',
  },
  target: "node",
  mode: "production",
  optimization: { minimize: false },
}
//finally zip the output directory, ready to deploy
const pluginConfig = {
  plugins: Object.keys(config.entry).map(entryName => {
    return new ZipPlugin({
      path: path.resolve(__dirname, "dist/"),
      filename: entryName,
      extension: "zip",
    })
  }),
}

const webpackConfig = Object.assign(config, pluginConfig)
// webpackConfig.plugins.push(
//   new CopyPlugin({
//     patterns: [{ from: "../../packages/data-store/rds-combined-ca-bundle.pem", to: "administratorService/rds-combined-ca-bundle.pem" }],
//   })
// );

module.exports = webpackConfig