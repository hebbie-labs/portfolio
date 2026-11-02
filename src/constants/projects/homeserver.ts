import type { Project } from "@/types/project";

export const HOMESERVER_PROJECT: Project = {
  slug: "homeserver",
  title: "Homeserver",
  summary:
    "Selbst gehosteter Server, auf dem dieses Portfolio und Recur laufen.",
  description: [
    "Mein Homeserver ist ein Docker-Compose-Stack auf eigener Hardware. Darauf laufen dieses Portfolio, Recur mit seiner Postgres-Datenbank, Vaultwarden als Passwort-Manager, ein Minecraft-Server, Portainer zur Verwaltung und ein Homepage-Dashboard. Von aussen ist alles über einen Cloudflare Tunnel erreichbar, ohne dass ich Ports im Heimnetz öffnen muss.",
    "Deployt wird per Git: Ein Push auf den Deploy-Branch löst eine GitHub Action auf einem self-hosted Runner aus, die die Images zieht und den Stack neu startet. Nachts sichert ein Skript die Datenbanken per pg_dump, dazu Konfigurationen und Volumes, und kopiert alles mit rclone auf Proton Drive. Schlägt etwas fehl, meldet es sich per ntfy.",
  ],
  featured: true,
  features: [
    {
      text: "Alles in einem Docker-Compose-Stack, verwaltet mit Portainer",
      view: "Stack",
    },
    {
      text: "Öffentlich erreichbar über Cloudflare Tunnel, ohne offene Ports",
      view: "Tunnel",
    },
    {
      text: "Deployment per Push über einen self-hosted GitHub-Runner",
      view: "Deploy",
    },
    {
      text: "Tägliche Backups von Datenbanken und Konfiguration, inklusive Off-Site-Kopie",
      view: "Backup",
    },
  ],
  views: [
    { label: "Stack" },
    { label: "Tunnel" },
    { label: "Deploy" },
    { label: "Backup" },
  ],
  scene: "homeserver",
};
