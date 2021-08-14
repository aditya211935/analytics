module.exports = function override(config, env) {
  var newConfig = { ...config };
  newConfig.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          dimensions: true,
          native: false,
          expandProps: "end",
        },
      },
    ],
  });
  return newConfig;
};
