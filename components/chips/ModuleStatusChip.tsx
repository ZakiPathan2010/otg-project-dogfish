// REACT //
import React from "react";

// TYPES //
import { StatusConfigData } from "../../types/status";

// ENUMS //
import { Status } from "../../enums/e-learning.enum";

// COMPONENTS //
import Chip from "../common-components/Chip";

// SVG's //
import Success from "../../assets/icons/success.svg";
import InProgress from "../../assets/icons/in-progress.svg";
import NotStarted from "../../assets/icons/info-outline.svg";
import Locked from "../../assets/icons/lock.svg";

// Set up the Status Chip variations
const statusConfig: StatusConfigData = {
	1: { icon_name: NotStarted, bg_color: "default", text: "Not Started" },
	2: { icon_name: InProgress, bg_color: "info", text: "In Progress" },
	3: { icon_name: Success, bg_color: "success", text: "Completed" },
	4: { icon_name: Locked, bg_color: "default", text: "Locked" },
};

interface ModuleStatusChipProps {
	status?: Status;
}

/** Module Status Chip Component */
const ModuleStatusChip: React.FC<ModuleStatusChipProps> = ({ status = 1 }) => {
	// Define States

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<Chip
			size="xSmall"
			color={statusConfig[status].bg_color}
			text={statusConfig[status].text}
			iconName={statusConfig[status].icon_name}
		/>
	);
};

export default ModuleStatusChip;
