module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@store': './src/store',
            '@api': './src/api',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@services': './src/services',
            '@app-types': './src/types',
            '@theme': './src/theme',
          },
        },
      ],
    ],
  };
};
