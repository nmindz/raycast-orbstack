import { Action, ActionPanel, Color, Icon, Keyboard, List } from "@raycast/api";
import { useOrbStack } from "./orbstack";
import { useDockerode } from "./orbstack/dockerode";
import { formatBytes, imageTitle } from "./orbstack/image";
import ErrorDetail from "./error_detail";
import ImageDetail from "./image_detail";
import { withToast } from "./ui/toast";
import CreateContainer from "./create_container";

export default function ImageList() {
  const docker = useDockerode();
  const { useImages } = useOrbStack(docker);
  const { images, isLoading, error, removeImage } = useImages();

  if (error) {
    return <ErrorDetail error={error} />;
  }

  return (
    <List isLoading={isLoading}>
      {images?.map((image) => (
        <List.Item
          key={image.Id}
          title={imageTitle(image)}
          icon={{ source: Icon.Box, tintColor: Color.SecondaryText }}
          accessories={[
            {
              text: { value: formatBytes(image.Size) ?? "" },
            },
          ]}
          actions={
            <ActionPanel title={imageTitle(image)}>
              <Action.Push
                title="Inspect"
                icon={{ source: Icon.Binoculars }}
                shortcut={{ modifiers: ["cmd"], key: "i" }}
                target={<ImageDetail imageId={image.Id} />}
              />
              <Action
                title="Remove Image"
                icon={Icon.Trash}
                style={Action.Style.Destructive}
                shortcut={Keyboard.Shortcut.Common.Remove}
                onAction={withToast({
                  action: () => removeImage(image),
                  onStart: () => `Removing image ${imageTitle(image)}`,
                  onSuccess: () => `Image ${imageTitle(image)} removed`,
                  onFailure: ({ message }) => message,
                })}
              />
              <Action.Push
                target={<CreateContainer imageId={image.Id} />}
                title="Create Container"
                icon={{ source: Icon.Plus }}
                shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
