import path from "path";
import fs from "fs";
import TDependency from "../types/TDependency";
import TScript from "../types/TScript";
import { json as fetchPackageJson } from "npm-registry-fetch";

export default class PackageJsonWriter {
  protected packageJsonFilename: string;
  protected packageJson: any;

  constructor() {
    this.packageJsonFilename = path.join(process.cwd(), "package.json");
    const content = fs.readFileSync(this.packageJsonFilename, {
      encoding: "utf-8",
    });
    this.packageJson = JSON.parse(content);
  }

  setVersion(version: string): PackageJsonWriter {
    this.packageJson.version = version;

    return this;
  }

  getPackageJson(): any {
    return this.packageJson;
  }

  async addDependency(dependency: TDependency): Promise<PackageJsonWriter> {
    if (typeof this.packageJson.dependencies === "undefined") {
      this.packageJson.dependencies = {};
    }
    if (typeof this.packageJson.devDependencies === "undefined") {
      this.packageJson.devDependencies = {};
    }

    const packageInfo = (await fetchPackageJson(dependency.packageName)) as {
      "dist-tags": { latest: string };
    };
    const latestVersion = packageInfo["dist-tags"].latest;

    if (dependency.dev) {
      this.packageJson.devDependencies[dependency.packageName] = latestVersion;
    } else {
      this.packageJson.dependencies[dependency.packageName] = latestVersion;
    }

    return this;
  }

  addScript(script: TScript): PackageJsonWriter {
    if (!this.packageJson.scripts) {
      this.packageJson.scripts = {};
    }

    const { key, command } = script;
    this.packageJson.scripts[key] = command;

    return this;
  }

  async write(): Promise<PackageJsonWriter> {
    await fs.writeFileSync(
      this.packageJsonFilename,
      JSON.stringify(this.packageJson, null, 2)
    );
    return this;
  }
}
