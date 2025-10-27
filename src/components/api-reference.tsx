import { TooltipTrigger } from "@radix-ui/react-tooltip";
import {
	IconCircle,
	IconCircleFilled,
	IconInfoCircle,
} from "@tabler/icons-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { PropDefinition } from "@/content/blocks-metadata";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent } from "./ui/tooltip";

interface ApiReferenceProps {
	props: PropDefinition[];
	title?: string;
	subtitle?: string;
}

export function ApiReference({
	props,
	title = "API Reference",
	subtitle = "Root",
}: ApiReferenceProps) {
	return (
		<div className="space-y-4">
			<div>
				<h2 className="text-2xl font-semibold">{title}</h2>
			</div>
			<div className="bg-card p-3 rounded-lg">
				{subtitle && <h3 className="text-xl font-semibold mt-2">{subtitle}</h3>}
				<p className="text-muted-foreground mt-1">
					Contains all {subtitle.toLowerCase()} functionality.
				</p>
				<Table className="bg-accent overflow-hidden relative rounded-lg">
					<TableHeader className="w-fit">
						<TableRow className="w-fit bg-secondary">
							<TableHead className="w-fit font-bold text-base">Prop</TableHead>
							<TableHead className="w-fit font-bold text-base">Type</TableHead>
							<TableHead className="w-fit font-bold text-base">
								Default
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="w-fit">
						{props.map((prop) => (
							<TableRow key={prop.name} className="w-fit bg-popover">
								<TableCell className="flex items-center gap-3 w-fit">
									<code className="bg-primary/50 p-1 rounded text-base w-fit">
										{prop.name}
										{prop.required && <span>*</span>}
									</code>
									{prop.description && (
										<Tooltip>
											<TooltipTrigger>
												<IconInfoCircle className="size-4" />
											</TooltipTrigger>
											<TooltipContent className="text-base border">
												{prop.description}
											</TooltipContent>
										</Tooltip>
									)}
								</TableCell>
								<TableCell className="w-fit">
									<code className="bg-accent p-1 rounded text-base w-fit">
										{prop.type}
									</code>
								</TableCell>
								<TableCell className="w-fit">
									{prop.defaultValue ? (
										<code className="bg-accent p-1 rounded text-base w-fit">
											{prop.defaultValue}
										</code>
									) : (
										"-"
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
