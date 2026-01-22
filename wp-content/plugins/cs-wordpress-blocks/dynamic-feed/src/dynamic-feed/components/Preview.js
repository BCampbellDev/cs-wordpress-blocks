import { __ } from "@wordpress/i18n";
import { ToggleControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";

export default function Preview({ attributes }) {
	const {
		postType,
		taxonomy,
		termIds,
		orderBy,
		order,
		limit,
		viewStyle,
		refreshKey,
	} = attributes;

	const blockProps = useBlockProps({
		className: `cs-dynamic-feed cs-dynamic-feed--${viewStyle || "list"}`,
	});

	const [toggled, setToggled] = useState(false);

	return (
		<div {...blockProps}>
			<strong>{__("Dynamic Feed", "cs-wordpress-blocks")}</strong>

			<ToggleControl
				checked={toggled}
				label={toggled ? " Hide Block Settings" : " Show Block Settings"}
				onChange={() => {
					setToggled(!toggled);
				}}
			/>

			{toggled && (
				<div style={{ marginTop: 8, opacity: 0.85 }}>
					<div>
						{__("Post type:", "cs-wordpress-blocks")} <code>{postType}</code>
					</div>
					<div>
						{__("Taxonomy:", "cs-wordpress-blocks")} <code>{taxonomy}</code>
					</div>
					<div>
						{__("Terms:", "cs-wordpress-blocks")}{" "}
						<code>
							{termIds?.length
								? termIds.join(", ")
								: __("none", "cs-wordpress-blocks")}
						</code>
					</div>
					<div>
						{__("Order:", "cs-wordpress-blocks")}{" "}
						<code>
							{orderBy} {order}
						</code>
					</div>
					<div>
						{__("Limit:", "cs-wordpress-blocks")} <code>{limit}</code>
					</div>
					<div>
						{__("View:", "cs-wordpress-blocks")} <code>{viewStyle}</code>
					</div>
				</div>
			)}

			<div style={{ marginTop: 12 }}>
				<ServerSideRender
					block="cs/dynamic-feed"
					attributes={{
						...attributes,
						// Ensures the SSR component re-fetches when you click “Refresh preview”
						refreshKey: refreshKey || 0,
					}}
				/>
			</div>
		</div>
	);
}
