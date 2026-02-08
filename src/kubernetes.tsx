import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { checkKubernetesStatus, startKubernetes, stopKubernetes } from "./orbstack/cli";
import { withToast } from "./ui/toast";

export default function Kubernetes() {
  const [isRunning, setRunning] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const status = await checkKubernetesStatus();
        setRunning(status.running);
      } catch (error) {
        console.error("Failed to check Kubernetes status:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <List isLoading={isLoading}>
      <List.Item
        title="Kubernetes Cluster"
        subtitle={isRunning ? "Running" : "Stopped"}
        icon={
          isRunning
            ? { source: Icon.CircleFilled, tintColor: Color.Green }
            : { source: Icon.Circle, tintColor: Color.SecondaryText }
        }
        accessories={[{ text: { value: isRunning ? "Running" : "Stopped" } }]}
        actions={
          <ActionPanel>
            {!isRunning && (
              <Action
                title="Start Kubernetes"
                icon={{ source: Icon.Play, tintColor: Color.PrimaryText }}
                onAction={withToast({
                  action: async () => {
                    await startKubernetes();
                    const status = await checkKubernetesStatus();
                    setRunning(status.running);
                  },
                  onStart: () => "Starting Kubernetes cluster",
                  onSuccess: () => "Kubernetes cluster started",
                  onFailure: ({ message }) => message,
                })}
              />
            )}
            {isRunning && (
              <Action
                title="Stop Kubernetes"
                icon={{ source: Icon.Stop, tintColor: Color.PrimaryText }}
                onAction={withToast({
                  action: async () => {
                    await stopKubernetes();
                    const status = await checkKubernetesStatus();
                    setRunning(status.running);
                  },
                  onStart: () => "Stopping Kubernetes cluster",
                  onSuccess: () => "Kubernetes cluster stopped",
                  onFailure: ({ message }) => message,
                })}
              />
            )}
          </ActionPanel>
        }
      />
      {isRunning && (
        <List.Item
          title="Access Cluster"
          subtitle="kubectl commands available"
          icon={{ source: Icon.Terminal, tintColor: Color.Blue }}
          accessories={[{ text: { value: "Use kubectl to manage resources" } }]}
        />
      )}
    </List>
  );
}
