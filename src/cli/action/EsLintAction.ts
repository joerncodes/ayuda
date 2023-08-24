import path from "path";
import fs from "fs";
import PrettierIgnoreTemplate from "../../templates/prettier/PrettierIgnoreTemplate";
import PrettierRcTemplate from "../../templates/prettier/PrettierRcTemplate";
import GitIgnoreWriter from "../../gitignore/GitIgnoreWriter";
import PackageJsonWriter from "../../package-json/PackageJsonWriter";
import EsLintRcTemplate from "../../templates/eslint/EsLintRcTemplate";

export default class EsLintAction {
  async execute(): Promise<void> {
    const destination = process.cwd();

    const gitIgnoreWriter = new GitIgnoreWriter();
    const packageJsonWriter = new PackageJsonWriter();

    [new EsLintRcTemplate()].forEach((file) => {
      const filename = path.join(destination, file.getFilename());
      fs.writeFileSync(filename, file.getContents());

      gitIgnoreWriter.add(file.getFilename());
    });

    const promises: Promise<any>[] = [];
    [
      "eslint",
      "@typescript-eslint/eslint-plugin",
      "eslint-plugin-import",
      "eslint-plugin-prettier",
      "@types/eslint",
      "eslint-config-prettier",
    ].forEach((packageName) => {
      promises.push(
        packageJsonWriter.addDependency({
          packageName,
          dev: true,
        })
      );
    });
    await Promise.all(promises);

    packageJsonWriter.addScript({
      key: "eslint:fix",
      command: "eslint --fix",
    });

    await gitIgnoreWriter.write();
    await packageJsonWriter.write();
  }
}
