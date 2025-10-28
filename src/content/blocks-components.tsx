// Import examples from organized block folders
import ClipboardExample01 from "./clipboard/examples/example-01";
import ClipboardExample02 from "./clipboard/examples/example-02";
import ClipboardExample03 from "./clipboard/examples/example-03";

export const blocksComponents: Record<string, React.ComponentType> = {
	"clipboard-01": ClipboardExample01,
	"clipboard-02": ClipboardExample02,
	"clipboard-03": ClipboardExample03,
};
