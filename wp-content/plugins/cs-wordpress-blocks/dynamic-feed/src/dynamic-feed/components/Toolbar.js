import { __ } from "@wordpress/i18n";
import { BlockControls } from "@wordpress/block-editor";
import { DEFAULT_ATTRIBUTES } from "../../defaults";
import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
} from "@wordpress/components";
import { listView, grid } from "@wordpress/icons";

export default function Toolbar({ attributes, setAttributes }) {
	const { viewStyle, refreshKey } = attributes;

	const resetToDefaults = () => {
		const ok = window.confirm(
			__("Reset Dynamic Feed settings to defaults?", "cs-wordpress-blocks"),
		);
		if (!ok) return;

		setAttributes({
			...DEFAULT_ATTRIBUTES,
			// bump so a future SSR preview refreshes even if defaults match current state
			refreshKey: (refreshKey || 0) + 1,
		});
	};

	const bumpRefresh = () => {
		setAttributes({ refreshKey: (refreshKey || 0) + 1 });
	};

	return (
		<BlockControls>
			<ToolbarGroup label={__("View", "cs-wordpress-blocks")}>
				<ToolbarButton
					icon={listView}
					label={__("List view", "cs-wordpress-blocks")}
					isPressed={viewStyle === "list"}
					onClick={() => setAttributes({ viewStyle: "list" })}
				/>
				<ToolbarButton
					icon={grid}
					label={__("Card view", "cs-wordpress-blocks")}
					isPressed={viewStyle === "cards"}
					onClick={() => setAttributes({ viewStyle: "cards" })}
				/>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon="ellipsis"
					label={__("Dynamic Feed actions", "cs-wordpress-blocks")}
					controls={[
						{
							title: __("Refresh preview", "cs-wordpress-blocks"),
							icon: "update",
							onClick: bumpRefresh,
						},
						{
							title: __("Reset to defaults", "cs-wordpress-blocks"),
							icon: "undo",
							onClick: resetToDefaults,
						},
					]}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}
