module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  rules: {
    "no-undef": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "test.{ts,tsx}", // repos with a single test file
          "test-*.{ts,tsx}", // repos with multiple top-level test files
          "**/*{.,_}{test,spec}.{ts,tsx}", // tests where the extension or filename suffix denotes that it is a test
          "**/jest.config.ts", // jest config
          "**/jest.setup.ts", // jest setup
        ],
        optionalDependencies: false,
      },
    ],
  },
};
