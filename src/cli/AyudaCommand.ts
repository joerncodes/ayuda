import { Command, ParseOptions } from "commander";
import chalk from "chalk";
import PrettierAction from "./action/PrettierAction";

export default class AyudaCommand extends Command {
  constructor() {
    super();
    this.name("ayuda").argument("<command>", "The command to run");
    this.prettierCommand();
  }

  run(argv?: readonly string[], options?: ParseOptions): this {
    console.log(chalk.bold.yellow("¡Ayuda!\n"));
    return super.parse(argv, options);
  }

  private prettierCommand(): void {
    this.command("prettier").action(async () => {
      console.log(`Setting up ${chalk.bold("prettier")}.\n`);

      await new PrettierAction().execute();
      console.log(chalk.bold("🚀 Done!"));
    });
  }
}
