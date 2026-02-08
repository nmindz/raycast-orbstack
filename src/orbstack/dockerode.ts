import { getPreferenceValues } from "@raycast/api";
import Dockerode from "@priithaamer/dockerode";
import { useMemo } from "react";
import { URL } from "node:url";

export const useDockerode = () => {
  const { socketPath } = getPreferenceValues<{ socketPath?: string }>();
  const protocols = ["http://", "https://", "tcp://"];

  return useMemo(() => {
    if (socketPath && protocols.some((protocol) => socketPath.startsWith(protocol))) {
      const url = new URL(socketPath);
      return new Dockerode({ host: url.hostname, port: url.port || "2375" });
    }
    return new Dockerode(socketPath ? { socketPath } : undefined);
  }, [socketPath]);
};
