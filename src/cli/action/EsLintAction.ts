import path from "path";
import fs from "fs";
import EsLintRcTemplate from "../../templates/eslint/EsLintRcTemplate";
import PackageJsonProcessor from "package-json-processor/PackageJsonProcessor";
import { findLatestVersion } from "../../utils/findLatestVersion";
import InstallDependenciesAction from "./InstallDependenciesAction";

export default class EsLintAction {
  async execute(): Promise<void> {
    const destination = process.cwd();

    const packageJsonProcessor = new PackageJsonProcessor();

    [new EsLintRcTemplate()].forEach((file) => {
      const filename = path.join(destination, file.getFilename());
      fs.writeFileSync(filename, file.getContents());
    });

    const promises: Promise<any>[] = [];
    [
      "eslint",
      "@typescript-eslint/parser",
      "@typescript-eslint/eslint-plugin",
      "eslint-plugin-import",
      "eslint-plugin-prettier",
      "@types/eslint",
      "eslint-config-prettier",
    ].forEach((packageName) => {
      promises.push(
        new Promise((resolve) => {
          findLatestVersion(packageName).then((version) => {
            packageJsonProcessor.addDevDependency({
              packageName,
              version,
            });
            resolve(true);
          });
        })
      );
    });
    await Promise.all(promises);

    packageJsonProcessor.addScript({
      key: "eslint:fix",
      command: "eslint --fix",
    });

    await packageJsonProcessor.save();
    await new InstallDependenciesAction().execute();
  }
}
