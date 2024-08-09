// REACT NATIVE //
import { TextStyle, ViewStyle } from "react-native";

// STYLES //
import tokens from "../infrastructure/theme/tokens/designTokens";
import { SvgProps } from "react-native-svg";

// SVG's //
import SuccessIcon from "../assets/icons/success.svg";
import AlertIcon from "../assets/icons/alert.svg";
import WarningIcon from "../assets/icons/warning.svg";
import InfoIcon from "../assets/icons/info.svg";

/** Combine styles for a Alert and its text */
const getAlertComponentStyles = (
	type: string,
	color: string,
	size: string
): {
	alertStyle: ViewStyle;
	titleTextStyle: TextStyle;
	descriptionTextStyle: TextStyle;
	iconStyle: TextStyle;
} => {
	// Get color styles based on type and color
	const {
		alertColorStyle,
		titleColorStyle,
		descriptionColorStyle,
		iconColorStyle,
	} = getColorStyles(type, color);

	// Get size styles based on size
	const {
		alertStyle: sizeAlertStyle,
		titleStyle,
		descriptionStyle,
		iconStyle: sizeIconStyle,
	} = getSizeStyles(size);

	// Combine Alert styles
	const alertStyle: ViewStyle = {
		...sizeAlertStyle,
		...alertColorStyle,
		borderRadius: type === "toast" || type === "inPage" ? tokens.RADIUS_M : 0,
	};

	// Combine title text styles
	const titleTextStyle: TextStyle = {
		...titleStyle,
		...titleColorStyle,
	};

	// Combine description text styles
	const descriptionTextStyle: TextStyle = {
		...descriptionStyle,
		...descriptionColorStyle,
	};

	// Combine icon styles
	const iconStyle: ViewStyle = {
		...sizeIconStyle,
		...iconColorStyle,
	};

	return {
		alertStyle,
		titleTextStyle,
		descriptionTextStyle,
		iconStyle,
	};
};

/** Define a function to map colors to icons */
const getIconComponent = (
	color: string
): React.ComponentType<SvgProps> | null => {
	switch (color) {
		case "success":
			return SuccessIcon;
		case "info":
			return InfoIcon;
		case "warning":
			return WarningIcon;
		case "error":
			return AlertIcon;
		default:
			return null;
	}
};

