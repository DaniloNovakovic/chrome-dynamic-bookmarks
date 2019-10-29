const buildValidations = require("./build-utils/build-validations");
const commonConfig = require("./build-utils/webpack.common");

const webpackMerge = require("webpack-merge");

// We can include Webpack plugins, through addons, that do
// not need to run every time we are developing.
// We will see an example when we set up 'Bundle Analyzer'
const addons = (/* string | string[] */ addonsArg) => {
  // Normalize array of addons (flatten)
  let addons = [...[addonsArg]].filter(Boolean); // If addons is undefined, filter it out

  return addons.map(addonName =>
    require(`./build-utils/addons/webpack.${addonName}.js`)
  );
};

// 'env' will contain the environment variable from 'scripts'
// section in 'package.json'.
// console.log(env); => { env: 'dev' }
module.exports = env => {
  //console.log(env);

  // We use 'buildValidations' to check for the 'env' flag
  if (!env) {
    throw new Error(buildValidations.ERR_NO_ENV_FLAG);
  }

  // Select which Webpack configuration to use; development
  // or production
  // console.log(env.env); => dev
  const envConfig = require(`./build-utils/webpack.${env.env}.js`);

  // 'webpack-merge' will combine our shared configurations, the
  // environment specific configurations and any addons we are
  // including
  const mergedConfig = webpackMerge(
    commonConfig,
    envConfig,
    ...addons(env.addons)
  );

  // Then return the final configuration for Webpack
  return mergedConfig;
};
