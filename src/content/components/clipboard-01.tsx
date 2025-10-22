"use client";

import Clipboard from "@@/registry/clipboard/clipboard";

export default function ClipboardDemo01() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-md space-y-6">
				<div className="space-y-2 text-center">
					<h2 className="text-2xl font-bold">Basic Clipboard</h2>
					<p className="text-sm text-muted-foreground">
						Click the button to copy text to your clipboard
					</p>
				</div>

				<div className="flex justify-center gap-4">
					<Clipboard
						textToCopy="Hello, World!"
						tooltipText="Copy to clipboard"
						tooltipCopiedText="Copied!"
					/>
				</div>

				<div className="rounded-lg border bg-muted/50 p-4">
					<p className="text-sm text-muted-foreground">
						Text to copy:{" "}
						<span className="font-mono font-semibold text-foreground">
							Hello, World!
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
