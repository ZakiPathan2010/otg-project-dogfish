// REACT NATIVE //
import { TextStyle, ViewStyle } from "react-native";

// STYLES //
import tokens from "../infrastructure/theme/tokens/designTokens";

interface LearningUnitStatusConfigData {
	[key: number]: {
		bg_color: ViewStyle;
		title_color: TextStyle;
		timing_color: TextStyle;
	};
}

const LearningUnitStatusConfig: LearningUnitStatusConfigData = {
	1: {
		bg_color: {
			backgroundColor: tokens.LAYOUT_COMPONENT_BG_SUBTLE,
		},
		title_color: {
			color: tokens.LAYOUT_CONTENT_PRIMARY,
		},
		timing_color: {
			color: tokens.LAYOUT_CONTENT_SECONDARY,
		},
	},
	// In Progress
	2: {
		bg_color: {
			backgroundColor: tokens.FEEDBACK_INFO_MEDIUM_FILL_BG,
		},
		title_color: {
			color: tokens.FEEDBACK_INFO_MEDIUM_FILL_FG,
		},
		timing_color: {
			color: tokens.FEEDBACK_INFO_FG,
		},
	},

	// Completed
	3: {
		bg_color: {
			backgroundColor: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_BG,
		},
		title_color: {
			color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_FG,
		},
		timing_color: {
			color: tokens.FEEDBACK_SUCCESS_FG,
		},
	},
	4: {
		bg_color: {
			backgroundColor: tokens.ACTION_DISABLED_BG,
		},
		title_color: {
			color: tokens.LAYOUT_CONTENT_TERTIARY,
		},
		timing_color: {
			color: tokens.LAYOUT_CONTENT_TERTIARY,
		},
	},
};

/** Get Learning Unit Card Styles */
const getLearningUnitCardStyles = (status: number) => {
	// Update the type of status to number
	return LearningUnitStatusConfig[status] || {};
};

export default getLearningUnitCardStyles;
