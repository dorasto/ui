import { SITE_CONFIG } from "./seo-config";

export const seo = ({
	title,
	description,
	keywords,
	image,
	url,
	type = "website",
	twitterCard,
}: {
	title: string;
	description?: string;
	image?: string;
	keywords?: string;
	url?: string;
	type?: "website" | "article";
	twitterCard?: "summary" | "summary_large_image";
}) => {
	// Use provided image or default OG image
	const ogImage = image || SITE_CONFIG.ogImage;
	const cardType = twitterCard || (ogImage ? "summary_large_image" : "summary");

	const tags = [
		{ title },
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		{ name: "author", content: SITE_CONFIG.author },
		{ name: "robots", content: "index, follow" },
		{ name: "language", content: "English" },
		// Twitter Card tags
		{ name: "twitter:card", content: cardType },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:site", content: SITE_CONFIG.twitterHandle },
		{ name: "twitter:creator", content: SITE_CONFIG.twitterHandle },
		// Open Graph tags
		{ property: "og:type", content: type },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:site_name", content: SITE_CONFIG.name },
		{ property: "og:locale", content: SITE_CONFIG.locale },
		...(url
			? [
					{ property: "og:url", content: url },
					{ name: "twitter:url", content: url },
				]
			: []),
		...(ogImage
			? [
					{ name: "twitter:image", content: ogImage },
					{ property: "og:image", content: ogImage },
					{ property: "og:image:alt", content: title },
					{ property: "og:image:width", content: "1200" },
					{ property: "og:image:height", content: "630" },
				]
			: []),
	];

	return tags;
};

export const defaultSEO = {
	title: "Doras UI - Beautiful React Component Library",
	description:
		"Explore Doras UI, the ultimate shadcn component library for React and TanStack Router developers. Enhance your applications with our versatile UI components today!",
	keywords:
		"shadcn, react, tanstack router, ui library, component library, Doras UI, application development, react components, ui blocks, copy paste components",
};

/**
 * Helper to create SEO-friendly titles with consistent branding
 */
export const createTitle = (pageTitle: string, includeBrand = true) => {
	return includeBrand ? `${pageTitle} | ${SITE_CONFIG.name}` : pageTitle;
};

/**
 * Helper to truncate descriptions to optimal length (150-160 chars)
 */
export const truncateDescription = (text: string, maxLength = 155) => {
	if (text.length <= maxLength) return text;
	return `${text.substring(0, maxLength - 3)}...`;
};
