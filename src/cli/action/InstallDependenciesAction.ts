import { prompt } from "enquirer";
import { execSync } from "child_process";
import ora from "ora-classic";

export default class InstallDependenciesAction {
  async execute(): Promise<void> {
    // @todo Preselect autodetected package manager
    const { packageManager } = (await prompt({
      type: "select",
      name: "packageManager",
      message: "Which package manager would you like to use?",
      choices: [
        { name: "yarn", value: "yarn" },
        { name: "npm", value: "npm" },
      ],
    })) as { packageManager: string };

    let command: string;
    switch (packageManager) {
      case "npm":
        command = "npm install";
        break;
      default:
      case "yarn":
        command = "yarn install";
        break;
    }

    const spinner = ora("Installing dependencies...").start();
    const timeOut = setTimeout(() => {
      spinner.color = "yellow";
      spinner.text = "Installing dependencies...";
    }, 100);

    execSync(command, { encoding: "utf-8" });

    spinner.stop();
    clearTimeout(timeOut);
  }
}
