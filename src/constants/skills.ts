import type { ComponentType } from "react";
import {
  AppleLight,
  ClaudeAI,
  Docker,
  Git,
  GitHubLight,
  Java,
  NextJs,
  PostgreSQL,
  React,
  ShadcnUI,
  Spring,
  TailwindCSS,
  TypeScript,
  VisualStudioCode,
} from "developer-icons";

type Icon = ComponentType<{ size?: number }>;

/**
 * Icons for the cloud on the about page. To add one, import it from `developer-icons` above and add it here.
 * Both themes have a dark background, so GitHub and Apple use their light variants.
 */
/** Text alternative for the whole cloud (it shows icons only). */
export const SKILLS_LABEL =
  "Icon-Wolke mit den Technologien, mit denen ich arbeite";

export const SKILLS: readonly Icon[] = [
  Java,
  Spring,
  React,
  TypeScript,
  NextJs,
  TailwindCSS,
  ShadcnUI,
  PostgreSQL,
  Docker,
  Git,
  GitHubLight,
  VisualStudioCode,
  ClaudeAI,
  AppleLight,
];
