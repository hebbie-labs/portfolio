import type { ComponentType } from "react";
import {
  AppleDark,
  AppleLight,
  ClaudeAI,
  Docker,
  Git,
  GitHubDark,
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

/** One icon, or one per theme for logos that disappear on one of the backgrounds. */
type SkillIcon = Icon | { light: Icon; dark: Icon };

/**
 * Icons for the cloud on the about page. To add one, import it from `developer-icons` above and add it here.
 * `{ light, dark }` picks an icon per theme (GitHub, Apple).
 */
export const SKILLS: readonly SkillIcon[] = [
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
  { light: GitHubDark, dark: GitHubLight },
  VisualStudioCode,
  ClaudeAI,
  { light: AppleDark, dark: AppleLight },
];
