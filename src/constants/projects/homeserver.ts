import type { Project } from "@/constants/projects";

export const HOMESERVER_PROJECT: Project = {
  nr: "02",

  slug: "homeserver",
  title: "Homeserver",
  categories: ["Server", "Self-Hosting"],
  summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  description: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    "Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.",
  ],
  featured: true,
  features: [
    { text: "Feature 1" },
    { text: "Feature 2" },
    { text: "Feature 3" },
  ],
  views: [{ label: "Ansicht 1" }],
};
