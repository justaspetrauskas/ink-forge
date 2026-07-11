import type { ReactElement } from "react";

import { AppShell } from "@/components/ui/organisms/app-shell";
import { PromptEditor } from "@/components/ui/organisms/prompt-editor";
import { ConceptsPanel } from "@/components/ui/organisms/concepts-panel";

const concepts = [
	{
		title: "Raven Sigil",
		style: "Blackwork",
		generatedAt: "Jul 8"
	},
	{
		title: "Koi Ascend",
		style: "Japanese",
		generatedAt: "Jul 7"
	},
	{
		title: "Signal Rose",
		style: "Neo Traditional",
		generatedAt: "Jul 6"
	}
];

export default function GeneratorPage(): ReactElement {
	return (
		<AppShell title="Generate">
			<div className="flex min-h-full flex-col gap-6 p-6 lg:flex-row lg:items-start">
				{/* ── Center: Prompt workspace ── */}
				<section className="flex flex-1 justify-center">
					<div className="w-full max-w-2xl">
						<PromptEditor />
					</div>
				</section>

				{/* ── Right: Collapsible concepts ── */}
				<ConceptsPanel concepts={concepts} />
			</div>
		</AppShell>
	);
}
