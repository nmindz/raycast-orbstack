import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export interface OrbMachine {
  name: string;
  state: "running" | "stopped" | string;
  distro: string;
  arch: "arm64" | "amd64";
}

export interface OrbKubernetesStatus {
  running: boolean;
}

export const checkOrbInstalled = async (): Promise<boolean> => {
  try {
    await execFileAsync("which", ["orb"]);
    return true;
  } catch {
    return false;
  }
};

export const listMachines = async (): Promise<OrbMachine[]> => {
  try {
    const { stdout } = await execFileAsync("orb", ["list", "--format", "json"]);
    return JSON.parse(stdout) as OrbMachine[];
  } catch (error) {
    throw new Error(`Failed to list machines: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const startMachine = async (name: string): Promise<void> => {
  try {
    await execFileAsync("orb", ["start", name]);
  } catch (error) {
    throw new Error(`Failed to start machine: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const stopMachine = async (name: string): Promise<void> => {
  try {
    await execFileAsync("orb", ["stop", name]);
  } catch (error) {
    throw new Error(`Failed to stop machine: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const restartMachine = async (name: string): Promise<void> => {
  try {
    await execFileAsync("orb", ["restart", name]);
  } catch (error) {
    throw new Error(`Failed to restart machine: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const deleteMachine = async (name: string): Promise<void> => {
  try {
    await execFileAsync("orb", ["delete", name]);
  } catch (error) {
    throw new Error(`Failed to delete machine: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const createMachine = async (distro: string, name: string, arch?: "amd64" | "arm64"): Promise<void> => {
  try {
    const args = ["create"];
    if (arch === "amd64") {
      args.push("--arch", "amd64");
    }
    args.push(distro, name);
    await execFileAsync("orb", args);
  } catch (error) {
    throw new Error(`Failed to create machine: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const checkKubernetesStatus = async (): Promise<OrbKubernetesStatus> => {
  try {
    const { stdout } = await execFileAsync("orb", ["list", "--format", "json"]);
    const machines = JSON.parse(stdout) as OrbMachine[];
    const k8s = machines.find((m) => m.name === "k8s");
    return { running: k8s?.state === "running" };
  } catch {
    return { running: false };
  }
};

export const startKubernetes = async (): Promise<void> => {
  try {
    await execFileAsync("orb", ["start", "k8s"]);
  } catch (error) {
    throw new Error(`Failed to start Kubernetes: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const stopKubernetes = async (): Promise<void> => {
  try {
    await execFileAsync("orb", ["stop", "k8s"]);
  } catch (error) {
    throw new Error(`Failed to stop Kubernetes: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const SUPPORTED_DISTROS = [
  "ubuntu",
  "debian",
  "fedora",
  "arch",
  "alpine",
  "nixos",
  "alma",
  "centos",
  "rocky",
  "oracle",
  "opensuse",
  "devuan",
  "gentoo",
  "kali",
  "void",
] as const;

export type SupportedDistro = (typeof SUPPORTED_DISTROS)[number];
