import IFileTemplate from "../IFileTemplate";

export default class PrettierIgnoreTemplate implements IFileTemplate {
  getFilename(): string {
    return ".prettierignore";
  }
  getContents(): string {
    return `node_modules
dist
.husky
cdk.out`;
  }
}
