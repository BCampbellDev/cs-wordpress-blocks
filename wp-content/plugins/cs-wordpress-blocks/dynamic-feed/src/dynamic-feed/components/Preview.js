import { __ } from "@wordpress/i18n";
import {
	ToggleControl,
	Placeholder,
	Spinner,
	Flex,
	FlexItem,
	Card,
	CardMedia,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
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

	const hasTerms =
		Array.isArray(attributes.termIds) && attributes.termIds.length > 0;

	if (!hasTerms) {
		return (
			<Placeholder label="Dynamic Feed">
				Select one or more terms in the sidebar to preview posts.
			</Placeholder>
		);
	}

	return (
		<div {...blockProps}>
			<Flex direction="row" align="center" justify="flex-start">
				<FlexItem>
					<strong>{__("Dynamic Feed", "cs-wordpress-blocks")}</strong>
				</FlexItem>
				<FlexItem>
					<ToggleControl
						checked={toggled}
						className="dynamic-feed-show-settings-toggle"
						label={toggled ? " Hide Block Settings" : " Show Block Settings"}
						onChange={() => {
							setToggled(!toggled);
						}}
					/>
				</FlexItem>
			</Flex>

			{toggled && (
				<Card>
					<CardMedia>
						<div
							style={{
								border: "solid 1px black",
								borderRadius: 10,
								padding: 16,
							}}
						>
							<div style={{ marginTop: 8, opacity: 0.85 }}>
								<div>
									{__("Post type:", "cs-wordpress-blocks")}{" "}
									<code>{postType}</code>
								</div>
								<div>
									{__("Taxonomy:", "cs-wordpress-blocks")}{" "}
									<code>{taxonomy}</code>
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
						</div>
					</CardMedia>
				</Card>
			)}

			<div style={{ marginTop: 12 }}>
				<ServerSideRender
					block="cs/dynamic-feed"
					LoadingResponsePlaceholder={() => <Spinner />}
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
