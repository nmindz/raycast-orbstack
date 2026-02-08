import { ActionPanel, Action, Form, useNavigation, showToast, Toast } from "@raycast/api";
import { useState } from "react";
import { createMachine, SUPPORTED_DISTROS } from "./orbstack/cli";

type FormValues = {
  name: string;
  distro: string;
  arch: string;
};

export default function CreateMachine() {
  const [isLoading, setLoading] = useState(false);
  const { pop } = useNavigation();

  async function handleSubmit(values: FormValues) {
    setLoading(true);
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Creating machine...",
    });

    try {
      await createMachine(values.distro, values.name, values.arch as "amd64" | "arm64" | undefined);
      toast.style = Toast.Style.Success;
      toast.title = "Machine created successfully";
      toast.message = `Machine ${values.name} is now running`;
      pop();
    } catch (error) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to create machine";
      toast.message = error instanceof Error ? error.message : String(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      navigationTitle="Create Linux Machine"
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="name"
        title="Machine Name"
        placeholder="my-machine"
        info="Name for your Linux machine"
        autoFocus
      />
      <Form.Dropdown id="distro" title="Distribution" defaultValue="ubuntu" info="Linux distribution to install">
        {SUPPORTED_DISTROS.map((distro) => (
          <Form.Dropdown.Item key={distro} value={distro} title={distro} />
        ))}
      </Form.Dropdown>
      <Form.Dropdown id="arch" title="Architecture" defaultValue="arm64" info="CPU architecture">
        <Form.Dropdown.Item value="arm64" title="ARM64 (Apple Silicon)" />
        <Form.Dropdown.Item value="amd64" title="x86_64 (Intel/AMD)" />
      </Form.Dropdown>
    </Form>
  );
}
