import { json as fetchPackageJson } from "npm-registry-fetch";

export async function findLatestVersion(packageName: string) {
  const packageInfo = (await fetchPackageJson(packageName)) as {
    "dist-tags": { latest: string };
  };
  return packageInfo["dist-tags"].latest;
}
