import { ImageResponse } from "@vercel/og";

/**
 * Loads a font from Google Fonts
 * @param font - The font name
 * @param text - The text to load the font for
 * @param weight - The font weight to load
 * @returns The font data
 */
async function loadFont(font: string, text: string, weight: number) {
	const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status === 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error("Failed to load font data");
}

/**
 * Generates a SEO image
 */
export interface SeoImageGeneratorProps {
	title: string;
	description?: string;
	siteName?: string;
	url?: string;
	image?: string;
}

export async function generateSeoImage({
	title,
	description,
	siteName = "Doras UI",
	url = "ui.doras.to",
	image = "https://ui.doras.to/logo192.png",
}: SeoImageGeneratorProps) {
	// Load fonts
	const fontWeights = [400, 600, 700] as const;
	const fonts = await Promise.all(
		fontWeights.map(async (weight) => ({
			name: "Inter",
			data: await loadFont("Inter", `${title} ${description || ""}`, weight),
			style: "normal" as const,
			weight,
		})),
	);

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100%",
				flexDirection: "column",
				position: "relative",
				background: "#0a0a0a",
				color: "#ffffff",
				fontFamily: "Inter, sans-serif",
			}}
		>
			{/* Gradient background */}
			<div
				style={{
					background:
						"radial-gradient(circle at bottom right, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15), rgba(0, 0, 0, 0))",
					position: "absolute",
					inset: "0",
					opacity: 0.6,
				}}
			/>

			{/* Grid pattern overlay */}
			<div
				style={{
					position: "absolute",
					inset: "0",
					backgroundImage:
						"linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
					backgroundSize: "50px 50px",
				}}
			/>

			{/* Content container */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					padding: "80px",
					height: "100%",
					position: "relative",
				}}
			>
				{/* Site branding */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						fontSize: "20px",
						fontWeight: "600",
						marginBottom: "20px",
						opacity: 0.8,
					}}
				>
					{siteName}
				</div>

				{/* Main title */}
				<div
					style={{
						fontSize: "64px",
						fontWeight: "700",
						lineHeight: "1.2",
						marginBottom: image ? "40px" : description ? "20px" : "0",
						maxWidth: "900px",
						textAlign: "center",
					}}
				>
					{title}
				</div>

				{/* Component Image */}
				{image ? (
					<div
						style={{
							display: "flex",
							marginBottom: description ? "40px" : "0",
						}}
					>
						<img
							src={image}
							width={500}
							alt="component"
							style={{
								borderRadius: "8px",
								objectFit: "contain",
							}}
						/>
					</div>
				) : (
					<div
						style={{
							display: "flex",
							marginBottom: description ? "40px" : "0",
						}}
					>
						<img
							src={"https://ui.doras.to/logo192.png"}
							height={100}
							alt="component"
							style={{
								borderRadius: "8px",
								objectFit: "contain",
							}}
						/>
					</div>
				)}

				{/* Description */}
				{description && (
					<div
						style={{
							fontSize: "28px",
							opacity: 0.7,
							lineHeight: "1.4",
							maxWidth: "900px",
							textAlign: "center",
						}}
					>
						{description}
					</div>
				)}
			</div>

			{/* Footer */}
			<div
				style={{
					position: "absolute",
					bottom: "40px",
					right: "80px",
					fontSize: "18px",
					opacity: 0.6,
				}}
			>
				{url}
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts,
		},
	);
}
