"use client";

import Clipboard from "@@/registry/clipboard/clipboard";
export default function ClipboardDemo03() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Clipboard textToCopy={"Text to copy"} />
		</div>
	);
}
