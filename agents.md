# Alsema VGM Document Generator

## Project overview

Internal tool for **Alsema** that generates VGM (Veiligheids- en Gezondheidsmanagement) documents from Word (.docx) templates. Users fill in a 4-step form wizard, select a template, and download a populated .docx file — entirely client-side, no server processing.

**Tech stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, ShadCN-style components (Radix UI primitives).

**Key libraries:** `docxtemplater` + `pizzip` (template rendering), `file-saver` (download trigger), `lucide-react` (icons), `class-variance-authority` + `clsx` + `tailwind-merge` (styling utilities).

## Architecture

- **Client-side only** — no API routes, no database, no authentication. The entire app runs in the browser.
- **Single page** — `app/page.tsx` renders the `FormWizard` component inside a centered card layout.
- **4-step form wizard** — state lives in `FormWizard.tsx` via `useState`. Each step is a separate component that receives `formData` and an `onChange` callback.
- **Document generation** happens in-browser: fetch the .docx template → unzip with PizZip → replace `{{Tags}}` with docxtemplater → re-zip → trigger download with file-saver.

## File structure

```
app/
  layout.tsx          Root layout (Geist font, html lang="nl", metadata)
  page.tsx            Single page — renders header + FormWizard
  globals.css         Tailwind v4 import + CSS custom properties (brand colors)
  favicon.ico

components/
  FormWizard.tsx      Main orchestrator: state, validation, step navigation
  StepIndicator.tsx   Visual step progress bar

  steps/
    StepProjectInfo.tsx        Step 1 — project name, location, contractor, PM, client
    StepProjectDetails.tsx     Step 2 — description, type of work, disciplines, subcontractor
    StepTemplateSelection.tsx  Step 3 — pick built-in or upload custom template
    StepReviewGenerate.tsx     Step 4 — review all data + generate button

  ui/
    Button.tsx         ShadCN primitive — CVA variants (default, outline, ghost, link)
    Input.tsx          ShadCN primitive — styled <input>
    Textarea.tsx       ShadCN primitive — styled <textarea>
    Select.tsx         ShadCN primitive — styled <select>
    RadioGroup.tsx     ShadCN primitive — radio group with cards
    combobox.tsx       ShadCN primitive — searchable combobox (Base UI)
    input-group.tsx    ShadCN primitive — input with icon prefix
    FormInput.tsx      Form wrapper — label + Input + error styling
    FormTextarea.tsx   Form wrapper — label + Textarea + error styling
    FormButton.tsx     Form wrapper — Button with loading state

lib/
  types.ts            All TypeScript interfaces (FormData, ProjectInfo, etc.)
  templates.ts        Built-in templates list, STEPS config, DISCIPLINES list
  docx-generator.ts   Template loading, tag replacement, .docx download
  utils.ts            cn() helper (clsx + tailwind-merge)

public/
  templates/
    vgm-plan.docx     Built-in VGM Plan template with placeholder tags

scripts/
  create-template.mjs Node script to generate the built-in vgm-plan.docx
```

## Key modules

### `lib/types.ts`

All TypeScript interfaces in one file:

- `ProjectInfo` — step 1 fields (projectName, location, contractor, projectManager, client)
- `ProjectDetails` — step 2 fields (projectDescription, typeOfWork, disciplines[], subcontractorPresent)
- `FormData` — extends both + selectedTemplate
- `TemplateOption` — template metadata (id, name, description, filePath/file, source)
- `StepId` — literal union `1 | 2 | 3 | 4`

### `lib/templates.ts`

Static configuration:

- `BUILTIN_TEMPLATES` — array of `TemplateOption` (currently one: "VGM Plan")
- `STEPS` — step definitions with id and Dutch title
- `DISCIPLINES` — list of energy disciplines: Middenspanning, Laagspanning, Hoogspanning, Hogedruk Gas, Lagedruk Gas

### `lib/docx-generator.ts`

Exports a single function: `generateDocument(formData: FormData): Promise<void>`

