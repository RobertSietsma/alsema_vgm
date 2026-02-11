import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { FormData } from "./types";

function buildTagData(formData: FormData): Record<string, string> {
  return {
    ProjectName: formData.projectName,
    Location: formData.location,
    Contractor: formData.contractor,
    ProjectManager: formData.projectManager,
    Client: formData.client,
    ProjectDescription: formData.projectDescription,
    TypeOfWork: formData.typeOfWork,
    Discipline: formData.disciplines.join(", "),
    SubcontractorPresent: formData.subcontractorPresent ? "Ja" : "Nee",
  };
}

async function loadTemplateBytes(
  formData: FormData
): Promise<ArrayBuffer> {
  const template = formData.selectedTemplate;
  if (!template) {
    throw new Error("Geen template geselecteerd.");
  }

  if (template.source === "builtin" && template.filePath) {
    const response = await fetch(template.filePath);
    if (!response.ok) {
      throw new Error(`Template kon niet worden geladen: ${response.statusText}`);
    }
    return response.arrayBuffer();
  }

  if (template.source === "uploaded" && template.file) {
    return template.file.arrayBuffer();
  }

  throw new Error("Ongeldige template configuratie.");
}

export async function generateDocument(formData: FormData): Promise<void> {
  const content = await loadTemplateBytes(formData);
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    delimiters: { start: "{{", end: "}}" },
    paragraphLoop: true,
    linebreaks: true,
  });

  const tagData = buildTagData(formData);
  doc.render(tagData);

  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  const templateName = formData.selectedTemplate?.name ?? "Document";
  const fileName = `${formData.projectName}_${templateName}.docx`;
  saveAs(out, fileName);
}
