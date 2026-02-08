import { Action, ActionPanel, Application, Detail, getApplications } from "@raycast/api";
import { useEffect, useState } from "react";
import { isConnrefusedError } from "./orbstack/error";

export default function ErrorDetail({ error }: { error: Error }) {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    async function fetchApplications() {
      const applications = await getApplications();
      setApplications(applications);
    }
    fetchApplications();
  }, []);

  const orbstackInstallation = applications.find(({ bundleId }) => bundleId === "com.OrbStack");

  return (
    <Detail
      markdown={errorMessage(error)}
      actions={
        isConnrefusedError(error) && orbstackInstallation !== undefined ? (
          <ActionPanel>
            <Action.Open title="Launch OrbStack" target={orbstackInstallation.path} />
          </ActionPanel>
        ) : null
      }
    />
  );
}

const errorMessage = (error: Error) => {
  const errorDetails = "Error message:" + "\n\n```\n" + error.message + "\n```";

  if (isConnrefusedError(error)) {
    return ["## ⚠️ Error connecting to OrbStack", errorDetails].join("\n");
  }

  return `## An Error Occurred:\n\n${errorDetails}`;
};
