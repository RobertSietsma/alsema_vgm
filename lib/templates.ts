import { TemplateOption } from "./types";

export const BUILTIN_TEMPLATES: TemplateOption[] = [
  {
    id: "vgm-plan",
    name: "VGM Plan",
    description:
      "Standaard Veiligheids- en Gezondheidsmanagement plan template met alle vereiste secties.",
    filePath: "/templates/vgm-plan.docx",
    source: "builtin",
  },
];

export const STEPS = [
  { id: 1 as const, title: "Projectinformatie" },
  { id: 2 as const, title: "Projectdetails" },
  { id: 3 as const, title: "Template Selectie" },
  { id: 4 as const, title: "Overzicht & Genereren" },
];

export const DISCIPLINES = [
  "Middenspanning",
  "Laagspanning",
  "Hoogspanning",
  "Hogedruk Gas",
  "Lagedruk Gas",
];
