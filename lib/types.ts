export interface ProjectInfo {
  projectName: string;
  location: string;
  contractor: string;
  projectManager: string;
  client: string;
}

export interface ProjectDetails {
  projectDescription: string;
  typeOfWork: string;
  disciplines: string[];
  subcontractorPresent: boolean;
}

export interface FormData extends ProjectInfo, ProjectDetails {
  selectedTemplate: TemplateOption | null;
}

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
  filePath?: string;
  file?: File;
  source: "builtin" | "uploaded";
}

export type StepId = 1 | 2 | 3 | 4;
