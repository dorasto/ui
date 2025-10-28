"use client";

import { Preview } from "@@/registry/preview/preview";
import { Button } from "@/components/ui/button";

export function Example01() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<p className="text-sm">
				Create your link in bio on <Preview url="https://doras.to" /> and
				showcase your brand with style.
			</p>
		</div>
	);
}

export function Example02() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Preview url="https://react.dev" showImage={false} />
		</div>
	);
}

export function Example03() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Preview url="https://tailwindcss.com">
				<Button>Custom trigger</Button>
			</Preview>
		</div>
	);
}
