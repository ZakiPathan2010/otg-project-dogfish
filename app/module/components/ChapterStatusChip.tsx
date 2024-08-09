// REACT //
import React from "react";

// TYPES //
import { StatusConfigData } from "../../../types/status";

// COMPONENTS //
import Chip from "../../../components/common-components/Chip";

// SVG's //
import Success from "../../../assets/icons/success.svg";
import InProgress from "../../../assets/icons/in-progress.svg";
import NotStarted from "../../../assets/icons/info.svg";
import Locked from "../../../assets/icons/lock.svg";

// Set up the Status Chip variations
const statusConfig: StatusConfigData = {
	1: { icon_name: NotStarted, bg_color: "info", text: "Not Started" },
	2: { icon_name: InProgress, bg_color: "info", text: "In Progress" },
	3: { icon_name: Success, bg_color: "success", text: "Completed" },
	4: { icon_name: Locked, bg_color: "default", text: "Locked" },
};

interface ChapterStatusChipProps {
	status: number;
}

/** Chapter Status Chip Component */
const ChapterStatusChip: React.FC<ChapterStatusChipProps> = ({ status }) => {
	// Define States

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<Chip
			shape="round"
			size="large"
			color={statusConfig[status].bg_color}
			text={statusConfig[status].text}
			iconName={statusConfig[status].icon_name}
			chipStyle="outline"
		/>
	);
};

export default ChapterStatusChip;
