import { showHUD, showToast, Toast } from "@raycast/api";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export default async function main() {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Stopping OrbStack...",
  });

  try {
    await execFileAsync("osascript", ["-e", 'quit app "OrbStack"']);
    toast.style = Toast.Style.Success;
    toast.title = "OrbStack stopped";
    await showHUD("OrbStack stopped successfully");
  } catch (error) {
    toast.style = Toast.Style.Failure;
    toast.title = "Failed to stop OrbStack";
    toast.message = error instanceof Error ? error.message : String(error);
    await showHUD(`Failed to stop OrbStack: ${error instanceof Error ? error.message : String(error)}`);
  }
}
