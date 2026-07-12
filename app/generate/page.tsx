import type { ReactElement } from "react";

import { AppShell } from "@/components/ui/organisms/app-shell";
import { ConceptsPanel } from "@/components/ui/organisms/concepts-panel";
import { TattooGenerationFlow } from "@/components/ui/organisms/tattoo-generation-flow";

const concepts = [
  {
    title: "Raven Sigil",
    style: "Traditional",
    generatedAt: "Jul 8"
  },
  {
    title: "Koi Ascend",
    style: "Japanese",
    generatedAt: "Jul 7"
  },
  {
    title: "Signal Rose",
    style: "Minimal",
    generatedAt: "Jul 6"
  }
];

export default function GeneratePage(): ReactElement {
  return (
    <AppShell title="Generate" subtitle="Idea to prompt flow with configurable styles and size mapping.">
      <div className="flex min-h-full flex-col gap-6 p-6 lg:flex-row lg:items-start">
        <section className="flex flex-1 justify-center">
          <div className="w-full max-w-3xl">
            <TattooGenerationFlow />
          </div>
        </section>

        <ConceptsPanel concepts={concepts} />
      </div>
    </AppShell>
  );
}
