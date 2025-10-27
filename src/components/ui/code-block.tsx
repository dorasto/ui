import Clipboard from "@@/registry/clipboard/clipboard";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
	code: string;
	language?: string;
	showLineNumbers?: boolean;
	className?: string;
}

export function CodeBlock({
	code,
	language = "tsx",
	showLineNumbers = true,
	className = "",
}: CodeBlockProps) {
	const [html, setHtml] = useState<string>("");

	useEffect(() => {
		codeToHtml(code, {
			lang: language,
			theme: "catppuccin-macchiato",
			defaultColor: false,
		}).then((rendered) => {
			setHtml(rendered);
		});
	}, [code, language]);

	return (
		<div className={`relative overflow-scroll max-h-80 ${className}`}>
			<div className="sticky top-2 right-2 z-10 float-right mr-2 mt-2">
				<Clipboard
					textToCopy={code}
					className="h-8 w-8 bg-secondary/80 hover:bg-secondary backdrop-blur-sm"
				/>
			</div>
			{html ? (
				<div
					className="shiki-wrapper text-sm [&_pre]:m-0 [&_pre]:p-4 [&_pre]:pr-14 [&_pre]:bg-secondary! [&_code]:font-mono"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is safe
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			) : (
				<div className="p-4 pr-14 bg-card rounded-lg">
					<pre className="text-sm font-mono">{code}</pre>
				</div>
			)}
		</div>
	);
}
