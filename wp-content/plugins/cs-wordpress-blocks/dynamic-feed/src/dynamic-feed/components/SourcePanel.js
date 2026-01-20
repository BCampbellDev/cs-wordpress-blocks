import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl, Notice } from "@wordpress/components";

const POST_TYPE_OPTIONS = [
	{ label: __("Posts", "cs-wordpress-blocks"), value: "post" },
	{ label: __("Pages", "cs-wordpress-blocks"), value: "page" },
];

export default function SourcePanel({ attributes, setAttributes }) {
	const { postType, taxonomy } = attributes;

	return (
		<PanelBody title={__("Source", "cs-wordpress-blocks")} initialOpen={true}>
			<SelectControl
				label={__("Post type", "cs-wordpress-blocks")}
				value={postType}
				options={POST_TYPE_OPTIONS}
				onChange={(value) => setAttributes({ postType: value })}
			/>

			<SelectControl
				label={__("Taxonomy", "cs-wordpress-blocks")}
				value={taxonomy}
				options={[
					{ label: __("Category", "cs-wordpress-blocks"), value: "category" },
					{ label: __("Tag", "cs-wordpress-blocks"), value: "post_tag" },
				]}
				onChange={(value) => setAttributes({ taxonomy: value, termIds: [] })}
			/>

			<Notice status="info" isDismissible={false}>
				{__(
					"Next step: add a term picker. For now, the block will show the latest items using the settings below.",
					"cs-wordpress-blocks",
				)}
			</Notice>
		</PanelBody>
	);
}
