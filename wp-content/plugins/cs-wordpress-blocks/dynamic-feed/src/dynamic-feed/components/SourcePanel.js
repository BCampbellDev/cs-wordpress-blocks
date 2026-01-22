import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl, Notice } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { Spinner, CheckboxControl } from "@wordpress/components";

const POST_TYPE_OPTIONS = [
	{ label: __("Posts", "cs-wordpress-blocks"), value: "post" },
	{ label: __("Pages", "cs-wordpress-blocks"), value: "page" },
];

export default function SourcePanel({ attributes, setAttributes }) {
	const { postType, taxonomy } = attributes;

	const { terms, isResolving } = useSelect(
		(select) => {
			const store = select("core");

			// Fetch up to 100 terms; for a case study this is fine.
			const query = { per_page: 100, hide_empty: false };

			return {
				terms: store.getEntityRecords("taxonomy", taxonomy, query),
				isResolving: store.isResolving("getEntityRecords", [
					"taxonomy",
					taxonomy,
					query,
				]),
			};
		},
		[taxonomy],
	);

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

			<div style={{ marginTop: 12 }}>
				<strong>{__("Filter terms", "cs-wordpress-blocks")}</strong>

				{isResolving && (
					<div style={{ marginTop: 8 }}>
						<Spinner />
					</div>
				)}

				{!isResolving && Array.isArray(terms) && terms.length === 0 && (
					<Notice status="warning" isDismissible={false}>
						{__("No terms found for this taxonomy.", "cs-wordpress-blocks")}
					</Notice>
				)}

				{!isResolving && Array.isArray(terms) && terms.length > 0 && (
					<div style={{ maxHeight: 180, overflow: "auto", marginTop: 8 }}>
						{terms.map((t) => {
							const checked = Array.isArray(attributes.termIds)
								? attributes.termIds.includes(t.id)
								: false;

							return (
								<CheckboxControl
									key={t.id}
									label={t.name}
									checked={checked}
									onChange={(nextChecked) => {
										const current = Array.isArray(attributes.termIds)
											? attributes.termIds
											: [];

										const next = nextChecked
											? Array.from(new Set([...current, t.id]))
											: current.filter((id) => id !== t.id);

										setAttributes({ termIds: next });
									}}
								/>
							);
						})}
					</div>
				)}

				<Notice status="info" isDismissible={false}>
					{__(
						"If no terms are selected, the feed shows the latest items.",
						"cs-wordpress-blocks",
					)}
				</Notice>
			</div>
		</PanelBody>
	);
}
