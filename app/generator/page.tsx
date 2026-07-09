import type { ReactElement } from "react";

import { AppShell } from "@/components/ui/organisms/app-shell";
import { PromptEditor } from "@/components/ui/organisms/prompt-editor";
import { TattooCard } from "@/components/ui/organisms/tattoo-card";

const tattoos = [
	{
		title: "Raven Sigil",
		style: "Blackwork",
		prompt:
			"Blackwork raven with fractured halo geometry, high-contrast feather texture, and breathing negative space for upper forearm placement.",
		generatedAt: "Generated Jul 8, 2026"
	},
	{
		title: "Koi Ascend",
		style: "Japanese",
		prompt:
			"Two koi circling upward around wind bars and soft peony petals, tuned for shoulder cap flow with elegant line weight transitions.",
		generatedAt: "Generated Jul 7, 2026"
	},
	{
		title: "Signal Rose",
		style: "Neo Traditional",
		prompt:
			"Neo traditional dagger through rose with bold contour, selective red accent petals, and balanced ornamental framing.",
		generatedAt: "Generated Jul 6, 2026"
	}
];

export default function GeneratorPage(): ReactElement {
	return (
		<AppShell title="Generate" subtitle="Craft tattoo directions, then refine the strongest concepts.">
			<div className="space-y-6">
				<PromptEditor />

				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Latest Concepts</h2>
						<p className="text-sm text-[var(--text-secondary)]">{tattoos.length} results</p>
					</div>

					<div className="grid gap-5 xl:grid-cols-2">
						{tattoos.map((tattoo) => (
							<TattooCard
								key={tattoo.title}
								title={tattoo.title}
								style={tattoo.style}
								prompt={tattoo.prompt}
								generatedAt={tattoo.generatedAt}
							/>
						))}
					</div>
				</section>
			</div>
		</AppShell>
	);
}
