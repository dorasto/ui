"use client";

import Clipboard from "@@/registry/clipboard/clipboard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ClipboardDemo03() {
	const [customText, setCustomText] = useState("Copy this custom text!");

	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-lg space-y-6">
				<div className="space-y-2 text-center">
					<h2 className="text-2xl font-bold">Interactive Clipboard</h2>
					<p className="text-sm text-muted-foreground">
						Type something and copy it to your clipboard
					</p>
				</div>

				<div className="space-y-4 rounded-lg border bg-card p-6">
					<div className="space-y-2">
						<Label htmlFor="custom-text">Enter text to copy</Label>
						<div className="flex items-center gap-2">
							<Clipboard
								textToCopy={customText}
								iconSize={16}
								disabled={!customText.trim()}
								onCopy={() => console.log("Copied:", customText)}
							/>
						</div>
					</div>

					<div className="grid gap-3 pt-4 border-t">
						<p className="text-xs font-medium text-muted-foreground">
							Quick Copy Options:
						</p>
						{[
							{ label: "Email", value: "contact@example.com" },
							{ label: "URL", value: "https://latest-ui.com" },
							{ label: "API Key", value: "sk_live_1234567890abcdef" },
						].map((item) => (
							<div
								key={item.label}
								className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2"
							>
								<div className="space-y-0.5">
									<p className="text-xs font-medium">{item.label}</p>
									<p className="text-xs font-mono text-muted-foreground">
										{item.value}
									</p>
								</div>
								<Clipboard
									textToCopy={item.value}
									iconSize={14}
									className="h-7 w-7"
									tooltipDelayDuration={100}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
