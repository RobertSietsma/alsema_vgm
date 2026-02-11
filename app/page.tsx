import FormWizard from "@/components/FormWizard";

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-accent/40 font-sans">
      <div className="py-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Alsema VGM Document Generator
        </h1>
        <p className="mt-1 text-sm text-muted">
          Genereer VGM documenten op basis van een template
        </p>
      </div>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden px-6 pb-8">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-accent bg-white p-8 shadow-sm">
          <FormWizard />
        </div>
      </main>
    </div>
  );
}
