const homelab = {
  title: "Homelab: Enterprise-Style Infrastructure",
  description:
    "A multi-node Proxmox virtualization environment built on enterprise Dell PowerEdge servers, designed like a small enterprise network rather than a pile of Docker containers. Centralized authentication, segmented networking, distributed storage, multi-site VPN connectivity, and documentation-first operations.",
  tech: ["Proxmox", "Ceph", "Linux", "Networking", "Virtualization", "Authentik", "Tailscale", "Docker", "n8n", "Ollama / Local LLMs", "Grafana"],
  github: null,
  live: "https://www.linkedin.com/in/cody-hanna04/",
  images: ["homelab1.webp", "homelab2.webp", "homelab3.webp", "homelab4.webp", "homelab5.webp", "homelab6.webp"],
  problem:
    "Classroom coverage of systems administration only goes so far, and most homelabs stop at 'a server running a few containers.' I wanted an environment that actually mirrors enterprise IT, where identity, networking, storage, monitoring, and operations are designed to work together and scale.",
  solution:
    "Built a multi-node Proxmox cluster with workloads separated into dedicated VMs and LXCs, Ceph for high-availability storage, VLAN-segmented networking with internal DNS/DHCP and PXE deployment, Authentik for centralized authentication, and Tailscale connecting multiple physical sites into one private network. Everything is documented in a self-hosted OpenProject instance.",
  features: [
    "Multi-node Proxmox VE cluster on Dell PowerEdge servers with Ceph distributed storage",
    "VLAN-segmented networking: management, IoT, camera, and trusted-device networks",
    "Centralized identity with Authentik: OIDC/SSO where it fits, local auth where it doesn't",
    "Reverse proxy with a Homepage dashboard fronting all services",
    "Multi-site private networking over Tailscale (home, family properties, rentals)",
    "Frigate NVR camera system with plans for centralized multi-site monitoring",
    "Storj storage node: hands-on lessons in uptime, reputation recovery, and operations",
    "Self-hosted OpenProject as the single source of truth for documentation and tasks",
    "Self-hosted local LLMs (Ollama) for private, offline AI workloads: no data leaving the network",
    "n8n automation pipelines handling scheduled data fetching, aggregation, and GPU-accelerated transcription",
    "Grafana dashboards pulling metrics across the cluster for real-time monitoring and historical analytics",
    "Home Assistant, Immich, and Jellyfin rounding out the self-hosted family services, alongside a planned Windows Server / Active Directory domain",
  ],
  impact:
    "The lab has become a learning platform that mirrors a real IT department: virtualization, identity management, network segmentation, distributed storage, monitoring, automation, and documentation, all skills that transfer directly to systems engineering and DevOps work. Running local LLMs and n8n automation pipelines on top of it has also turned the lab into a hands-on sandbox for practical AI and data-fetching workflows, without sending any data off-network. It also hosts services my family and I genuinely use every day.",
};

export default homelab;
