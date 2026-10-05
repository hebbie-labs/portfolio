import type { Project } from "@/constants/projects";

export const HOMESERVER_PROJECT: Project = {
  slug: "homeserver",
  title: "Homeserver",
  summary: "Selbst gehosteter Server, auf dem dieses Portfolio und Recur laufen.",
  description: [
    "Mein Homeserver ist ein Docker-Compose-Stack auf eigener Hardware. Darauf laufen dieses Portfolio, Recur, Portainer zur Verwaltung und ein Homepage-Dashboard. Von aussen ist alles über einen Cloudflare Tunnel erreichbar, ohne dass ich Ports im Heimnetz öffnen muss.",
    "Deployt wird per Git: Ein Push auf den Deploy-Branch löst eine GitHub Action auf einem self-hosted Runner aus, die die Images zieht und den Stack neu startet. Nachts sichert ein Skript die Datenbanken und Konfigurationen und kopiert sie zusätzlich in eine Cloud ausserhalb des Servers.",
  ],
  featured: true,
  features: [
    { text: "Alles in einem Docker-Compose-Stack, verwaltet mit Portainer" },
    { text: "Öffentlich erreichbar über Cloudflare Tunnel, ohne offene Ports" },
    { text: "Deployment per Push über einen self-hosted GitHub-Runner" },
    { text: "Tägliche Backups von Datenbanken und Konfiguration, inklusive Off-Site-Kopie" },
  ],
  views: [{ label: "Ansicht 1" }],
};
