"use client";

import {
	Tile,
	TileAction,
	TileDescription,
	TileHeader,
	TileIcon,
	TileTitle,
} from "@@/registry/tile/tile";
import { IconArrowRight, IconUser } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function Example01() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Tile>
				<TileHeader>
					<TileIcon>
						<IconUser />
					</TileIcon>
					<TileTitle>Display name</TileTitle>
					<TileDescription>Tommerty</TileDescription>
				</TileHeader>
				<TileAction>
					<Button variant="secondary" size="sm">
						Update
					</Button>
				</TileAction>
			</Tile>
		</div>
	);
}
export function Example02() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Tile
				asChild
				className="group/tile border border-transparent hover:border-primary"
			>
				<a href="/">
					<TileHeader>
						<TileTitle>Learn more</TileTitle>
					</TileHeader>
					<TileAction asChild>
						<div className="bg-muted rounded p-1 group-hover/tile:scale-125 group-hover/tile:bg-accent transition-all">
							<IconArrowRight className="size-4" />
						</div>
					</TileAction>
				</a>
			</Tile>
		</div>
	);
}
export function Example03() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Tile variant={"outline"}>
				<TileHeader>
					<TileIcon>
						<IconUser />
					</TileIcon>
					<TileTitle>Outline</TileTitle>
				</TileHeader>
				<TileAction>
					<Button variant="secondary" size="sm">
						Update
					</Button>
				</TileAction>
			</Tile>
		</div>
	);
}
export function Example04() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Tile variant={"transparent"}>
				<TileHeader>
					<TileIcon>
						<IconUser />
					</TileIcon>
					<TileTitle>Transparent</TileTitle>
				</TileHeader>
				<TileAction>
					<Button variant="secondary" size="sm">
						Update
					</Button>
				</TileAction>
			</Tile>
		</div>
	);
}