Internal flow:
1. `loadTemplateBytes()` — fetches built-in .docx from `/templates/` or reads uploaded File
2. `buildTagData()` — maps FormData fields to template tag names (see tag table below)
3. Creates `Docxtemplater` instance with `{{ }}` delimiters, calls `.render(tagData)`
4. Generates output blob and triggers download via `saveAs()` as `{ProjectName}_{TemplateName}.docx`

### `components/FormWizard.tsx`

Central state manager. Owns all form state via a single `useState<FormData>`. Key functions:

- `updateFormData(updates)` — merges partial updates, clears error
- `validateStep(step, formData)` — returns error string or null per step
- `goNext()` / `goPrev()` — step navigation with validation gate on next
- `handleGenerate()` — calls `generateDocument()`, manages loading/error state

Step components receive `formData` and `onChange` props — they don't own state.

## UI component conventions

Two layers:

1. **ShadCN primitives** (`components/ui/Button.tsx`, `Input.tsx`, etc.) — low-level styled components using CVA for variants. These follow standard ShadCN patterns with `cn()` for class merging.

2. **Form wrappers** (`components/ui/FormInput.tsx`, `FormTextarea.tsx`, `FormButton.tsx`) — add labels, layout, and form-specific behavior on top of primitives. Step components use these, not the raw primitives.

## Styling

**Brand colors** (defined as CSS custom properties in `globals.css`):

| Token             | Value     | Usage                      |
|--------------------|-----------|----------------------------|
| `--primary`        | `#D81E05` | Alsema red — buttons, links, focus rings |
| `--primary-dark`   | `#b81904` | Hover state for primary    |
| `--accent`         | `#E5E5E5` | Borders, dividers, subtle backgrounds |
| `--foreground`     | `#111111` | Body text                  |
| `--muted`          | `#71717a` | Secondary/helper text      |
| `--background`     | `#ffffff` | Page background            |
| `--secondary`      | `#f5f5f5` | Card/section backgrounds   |

**Tailwind v4** — uses `@theme inline` block in `globals.css` to map CSS vars to Tailwind color utilities (e.g., `bg-primary`, `text-muted`).

**No dark mode.** Light only.

**Font:** Geist Sans + Geist Mono via `next/font/google`.

## Template placeholder tags

These `{{Tag}}` placeholders in .docx templates get replaced with form data:

| Tag                      | FormData field           | Example value                  |
|--------------------------|--------------------------|--------------------------------|
| `{{ProjectName}}`        | `projectName`            | "Nieuwbouw Almere"             |
| `{{Location}}`           | `location`               | "Almere"                       |
| `{{Contractor}}`         | `contractor`             | "Alsema B.V."                  |
| `{{ProjectManager}}`     | `projectManager`         | "Jan de Vries"                 |
| `{{Client}}`             | `client`                 | "Gemeente Almere"              |
| `{{ProjectDescription}}` | `projectDescription`     | "Aanleg elektra installatie"   |
| `{{TypeOfWork}}`         | `typeOfWork`             | "Nieuwbouw"                    |
| `{{Discipline}}`         | `disciplines.join(", ")` | "Laagspanning, Middenspanning" |
| `{{SubcontractorPresent}}` | `subcontractorPresent ? "Ja" : "Nee"` | "Ja"          |

## How document generation works

1. User fills in all 4 steps and clicks "Genereer Document"
2. `FormWizard.handleGenerate()` calls `generateDocument(formData)`
3. Template bytes are loaded — either fetched from `/templates/*.docx` (built-in) or read from the user's uploaded `File` object
4. PizZip unzips the .docx (which is a ZIP of XML files)
5. Docxtemplater parses the XML, finds `{{Tag}}` placeholders, replaces them with values from `buildTagData()`
6. The modified ZIP is re-generated as a Blob
7. `file-saver` triggers a browser download as `{ProjectName}_{TemplateName}.docx`

All processing happens client-side. No data leaves the browser.

## Commands

```bash
npm run dev       # Start dev server (Next.js)
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint
node scripts/create-template.mjs   # Regenerate the built-in vgm-plan.docx
```

## Language

The entire UI is in **Dutch** — field labels, step titles, validation messages, button text, error messages. Template content is also in Dutch. Keep all user-facing strings in Dutch when making changes.
