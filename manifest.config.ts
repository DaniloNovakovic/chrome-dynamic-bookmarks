import sourceManifest from "./public/manifest.json";
import packageJson from "./package.json";

export const createManifest = () => ({
  ...sourceManifest,
  description: packageJson.description,
  version: packageJson.version,
});

export default createManifest;
