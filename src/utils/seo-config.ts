/**
 * SEO Configuration for Doras UI
 *
 * This file contains all SEO-related constants and helpers for the application.
 * Based on TanStack Start best practices for meta tags and Open Graph.
 */

export const SITE_CONFIG = {
	name: "Doras UI",
	url: "https://dorasui.com", // Update with your actual domain
	description:
		"Explore Doras UI, the ultimate shadcn component library for React and TanStack Router developers. Enhance your applications with our versatile UI components today!",
	ogImage: "/og-image.png", // Add your OG image path
	twitterHandle: "@dorasui", // Update with your Twitter handle
	author: "Doras UI Team",
	locale: "en_US",
	type: "website",
} as const;

export const SOCIAL_LINKS = {
	twitter: "https://twitter.com/dorasui",
	github: "https://github.com/your-org/doras-ui",
	discord: "https://discord.gg/your-server",
} as const;

/**
 * Generate structured data (JSON-LD) for better SEO
 */
export const generateStructuredData = ({
	type = "WebSite",
	name,
	description,
	url,
}: {
	type?: "WebSite" | "WebPage" | "SoftwareApplication" | "Organization";
	name: string;
	description?: string;
	url?: string;
}) => {
	const baseData = {
		"@context": "https://schema.org",
		"@type": type,
		name,
		...(description && { description }),
		...(url && { url }),
	};

	if (type === "WebSite") {
		return {
			...baseData,
			url: SITE_CONFIG.url,
			potentialAction: {
				"@type": "SearchAction",
				target: `${SITE_CONFIG.url}/blocks?search={search_term_string}`,
				"query-input": "required name=search_term_string",
			},
		};
	}

	if (type === "SoftwareApplication") {
		return {
			...baseData,
			applicationCategory: "DeveloperApplication",
			operatingSystem: "Web",
			offers: {
				"@type": "Offer",
				price: "0",
				priceCurrency: "USD",
			},
		};
	}

	return baseData;
};

/**
 * Breadcrumb schema generator
 */
export const generateBreadcrumbSchema = (
	items: Array<{ name: string; url: string }>,
) => {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${SITE_CONFIG.url}${item.url}`,
		})),
	};
};

/**
 * Component schema for individual components
 */
export const generateComponentSchema = ({
	name,
	description,
	category,
}: {
	name: string;
	description: string;
	category: string;
}) => {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareSourceCode",
		name,
		description,
		programmingLanguage: "TypeScript",
		runtimePlatform: "React",
		codeRepository: SOCIAL_LINKS.github,
		keywords: [name, category, "React", "TanStack Router", "UI Component"],
	};
};

/**
 * Default keywords for all pages
 */
export const DEFAULT_KEYWORDS = [
	"React",
	"TanStack Router",
	"UI Components",
	"Component Library",
	"TypeScript",
	"Tailwind CSS",
	"shadcn",
	"Accessible Components",
	"Modern UI",
	"Web Development",
] as const;

/**
 * Generate a canonical URL
 */
export const getCanonicalUrl = (path: string) => {
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	return `${SITE_CONFIG.url}${cleanPath}`;
};
