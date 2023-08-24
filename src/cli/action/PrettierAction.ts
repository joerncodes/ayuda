import path from "path";
import fs from "fs";
import PrettierIgnoreTemplate from "../../templates/prettier/PrettierIgnoreTemplate";
import PrettierRcTemplate from "../../templates/prettier/PrettierRcTemplate";
import GitIgnoreWriter from "../../gitignore/GitIgnoreWriter";
import PackageJsonManager from "../../package-json/PackageJsonManager";

export default class PrettierAction {
  async execute(): Promise<void> {
    const destination = process.cwd();

    const packageJsonManager = new PackageJsonManager();

    [new PrettierIgnoreTemplate(), new PrettierRcTemplate()].forEach((file) => {
      const filename = path.join(destination, file.getFilename());
      fs.writeFileSync(filename, file.getContents());
    });

    await packageJsonManager.addDependency({
      packageName: "prettier",
      dev: true,
    });
    packageJsonManager.addScript({
      key: "prettier",
      command: "prettier --write --ignore-unknown",
    });

    await packageJsonManager.write();
  }
}
