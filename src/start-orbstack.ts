import { showHUD, showToast, Toast } from "@raycast/api";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export default async function main() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Starting OrbStack...",
  });

  try {
    await execFileAsync("open", ["-a", "OrbStack"]);
    toast.style = Toast.Style.Success;
    toast.title = "OrbStack started";
    await showHUD("OrbStack started successfully");
  } catch (error) {
    toast.style = Toast.Style.Failure;
    toast.title = "Failed to start OrbStack";
    toast.message = error instanceof Error ? error.message : String(error);
    await showHUD(`Failed to start OrbStack: ${error instanceof Error ? error.message : String(error)}`);
  }
}
