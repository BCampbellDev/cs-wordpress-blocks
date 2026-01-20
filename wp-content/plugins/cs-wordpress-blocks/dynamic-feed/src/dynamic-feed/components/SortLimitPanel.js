import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl, RangeControl } from "@wordpress/components";

const ORDER_BY_OPTIONS = [
	{ label: __("Date", "cs-wordpress-blocks"), value: "date" },
	{ label: __("Title", "cs-wordpress-blocks"), value: "title" },
	{ label: __("Modified", "cs-wordpress-blocks"), value: "modified" },
	{ label: __("Comment count", "cs-wordpress-blocks"), value: "comment_count" },
];

const ORDER_OPTIONS = [
	{ label: __("Descending", "cs-wordpress-blocks"), value: "desc" },
	{ label: __("Ascending", "cs-wordpress-blocks"), value: "asc" },
];

export default function SortLimitPanel({ attributes, setAttributes }) {
	const { orderBy, order, limit } = attributes;

	return (
		<PanelBody
			title={__("Sorting & limit", "cs-wordpress-blocks")}
			initialOpen={false}
		>
			<SelectControl
				label={__("Order by", "cs-wordpress-blocks")}
				value={orderBy}
				options={ORDER_BY_OPTIONS}
				onChange={(value) => setAttributes({ orderBy: value })}
			/>

			<SelectControl
				label={__("Order", "cs-wordpress-blocks")}
				value={order}
				options={ORDER_OPTIONS}
				onChange={(value) => setAttributes({ order: value })}
			/>

			<RangeControl
				label={__("Items to show", "cs-wordpress-blocks")}
				value={limit}
				min={1}
				max={20}
				onChange={(value) => setAttributes({ limit: value })}
			/>
		</PanelBody>
	);
}
