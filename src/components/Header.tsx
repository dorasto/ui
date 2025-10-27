import { Link } from "@tanstack/react-router";
import {
	ChevronDown,
	ChevronRight,
	ClipboardType,
	Home,
	Menu,
	Network,
	SquareFunction,
	StickyNote,
	Table,
	X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [groupedExpanded, setGroupedExpanded] = useState<
		Record<string, boolean>
	>({});

	return (
		<header className="bg-card p-3 sticky top-0">
			<Link to="/">
				<Button variant={"secondary"} className="cursor-pointer">
					Doras UI
				</Button>
			</Link>
		</header>
	);
}
