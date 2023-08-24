import path from "path";
import fs from "fs";

export default class GitIgnoreWriter {
  protected gitIgnoreFilename: string;
  protected gitIgnore: string[];

  constructor() {
    this.gitIgnoreFilename = path.join(process.cwd(), ".gitignore");

    if(!fs.existsSync(this.gitIgnoreFilename)) {
      fs.writeFileSync(this.gitIgnoreFilename, "");
    }

    const content = fs.readFileSync(this.gitIgnoreFilename, {
      encoding: "utf-8",
    });
    this.gitIgnore = content.split("\n");
  }
  
  add(line: string): GitIgnoreWriter {
    this.gitIgnore.push(line);

    return this;
  }

  async write(): Promise<GitIgnoreWriter> {
    const content = new Set(this.gitIgnore);
    const uniqueArray = Array.from(content).filter((line) => line.trim().length > 0);

    await fs.writeFileSync(
      this.gitIgnoreFilename,
      Array.from(content).join("\n")
    );
    return this;
  }
}
