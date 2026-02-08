# OrbStack Changelog

## [Initial Version] - {PR_MERGE_DATE}

### Added

#### Docker Management

- **Manage Containers**: List, start, stop, restart, inspect, and remove Docker containers
- **Manage Images**: Browse Docker images with size information, inspect details, remove images
- **Manage Compose Projects**: View and control Docker Compose projects
- **Create Container**: Form-based container creation from images with port/volume/env configuration
- **Container Details**: View environment variables, ports, exposed ports, creation time
- **Image Details**: View image ID, size, OS, architecture, command, entrypoint, environment
- **Real-time Updates**: 1-second polling interval for live status updates
- **Error Handling**: ECONNREFUSED detection with "Launch OrbStack" quick action

#### Linux Machine Management

- **List Machines**: View all OrbStack Linux machines with state, distro, and architecture
- **Start/Stop/Restart Machines**: Full lifecycle control with keyboard shortcuts
- **Create Machine**: Form-based creation with 15 supported distributions
  - Distributions: Ubuntu, Debian, Fedora, Arch, Alpine, NixOS, Alma, CentOS, Rocky, Oracle, openSUSE, Devuan, Gentoo, Kali, Void
  - Architectures: ARM64 (Apple Silicon) and x86_64 (Intel/AMD via Rosetta)
- **Delete Machine**: Remove stopped machines
- **Inspect Machine**: View SSH access, network address (.orb.local), file share path
- **Real-time Status**: Auto-polling for machine state changes

#### Kubernetes Management

- **Start/Stop Cluster**: Control OrbStack Kubernetes cluster lifecycle
- **Status Monitoring**: Real-time cluster status with visual indicators
- **kubectl Access**: Instructions for kubectl when cluster is running

#### App Control

- **Start OrbStack**: Launch OrbStack application via `open -a OrbStack`
- **Stop OrbStack**: Gracefully quit via AppleScript

#### User Experience

- **Toast Notifications**: Loading/success/failure feedback for all actions
- **Keyboard Shortcuts**: Comprehensive shortcuts for all primary actions
- **Visual Indicators**: Green/gray icons for running/stopped states
- **Empty States**: Helpful messages when CLI not installed
- **Grouping**: Optional grouping of containers by state (preference)

#### Technical

- **dockerode Integration**: Official dockerode package for Docker operations
- **OrbStack CLI Integration**: Native `orb` CLI support for machines and Kubernetes
- **TypeScript**: Full type safety with Dockerode types
- **Polling Architecture**: withLoading pattern for state management
- **Error Recovery**: Graceful error handling with user-friendly messages

### Configuration

#### Preferences

- **Docker Socket Path**: Configurable Docker socket (default: `/var/run/docker.sock`)
- **Group Containers by State**: Toggle for container grouping

### Platform

- **macOS Only**: OrbStack is macOS-exclusive
- **Removed Windows Platform**: Cleaned up from original template