/** Function to generate mode styles */
const getColorStyles = (
	type: string,
	color: string
): {
	alertColorStyle: ViewStyle;
	titleColorStyle: TextStyle;
	descriptionColorStyle: TextStyle;
	iconColorStyle: TextStyle;
} => {
	let alertColorStyle: ViewStyle = {};
	let titleColorStyle: TextStyle = {};
	let descriptionColorStyle: TextStyle = {};
	let iconColorStyle: TextStyle = {};

	switch (type) {
		// BANNER
		case "banner":
			// Switch case for color
			switch (color) {
				// Banner Success
				case "success":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_SUCCESS_STRONG_FILL_BG,
					};

					titleColorStyle = { color: tokens.FEEDBACK_SUCCESS_STRONG_FILL_FG };

					descriptionColorStyle = { color: tokens.FEEDBACK_SUCCESS_STRONG_FILL_FG };

					iconColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_STRONG_FILL_EMP,
					};
					break;

				// Banner Info
				case "info":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_INFO_STRONG_FILL_BG,
					};

					titleColorStyle = { color: tokens.FEEDBACK_INFO_STRONG_FILL_FG };

					descriptionColorStyle = { color: tokens.FEEDBACK_INFO_STRONG_FILL_FG };

					iconColorStyle = {
						color: tokens.FEEDBACK_INFO_STRONG_FILL_EMP,
					};
					break;

				// Banner Warning
				case "warning":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_WARNING_STRONG_FILL_BG,
					};

					titleColorStyle = { color: tokens.FEEDBACK_WARNING_STRONG_FILL_FG };

					descriptionColorStyle = { color: tokens.FEEDBACK_WARNING_STRONG_FILL_FG };

					iconColorStyle = {
						color: tokens.FEEDBACK_WARNING_STRONG_FILL_EMP,
					};
					break;

				// Banner Error
				case "error":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_ERROR_STRONG_FILL_BG,
					};

					titleColorStyle = { color: tokens.FEEDBACK_ERROR_STRONG_FILL_FG };

					descriptionColorStyle = { color: tokens.FEEDBACK_ERROR_STRONG_FILL_FG };

					iconColorStyle = {
						color: tokens.FEEDBACK_ERROR_STRONG_FILL_EMP,
					};
					break;

				default:
					break;
			}
			break;

		// INPAGE
		case "inPage":
			// Switch case for inPage type
			switch (color) {
				// InPage Success
				case "success":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_BG,
					};

					titleColorStyle = { color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_FG };

					descriptionColorStyle = { color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_FG };

					iconColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_EMP,
					};
					break;

				// InPage Info
				case "info":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_INFO_MEDIUM_FILL_BG,
					};

					titleColorStyle = { color: tokens.FEEDBACK_INFO_MEDIUM_FILL_FG };

					descriptionColorStyle = { color: tokens.FEEDBACK_INFO_MEDIUM_FILL_FG };

					iconColorStyle = {
						color: tokens.FEEDBACK_INFO_MEDIUM_FILL_EMP,
					};
					break;

				// InPage Warning
				case "warning":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_WARNING_MEDIUM_FILL_BG,
					};

					titleColorStyle = { color: tokens.FEEDBACK_WARNING_MEDIUM_FILL_FG };

					descriptionColorStyle = { color: tokens.FEEDBACK_WARNING_MEDIUM_FILL_FG };

					iconColorStyle = {
						color: tokens.FEEDBACK_WARNING_MEDIUM_FILL_EMP,
					};
					break;

				// InPage Error
				case "error":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_ERROR_MEDIUM_FILL_BG,
					};

					titleColorStyle = { color: tokens.FEEDBACK_ERROR_MEDIUM_FILL_FG };

					descriptionColorStyle = { color: tokens.FEEDBACK_ERROR_MEDIUM_FILL_FG };

					iconColorStyle = {
						color: tokens.FEEDBACK_ERROR_MEDIUM_FILL_EMP,
					};
					break;

				default:
					break;
			}
			break;

		// TOAST
		case "toast":
			// Switch case for toast type
			switch (color) {
				// Toast Success
				case "success":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_SUCCESS_BG,
					};

					titleColorStyle = { color: tokens.LAYOUT_CONTENT_PRIMARY };

					descriptionColorStyle = { color: tokens.LAYOUT_CONTENT_PRIMARY };

					iconColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_EMP,
					};
					break;

				// Toast Info
				case "info":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_INFO_BG,
					};

					titleColorStyle = { color: tokens.LAYOUT_CONTENT_PRIMARY };

					descriptionColorStyle = { color: tokens.LAYOUT_CONTENT_PRIMARY };

					iconColorStyle = {
						color: tokens.FEEDBACK_INFO_EMP,
					};
					break;

				// Toast Warning
				case "warning":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_WARNING_BG,
					};

					titleColorStyle = { color: tokens.LAYOUT_CONTENT_PRIMARY };

					descriptionColorStyle = { color: tokens.LAYOUT_CONTENT_PRIMARY };

					iconColorStyle = {
						color: tokens.FEEDBACK_WARNING_EMP,
					};
					break;

				// Toast Error
				case "error":
					alertColorStyle = {
						backgroundColor: tokens.FEEDBACK_ERROR_BG,
					};

					titleColorStyle = { color: tokens.LAYOUT_CONTENT_PRIMARY };

					descriptionColorStyle = { color: tokens.LAYOUT_CONTENT_PRIMARY };

					iconColorStyle = {
						color: tokens.FEEDBACK_ERROR_EMP,
					};
					break;

				default:
					break;
			}
			break;
		default:
			break;
	}

	return {
		alertColorStyle,
		titleColorStyle,
		descriptionColorStyle,
		iconColorStyle,
	};
};

/** Function to generate size styles */
const getSizeStyles = (
	size: string
): {
	alertStyle: ViewStyle;
	titleStyle: TextStyle;
	descriptionStyle: TextStyle;
	iconStyle: TextStyle;
} => {
	let alertStyle: ViewStyle = {};
	let titleStyle: TextStyle = {};
	let descriptionStyle: TextStyle = {};
	let iconStyle: TextStyle = {};
	switch (size) {
		// Small Button
		case "small":
			alertStyle = { padding: tokens.SPACE_M };
			titleStyle = {
				fontFamily: "ibm-plex-sans-medium",
				fontSize: tokens.FONT_SIZE_2,
				fontWeight: tokens.FONT_WEIGHTS_MEDIUM,
			};
			descriptionStyle = {
				fontFamily: tokens.FONT_FAMILIES_BODY,
				fontSize: tokens.FONT_SIZE_2,
				fontWeight: tokens.FONT_WEIGHTS_REGULAR,
			};
			iconStyle = { width: tokens.SIZE_1, height: tokens.SIZE_1 };
			break;

		// Medium Button
		case "medium":
		default:
			alertStyle = { padding: tokens.SPACE_L };
			titleStyle = {
				fontFamily: "ibm-plex-sans-medium",
				fontSize: tokens.FONT_SIZE_3,
				fontWeight: tokens.FONT_WEIGHTS_MEDIUM,
			};
			descriptionStyle = {
				fontFamily: tokens.FONT_FAMILIES_BODY,
				fontSize: tokens.FONT_SIZE_2,
				fontWeight: tokens.FONT_WEIGHTS_REGULAR,
			};
			iconStyle = { width: tokens.SIZE_2, height: tokens.SIZE_2 };
			break;
	}
	return { alertStyle, titleStyle, descriptionStyle, iconStyle };
};

export { getAlertComponentStyles, getIconComponent };
