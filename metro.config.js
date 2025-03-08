const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // 1) Indiquez à Metro d’utiliser react-native-svg-transformer
  config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

  // 2) Retirez l’extension "svg" de la liste des assets
  config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");

  // 3) Ajoutez "svg" à la liste des sources à transformer
  config.resolver.sourceExts.push("svg");

  return config;
})();
