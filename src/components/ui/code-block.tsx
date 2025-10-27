import Clipboard from "@@/registry/clipboard/clipboard";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
	code: string;
	language?: string;
	showLineNumbers?: boolean;
	className?: string;
	showCopyButton?: boolean;
}

export function CodeBlock({
	code,
	language = "tsx",
	showLineNumbers = true,
	className = "",
	showCopyButton = true,
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
		<div
			className={`relative overflow-scroll max-h-80 w-full bg-secondary rounded-lg ${className}`}
		>
			<div className="sticky top-2 right-2 z-10 float-right mr-2 mt-2 ">
				<Clipboard
					textToCopy={code}
					className="h-8 w-8 bg-secondary/80 hover:bg-secondary backdrop-blur-sm"
				/>
			</div>
			{html ? (
				<div
					className="shiki-wrapper text-sm [&_pre]:m-0 [&_pre]:p-4 [&_pre]:pr-14 [&_pre]:bg-inherit! [&_code]:font-mono"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is safe
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			) : (
				<div className="p-4 pr-14 bg-inherit rounded-lg">
					<pre className="text-sm font-mono max-w-prose">{code}</pre>
				</div>
			)}
		</div>
	);
}
