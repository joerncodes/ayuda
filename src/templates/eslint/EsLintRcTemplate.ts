import IFileTemplate from "../IFileTemplate";

export default class EsLintRcTemplate implements IFileTemplate {
  getFilename(): string {
    return ".eslintrc.json";
  }
  getContents(): string {
    return JSON.stringify(
      {
        parser: "@typescript-eslint/parser",
        overrides: [
          {
            files: ["*.ts", "*.tsx"],
            parserOptions: {
              ecmaFeatures: {
                jsx: true,
              },
              ecmaVersion: "latest",
              sourceType: "module",
              project: ["./tsconfig.json"],
            },
            extends: [
              "plugin:import/typescript",
              "plugin:prettier/recommended",
              "eslint:recommended",
              "plugin:@typescript-eslint/recommended",
            ],
            settings: {
              "mdx/codeblocks": true,
            },
            env: {
              es2021: true,
              browser: true,
            },
            rules: {
              "prettier/prettier": "warn",
              quotes: [
                "error",
                "double",
                {
                  avoidEscape: true,
                },
              ],
              "@typescript-eslint/quotes": [
                "error",
                "double",
                {
                  avoidEscape: true,
                },
              ],
              "@typescript-eslint/no-shadow": "off",
              "no-underscore-dangle": "off",
              "class-methods-use-this": "off",
              "@typescript-eslint/no-unused-vars": "warn",
              "@typescript-eslint/no-explicit-any": "off",
              "@typescript-eslint/naming-convention": [
                "warn",
                {
                  selector: "typeProperty",
                  format: [
                    "PascalCase",
                    "UPPER_CASE",
                    "camelCase",
                    "snake_case",
                  ],
                  leadingUnderscore: "allow",
                  trailingUnderscore: "allow",
                },
              ],
              "import/no-extraneous-dependencies": "off",
            },
            plugins: ["@typescript-eslint", "prettier"],
          },
        ],
        extends: [],
      },
      null,
      2
    );
  }
}
