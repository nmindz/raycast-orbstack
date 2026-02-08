import { Action, ActionPanel, Color, Icon, Keyboard, List } from "@raycast/api";
import { useEffect, useRef, useState } from "react";
import {
  checkOrbInstalled,
  listMachines,
  OrbMachine,
  startMachine,
  stopMachine,
  restartMachine,
  deleteMachine,
} from "./orbstack/cli";
import { withToast } from "./ui/toast";
import MachineDetail from "./machine_detail";

export default function MachineList() {
  const [machines, setMachines] = useState<OrbMachine[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const interval = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    async function fetchMachines() {
      try {
        const installed = await checkOrbInstalled();
        if (!installed) {
          setError("OrbStack CLI (orb) not found in PATH. Please install OrbStack.");
          setLoading(false);
          return;
        }

        const machines = await listMachines();
        setMachines(machines);
        setError(undefined);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMachines();
    interval.current = setInterval(fetchMachines, 1000);

    return () => interval.current && clearInterval(interval.current);
  }, []);

  if (error) {
    return <List.EmptyView title="Error" description={error} icon={Icon.ExclamationMark} />;
  }

  return (
    <List isLoading={isLoading}>
      {machines.map((machine) => (
        <List.Item
          key={machine.name}
          title={machine.name}
          subtitle={`${machine.distro} (${machine.arch})`}
          icon={
            machine.state === "running"
              ? { source: Icon.CircleFilled, tintColor: Color.Green }
              : { source: Icon.Circle, tintColor: Color.SecondaryText }
          }
          accessories={[{ text: { value: machine.state } }]}
          actions={
            <ActionPanel>
              {machine.state === "running" && (
                <Action
                  title="Stop Machine"
                  shortcut={{ modifiers: ["cmd", "shift"], key: "w" }}
                  icon={{ source: Icon.Stop, tintColor: Color.PrimaryText }}
                  onAction={withToast({
                    action: async () => {
                      await stopMachine(machine.name);
                      const machines = await listMachines();
                      setMachines(machines);
                    },
                    onStart: () => `Stopping machine ${machine.name}`,
                    onSuccess: () => `Machine ${machine.name} stopped`,
                    onFailure: ({ message }) => message,
                  })}
                />
              )}
              {machine.state === "running" && (
                <Action
                  title="Restart Machine"
                  icon={Icon.ArrowClockwise}
                  shortcut={{ modifiers: ["opt"], key: "r" }}
                  onAction={withToast({
                    action: async () => {
                      await restartMachine(machine.name);
                      const machines = await listMachines();
                      setMachines(machines);
                    },
                    onStart: () => `Restarting machine ${machine.name}`,
                    onSuccess: () => `Machine ${machine.name} restarted`,
                    onFailure: ({ message }) => message,
                  })}
                />
              )}
              {machine.state !== "running" && (
                <Action
                  title="Start Machine"
                  shortcut={{ modifiers: ["cmd", "shift"], key: "r" }}
                  icon={{ source: Icon.Play, tintColor: Color.PrimaryText }}
                  onAction={withToast({
                    action: async () => {
                      await startMachine(machine.name);
                      const machines = await listMachines();
                      setMachines(machines);
                    },
                    onStart: () => `Starting machine ${machine.name}`,
                    onSuccess: () => `Machine ${machine.name} started`,
                    onFailure: ({ message }) => message,
                  })}
                />
              )}
              <Action.Push
                title="Inspect"
                icon={{ source: Icon.Binoculars }}
                shortcut={{ modifiers: ["cmd"], key: "i" }}
                target={<MachineDetail machine={machine} />}
              />
              {machine.state !== "running" && (
                <Action
                  title="Delete Machine"
                  icon={Icon.Trash}
                  style={Action.Style.Destructive}
                  shortcut={Keyboard.Shortcut.Common.Remove}
                  onAction={withToast({
                    action: async () => {
                      await deleteMachine(machine.name);
                      const machines = await listMachines();
                      setMachines(machines);
                    },
                    onStart: () => `Deleting machine ${machine.name}`,
                    onSuccess: () => `Machine ${machine.name} deleted`,
                    onFailure: ({ message }) => message,
                  })}
                />
              )}
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
