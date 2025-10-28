import { createFileRoute } from "@tanstack/react-router";

interface GitHubRepo {
	stargazers_count: number;
	name: string;
	full_name: string;
	description: string;
	html_url: string;
}

async function fetchGitHubStars(owner: string, repo: string) {
	try {
		const response = await fetch(
			`https://api.github.com/repos/${owner}/${repo}`,
			{
				headers: {
					"User-Agent": "Doras-UI/1.0",
					Accept: "application/vnd.github.v3+json",
					// Add GitHub token if you have one (recommended for higher rate limits)
					// Authorization: `token ${process.env.GITHUB_TOKEN}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.statusText}`);
		}

		const data: GitHubRepo = await response.json();

		return {
			stars: data.stargazers_count,
			name: data.name,
			fullName: data.full_name,
			description: data.description,
			url: data.html_url,
		};
	} catch (error) {
		console.error("Error fetching GitHub stars:", error);
		throw error;
	}
}

export const Route = createFileRoute("/api/github-stars")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url);
				const owner = url.searchParams.get("owner") || "dorasto";
				const repo = url.searchParams.get("repo") || "ui";

				try {
					const repoData = await fetchGitHubStars(owner, repo);

					// Add cache headers to avoid hitting rate limits too often
					return Response.json(repoData, {
						headers: {
							"Cache-Control": "public, max-age=300", // Cache for 5 minutes
						},
					});
				} catch (error) {
					return Response.json(
						{
							error: "Failed to fetch GitHub repository data",
							message: error instanceof Error ? error.message : "Unknown error",
						},
						{ status: 500 },
					);
				}
			},
		},
	},
});
