import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import ContainerList from "./container_list";
import { useOrbStack } from "./orbstack";
import { ComposeProject } from "./orbstack/compose";
import { isContainerRunning } from "./orbstack/container";
import { useDockerode } from "./orbstack/dockerode";
import ErrorDetail from "./error_detail";
import { withToast } from "./ui/toast";

export default function ProjectsList() {
  const docker = useDockerode();
  const { useProjects } = useOrbStack(docker);
  const { projects, isLoading, error, startProject, stopProject } = useProjects();

  if (error) {
    return <ErrorDetail error={error} />;
  }

  return (
    <List isLoading={isLoading}>
      {projects?.map((project) => (
        <List.Item
          key={project.name}
          icon={{
            source: Icon.AppWindowList,
            tintColor: areAllContainersRunning(project) ? Color.Green : Color.SecondaryText,
          }}
          title={project.name}
          subtitle={projectSubTitle(project)}
          actions={
            <ActionPanel>
              <Action.Push
                title="Show Containers"
                icon={{ source: Icon.Binoculars }}
                target={<ContainerList projectFilter={project.name} />}
              />
              <Action
                title="Start All Containers"
                shortcut={{ modifiers: ["cmd", "shift"], key: "r" }}
                icon={{ source: Icon.Play, tintColor: Color.PrimaryText }}
                onAction={withToast({
                  action: () => startProject(project),
                  onStart: () => `Starting ${project.name}`,
                  onSuccess: () => `Started ${project.name}`,
                  onFailure: ({ message }) => message,
                })}
              />
              <Action
                title="Stop All Containers"
                shortcut={{ modifiers: ["cmd", "shift"], key: "w" }}
                icon={{ source: Icon.Stop, tintColor: Color.PrimaryText }}
                onAction={withToast({
                  action: () => stopProject(project),
                  onStart: () => `Stopping ${project.name}`,
                  onSuccess: () => `Stopped ${project.name}`,
                  onFailure: ({ message }) => message,
                })}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

const projectSubTitle = ({ containers }: ComposeProject) => {
  const runningCount = containers.reduce((memo, item) => (memo += isContainerRunning(item) ? 1 : 0), 0);
  const stoppedCount = containers.length - runningCount;
  return `${runningCount} Running, ${stoppedCount} Stopped`;
};

const areAllContainersRunning = ({ containers }: ComposeProject): boolean => {
  return containers.every(isContainerRunning);
};
