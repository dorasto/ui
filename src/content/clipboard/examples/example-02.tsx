"use client";

import Clipboard from "@@/registry/clipboard/clipboard";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ClipboardDemo02() {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 gap-9">
				<div className="space-y-0.5">
					<p className="text-xs font-medium">Email</p>
					<p className="text-xs font-mono text-muted-foreground">
						me@example.com
					</p>
				</div>
				<Clipboard textToCopy={"me@example.com"} onCopy={handleCopy}>
					<Button variant={copied ? "default" : "outline"} size={"icon-lg"}>
						{copied ? <IconCheck /> : <IconCopy />}
					</Button>
				</Clipboard>
			</div>
		</div>
	);
}
