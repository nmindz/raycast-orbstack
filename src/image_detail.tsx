import { Detail } from "@raycast/api";
import { useOrbStack } from "./orbstack";
import { useDockerode } from "./orbstack/dockerode";
import { formatImageDetailMarkdown } from "./orbstack/image";

export default function ImageDetail({ imageId }: { imageId: string }) {
  const docker = useDockerode();
  const { useImageInfo } = useOrbStack(docker);
  const { imageInfo, isLoading } = useImageInfo({ Id: imageId });

  return (
    <Detail navigationTitle="Image Details" isLoading={isLoading} markdown={formatImageDetailMarkdown(imageInfo)} />
  );
}
