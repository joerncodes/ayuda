import { Command, ParseOptions } from "commander";
import chalk from "chalk";
import PrettierAction from "./action/PrettierAction";
import IncreaseVersionAction from "./action/IncreaseVersionAction";

export default class AyudaCommand extends Command {
  constructor() {
    super();
    this.name("ayuda").argument("<command>", "The command to run");
    this.prettierCommand();
    this.packageCommand();
  }

  run(argv?: readonly string[], options?: ParseOptions): this {
    console.log(chalk.bold.yellow("¡Ayuda!\n"));
    return super.parse(argv, options);
  }

  private done(): void {
      console.log(chalk.bold("🚀 Done!"));
  }

  private packageCommand(): void {
    this
      .command("package")
      .argument("<subcommand>")
      .action(async (subcommand: string) => {
      console.log(`Increasing ${chalk.bold("package version")}.\n`);

      switch(subcommand) {
        case "increase-version":
          await new IncreaseVersionAction().execute();
          break;
        default:
          throw new Error(`Unknown subcommand: ${subcommand}.`);
      }

      return this.done();

    });

  }

  private prettierCommand(): void {
    this.command("prettier").action(async () => {
      console.log(`Setting up ${chalk.bold("prettier")}.\n`);

      await new PrettierAction().execute();
      this.done();
    });
  }
}
