"use client";

import Clipboard from "@@/registry/clipboard/clipboard";

export default function ClipboardDemo02() {
	const codeSnippet = `npm install @latest-ui/clipboard`;

	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-xl space-y-6">
				<div className="space-y-2 text-center">
					<h2 className="text-2xl font-bold">Copy Code Snippet</h2>
					<p className="text-sm text-muted-foreground">
						Perfect for documentation and code examples
					</p>
				</div>

				<div className="relative rounded-lg border bg-muted/50">
					<div className="flex items-center justify-between border-b bg-muted/80 px-4 py-2">
						<span className="text-xs font-medium">Terminal</span>
						<Clipboard
							textToCopy={codeSnippet}
							iconSize={14}
							className="h-7 w-7"
						/>
					</div>
					<div className="p-4">
						<code className="text-sm font-mono">{codeSnippet}</code>
					</div>
				</div>

				<div className="space-y-4">
					<div className="space-y-2">
						<h3 className="font-semibold text-sm">With Custom Text</h3>
						<div className="flex items-center gap-3 rounded-lg border bg-card p-4">
							<span className="flex-1 text-sm font-mono">
								git clone https://github.com/example/repo.git
							</span>
							<Clipboard
								textToCopy="git clone https://github.com/example/repo.git"
								iconSize={16}
								tooltipText="Copy command"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
