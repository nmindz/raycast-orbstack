# OrbStack Raycast Extension

Comprehensive OrbStack management extension for Raycast. Control Docker containers, images, Compose projects, Linux machines, and Kubernetes clusters directly from Raycast.

## Features

### Docker Management

- **Manage Containers**: List, start, stop, restart, inspect, and remove Docker containers
- **Manage Images**: Browse Docker images, inspect details, remove images, and create containers from images
- **Manage Compose Projects**: View and control Docker Compose projects with multi-container orchestration
- **Container Details**: View environment variables, ports, commands, and metadata
- **Real-time Updates**: Automatic polling keeps all views up-to-date

### Linux Machine Management

- **List Machines**: View all OrbStack Linux machines with status and architecture
- **Start/Stop/Restart**: Control machine lifecycle with keyboard shortcuts
- **Create Machines**: Spin up new Linux machines with 15 supported distributions (Ubuntu, Debian, Fedora, Arch, Alpine, NixOS, and more)
- **Inspect Machines**: View SSH access commands, network addresses, and file share paths
- **Multi-Architecture**: Support for both ARM64 (Apple Silicon) and x86_64 (Intel/AMD via Rosetta)

### Kubernetes Management

- **Cluster Control**: Start and stop the OrbStack Kubernetes cluster
- **Status Monitoring**: Real-time cluster status with visual indicators
- **kubectl Access**: Direct access to kubectl commands when cluster is running

### App Control

- **Start OrbStack**: Launch the OrbStack application
- **Stop OrbStack**: Gracefully quit the OrbStack application

## Installation

1. Install [OrbStack](https://orbstack.dev/) on macOS
2. Install this extension from the Raycast Store (when published) or build from source

## Requirements

- macOS (OrbStack is macOS-only)
- OrbStack installed and accessible at `/Applications/OrbStack.app`
- `orb` CLI in PATH (installed automatically with OrbStack)

## Commands

### Manage Containers

Browse and control all Docker containers with real-time status updates.

**Actions:**

- Start/Stop/Restart containers
- Inspect container details
- Remove containers
- Copy container ID
- Group containers by state (optional preference)

### Manage Images

View all Docker images with size information and management actions.

**Actions:**

- Inspect image details (environment, entrypoint, command)
- Remove images
- Create containers from images

### Manage Compose Projects

View and control Docker Compose projects.

**Actions:**

- Show all containers in a project
- Start/Stop all containers in a project
- View running/stopped container counts

### Manage Linux Machines

Control OrbStack Linux machines.

**Actions:**

- Start/Stop/Restart machines
- Inspect machine details (SSH access, network address, file share)
- Delete stopped machines

### Create Linux Machine

Spin up a new Linux machine with form-based configuration.

**Options:**

- Machine name (custom or auto-generated)
- Distribution (Ubuntu, Debian, Fedora, Arch, Alpine, NixOS, Alma, CentOS, Rocky, Oracle, openSUSE, Devuan, Gentoo, Kali, Void)
- Architecture (ARM64 or x86_64)

### Manage Kubernetes

Start or stop the OrbStack Kubernetes cluster.

### Start/Stop OrbStack

Launch or quit the OrbStack application.

## Preferences

### Docker Socket Path

Custom path to Docker socket (default: `/var/run/docker.sock`)

OrbStack uses the standard Docker socket, so this typically doesn't need to be changed.

### Group Containers by State

Toggle to group containers by their state (running, exited, etc.) in the container list view.

## OrbStack Features

This extension takes full advantage of OrbStack's unique features:

- **Fast Performance**: OrbStack's lightweight architecture enables real-time updates
- **.orb.local Domains**: All containers automatically get `<name>.orb.local` domain resolution
- **File Sharing**: Linux machines mounted at `/Volumes/<machine-name>`
- **SSH Access**: Direct shell access via `orb shell <machine>`
- **Rosetta Support**: Run x86_64 Linux machines on Apple Silicon

## Keyboard Shortcuts

### Containers

- `Cmd+Shift+R` - Start container
- `Cmd+Shift+W` - Stop container
- `Opt+R` - Restart container
- `Cmd+I` - Inspect container
- `Cmd+Shift+C` - Copy container ID
- `Cmd+Backspace` - Remove container

### Images

- `Cmd+I` - Inspect image
- `Cmd+Backspace` - Remove image
- `Cmd+Shift+C` - Create container from image

### Linux Machines

- `Cmd+Shift+R` - Start machine
- `Cmd+Shift+W` - Stop machine
- `Opt+R` - Restart machine
- `Cmd+I` - Inspect machine
- `Cmd+Backspace` - Delete machine

## Development

### Build from Source

```bash
git clone <repo-url>
cd orbstack
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Architecture

The extension follows the Docker Raycast extension patterns:

- **OrbStack State Hook**: Central hook managing all Docker operations via dockerode
- **CLI Integration**: OrbStack-specific features (machines, Kubernetes) via `orb` CLI
- **Real-time Polling**: 1-second intervals for live status updates
- **Toast Notifications**: Loading/success/failure feedback for all actions
- **Error Detection**: ECONNREFUSED detection with "Launch OrbStack" action

## Contributing

Contributions welcome! Please ensure:

- All code passes `npm run lint`
- All code builds with `npm run build`
- Follow existing patterns for consistency
- Test all commands manually in Raycast

## License

MIT

## Credits

Built by nmindz (@braindeadsec) following the patterns established by the [Docker Raycast Extension](https://github.com/raycast/extensions/tree/main/extensions/docker) by priithaamer.

OrbStack is developed by [OrbStack Inc.](https://orbstack.dev/)
