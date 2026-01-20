import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl, RangeControl } from "@wordpress/components";

export default function DisplayPanel({ attributes, setAttributes }) {
	const { showImage, showExcerpt, excerptLength, showMeta } = attributes;

	return (
		<PanelBody title={__("Display", "cs-wordpress-blocks")} initialOpen={false}>
			<ToggleControl
				label={__("Show featured image", "cs-wordpress-blocks")}
				checked={!!showImage}
				onChange={(value) => setAttributes({ showImage: !!value })}
			/>

			<ToggleControl
				label={__("Show excerpt", "cs-wordpress-blocks")}
				checked={!!showExcerpt}
				onChange={(value) => setAttributes({ showExcerpt: !!value })}
			/>

			{showExcerpt && (
				<RangeControl
					label={__("Excerpt length (words)", "cs-wordpress-blocks")}
					value={excerptLength}
					min={5}
					max={80}
					onChange={(value) => setAttributes({ excerptLength: value })}
				/>
			)}

			<ToggleControl
				label={__("Show meta (date/author)", "cs-wordpress-blocks")}
				checked={!!showMeta}
				onChange={(value) => setAttributes({ showMeta: !!value })}
			/>
		</PanelBody>
	);
}
