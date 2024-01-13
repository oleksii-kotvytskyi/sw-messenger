module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    // TODO
    "no-param-reassign": ["error", { props: false }],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        name: "react-redux",
        importNames: ["useSelector", "useDispatch"],
        message:
          "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
      },
    ],
  },
  // overrides: [
  //   {
  //     // feel free to replace with your preferred file pattern - eg. 'src/**/*Slice.ts'
  //     files: ["src/**/*.slice.ts"],
  //     // avoid state param assignment
  //     rules: { "no-param-reassign": ["error", { props: false }] },
  //   },
  // ],
};
