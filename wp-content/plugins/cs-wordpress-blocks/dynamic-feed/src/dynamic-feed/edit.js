import { InspectorControls } from "@wordpress/block-editor";

import SourcePanel from "./components/SourcePanel";
import SortLimitPanel from "./components/SortLimitPanel";
import DisplayPanel from "./components/DisplayPanel";
import Preview from "./components/Preview";
import Toolbar from "./components/Toolbar";

export default function Edit({ attributes, setAttributes }) {
	return (
		<>
			<Toolbar attributes={attributes} setAttributes={setAttributes} />

			<InspectorControls>
				<SourcePanel attributes={attributes} setAttributes={setAttributes} />
				<SortLimitPanel attributes={attributes} setAttributes={setAttributes} />
				<DisplayPanel attributes={attributes} setAttributes={setAttributes} />
			</InspectorControls>

			<Preview attributes={attributes} />
		</>
	);
}
