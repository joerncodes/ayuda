import IFileTemplate from "../IFileTemplate";

export default class PrettierRcTemplate implements IFileTemplate {
  getFilename(): string {
    return ".prettierrc";
  }
  getContents(): string {
    return JSON.stringify(
      {
        trailingComma: "es5",
        useTabs: false,
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        printWidth: 80,
        plugins: [],
      },
      null,
      2
    );
  }
}
