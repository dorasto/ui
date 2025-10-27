import { createFileRoute } from "@tanstack/react-router";
import { generateSeoImage } from "@/lib/seo-image-generator";

export const Route = createFileRoute("/og/index.png")({
	server: {
		handlers: {
			GET: async () => {
				const image = await generateSeoImage({
					title: "Doras UI",
					description:
						"A collection of beautiful, reusable component blocks built with React",
					siteName: "Doras UI",
					url: "ui.doras.to",
				});

				return image;
			},
		},
	},
});
