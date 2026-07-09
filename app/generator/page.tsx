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
		<AppShell title="Generate" subtitle="Open canvas on the left, prompt rail on the right.">
			<div className="grid gap-8 xl:grid-cols-[1.58fr_0.92fr]">
				<section className="space-y-4">
					<div className="border-b border-[var(--border-subtle)] pb-4">
						<p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-tertiary)]">Generation canvas</p>
						<div className="mt-3 flex flex-wrap items-end justify-between gap-3">
							<div>
								<h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Latest Concepts</h2>
								<p className="mt-1 text-sm text-[var(--text-secondary)]">Run fast variations, then refine only one direction.</p>
							</div>
							<p className="text-xs font-medium text-[var(--text-tertiary)]">{tattoos.length} results</p>
						</div>
					</div>

					<div className="space-y-6">
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

				<aside className="space-y-5 border-t border-[var(--border-subtle)] pt-5 xl:sticky xl:top-6 xl:h-fit xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
					<PromptEditor mode="rail" />

					<div className="border-t border-[var(--border-subtle)] pt-4">
						<p className="text-xs font-medium text-[var(--text-tertiary)]">Direction notes</p>
						<ul className="mt-2 space-y-2 text-sm text-[var(--text-secondary)]">
							<li>Subject + style + placement first.</li>
							<li>Name desired line contrast explicitly.</li>
							<li>Generate three before choosing one to refine.</li>
						</ul>
					</div>
				</aside>
			</div>
		</AppShell>
	);
}
