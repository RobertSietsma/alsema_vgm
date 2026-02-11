import PizZip from "pizzip";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal .docx is a ZIP containing XML files.
// We build a minimal valid .docx with placeholder tags.

const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const wordRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;

function p(text, bold = false, size = 24) {
  const boldXml = bold ? "<w:b/>" : "";
  const sizeXml = `<w:sz w:val="${size}"/><w:szCs w:val="${size}"/>`;
  return `<w:p><w:pPr><w:rPr>${boldXml}${sizeXml}</w:rPr></w:pPr><w:r><w:rPr>${boldXml}${sizeXml}</w:rPr><w:t xml:space="preserve">${text}</w:t></w:r></w:p>`;
}

function emptyP() {
  return `<w:p/>`;
}

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
  xmlns:mo="http://schemas.microsoft.com/office/mac/office/2008/main"
  xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
  xmlns:mv="urn:schemas-microsoft-com:mac:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
  xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
  xmlns:w10="urn:schemas-microsoft-com:office:word"
  xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
  xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
  xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
  xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
  xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
  xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
  mc:Ignorable="w14 wp14">
  <w:body>
    ${p("VGM Plan — {{ProjectName}}", true, 36)}
    ${emptyP()}
    ${p("1. Projectinformatie", true, 28)}
    ${emptyP()}
    ${p("Projectnaam: {{ProjectName}}")}
    ${p("Locatie: {{Location}}")}
    ${p("Aannemer: {{Contractor}}")}
    ${p("Projectleider: {{ProjectManager}}")}
    ${p("Opdrachtgever: {{Client}}")}
    ${emptyP()}
    ${p("2. Projectdetails", true, 28)}
    ${emptyP()}
    ${p("Projectomschrijving:")}
    ${p("{{ProjectDescription}}")}
    ${emptyP()}
    ${p("Type werkzaamheden: {{TypeOfWork}}")}
    ${p("Discipline: {{Discipline}}")}
    ${p("Onderaannemer aanwezig: {{SubcontractorPresent}}")}
    ${emptyP()}
    ${p("3. Veiligheidsmaatregelen", true, 28)}
    ${emptyP()}
    ${p("Dit VGM plan beschrijft de veiligheids- en gezondheidsmaatregelen voor het project {{ProjectName}} op locatie {{Location}}.")}
    ${emptyP()}
    ${p("De aannemer ({{Contractor}}) is verantwoordelijk voor de naleving van alle veiligheidsvoorschriften.")}
  </w:body>
</w:document>`;

const zip = new PizZip();
zip.file("[Content_Types].xml", contentTypesXml);
zip.file("_rels/.rels", relsXml);
zip.file("word/_rels/document.xml.rels", wordRelsXml);
zip.file("word/document.xml", documentXml);

const buf = zip.generate({ type: "nodebuffer" });
const outPath = join(__dirname, "..", "public", "templates", "vgm-plan.docx");
writeFileSync(outPath, buf);
console.log("Template created:", outPath);
