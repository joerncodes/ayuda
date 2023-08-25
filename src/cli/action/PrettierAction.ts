import path from "path";
import fs from "fs";
import PrettierIgnoreTemplate from "../../templates/prettier/PrettierIgnoreTemplate";
import PrettierRcTemplate from "../../templates/prettier/PrettierRcTemplate";
import PackageJsonProcessor from "package-json-processor/PackageJsonProcessor";
import { findLatestVersion } from "../../utils/findLatestVersion";

export default class PrettierAction {
  async execute(): Promise<void> {
    const destination = process.cwd();

    const packageJsonProcessor = new PackageJsonProcessor();

    [new PrettierIgnoreTemplate(), new PrettierRcTemplate()].forEach((file) => {
      const filename = path.join(destination, file.getFilename());
      fs.writeFileSync(filename, file.getContents());
    });

    const version = await findLatestVersion("prettier");
    packageJsonProcessor.addDevDependency({
      packageName: "prettier",
      version,
    });

    packageJsonProcessor.addScript({
      key: "prettier",
      command: "prettier --write --ignore-unknown",
    });

    console.log(packageJsonProcessor.getPackageJsonObject());
    await packageJsonProcessor.save();
  }
}
