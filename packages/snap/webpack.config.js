const { default: SnapsWebpackPlugin } = require("@metamask/snaps-webpack-plugin");

const options = {
    stripComments: true,
    eval: true,
    manifestPath: "./snap.manifest.json",
    writeManifest: true,
};

module.exports = {
    plugins: [new SnapsWebpackPlugin(options)],
    module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
