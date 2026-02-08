import { Detail, Color } from "@raycast/api";
import { OrbMachine } from "./orbstack/cli";

export default function MachineDetail({ machine }: { machine: OrbMachine }) {
  const markdown = `# ${machine.name}

## Configuration

**Distribution:** ${machine.distro}

**Architecture:** ${machine.arch}

**State:** ${machine.state}

## Access

To access this machine via SSH:

\`\`\`bash
orb shell ${machine.name}
\`\`\`

Or use the Terminal:

\`\`\`bash
open -a Terminal -n --args orb shell ${machine.name}
\`\`\`

## OrbStack Features

This machine is accessible via:
- SSH: \`orb shell ${machine.name}\`
- File sharing: \`/Volumes/${machine.name}\`
- Network: \`${machine.name}.orb.local\`
`;

  return (
    <Detail
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Name" text={machine.name} />
          <Detail.Metadata.Label title="Distribution" text={machine.distro} />
          <Detail.Metadata.Label title="Architecture" text={machine.arch} />
          <Detail.Metadata.TagList title="Status">
            <Detail.Metadata.TagList.Item
              text={machine.state}
              color={machine.state === "running" ? Color.Green : Color.Yellow}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="SSH Access" text={`orb shell ${machine.name}`} />
          <Detail.Metadata.Label title="Network Address" text={`${machine.name}.orb.local`} />
          <Detail.Metadata.Label title="File Share" text={`/Volumes/${machine.name}`} />
        </Detail.Metadata>
      }
    />
  );
}
