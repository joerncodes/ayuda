import path from "path";
import fs from "fs";
import PrettierIgnoreTemplate from "../../templates/prettier/PrettierIgnoreTemplate";
import PrettierRcTemplate from "../../templates/prettier/PrettierRcTemplate";
import GitIgnoreWriter from "../../gitignore/GitIgnoreWriter";
import PackageJsonWriter from "../../package-json/PackageJsonWriter";

export default class PrettierAction {
  async execute(): Promise<void> {
    const destination = process.cwd();

    const gitIgnoreWriter = new GitIgnoreWriter();
    const packageJsonWriter = new PackageJsonWriter();

    [new PrettierIgnoreTemplate(), new PrettierRcTemplate()].forEach((file) => {
      const filename = path.join(destination, file.getFilename());
      fs.writeFileSync(filename, file.getContents());

      gitIgnoreWriter.add(file.getFilename());
    });

    await packageJsonWriter.addDependency({
      packageName: "prettier",
      dev: true,
    });
    packageJsonWriter.addScript({
      key: "prettier",
      command: "prettier --write --ignore-unknown",
    });

    await gitIgnoreWriter.write();
    await packageJsonWriter.write();

  }
}
