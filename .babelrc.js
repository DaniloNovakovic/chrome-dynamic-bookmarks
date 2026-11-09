const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        chrome: "120",
        node: "24",
      },
    },
  ],
  ["@babel/preset-react", { runtime: "automatic" }],
  "@babel/preset-typescript",
];

module.exports = { presets };
