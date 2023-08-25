import semverInc from "semver/functions/inc";
import { prompt } from "enquirer";
import { ReleaseType } from "semver";
import chalk from "chalk";
import PackageJsonProcessor from "package-json-processor/PackageJsonProcessor";

export default class IncreaseVersionAction {
  async execute(): Promise<void> {
    const packageJsonProcessor = new PackageJsonProcessor();
    const { version } = packageJsonProcessor.getPackageJsonObject();

    console.log(`Your current version is ${chalk.bold(version)}.\n`);

    const { releaseType } = (await prompt({
      type: "select",
      name: "releaseType",
      message: "Which release type?",
      choices: [
        {
          name: "major",
          value: "major",
          message: "major (API-breaking changes)",
        },
        { name: "premajor", value: "premajor" },
        {
          name: "minor",
          value: "minor",
          message: "minor (changes that are backwards-compatible)",
        },
        { name: "preminor", value: "preminor" },
        {
          name: "patch",
          value: "patch",
          message: "patch (backwards-compatible bug-changes)",
        },
        { name: "prepatch", value: "prepatch" },
        { name: "prerelease", value: "prerelease" },
      ],
    })) as { releaseType: string };

    const updated = semverInc(version, releaseType as ReleaseType) as string;

    console.log(`\nUpdated package version to ${chalk.bold(updated)}.\n`);

    packageJsonProcessor.setVersion(updated).save();
  }
}
