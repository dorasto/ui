import { useQuery } from "@tanstack/react-query";

interface GitHubStarsData {
	stars: number;
	name: string;
	fullName: string;
	description: string;
	url: string;
}

export function useGitHubStars(owner?: string, repo?: string) {
	return useQuery({
		queryKey: ["github-stars", owner, repo],
		queryFn: async (): Promise<GitHubStarsData> => {
			const params = new URLSearchParams();
			if (owner) params.set("owner", owner);
			if (repo) params.set("repo", repo);

			const url = `/api/github-stars${params.toString() ? `?${params.toString()}` : ""}`;
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Failed to fetch GitHub stars");
			}

			return response.json();
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 3,
	});
}
