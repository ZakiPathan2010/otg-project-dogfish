// REACT NATIVE //
import { TextStyle, ViewStyle } from "react-native";

// STYLES //
import tokens from "../infrastructure/theme/tokens/designTokens";

/** Combine styles for a chip and its text */
const getChipComponentStyles = (
	size: string,
	color: string,
	chipStyle: string,
	shape: string
): {
	chipStyle: ViewStyle;
	chipTextStyle: TextStyle;
	iconStyle: TextStyle;
} => {
	// Get size-related styles for chip
	const { chipStyle: sizeStyle, chipTextStyle, iconStyle } = getSizeStyles(size);

	// Get color-related styles for chip
	const { chipColorStyle, textColorStyle, iconColorStyle } = getColorStyles(
		color,
		chipStyle
	);

	// Get shape-related styles for chip
	const shapeStyle = getShapeStyles(shape);

	// Combine chip styles
	const chipCombinedStyle: ViewStyle = {
		...sizeStyle,
		...chipColorStyle,
		...shapeStyle,
	};

	// Combine text styles
	const textStyle: TextStyle = {
		...chipTextStyle,
		...textColorStyle,
	};

	// Combine Icon styles
	const iconCombinedStyle: TextStyle = {
		...iconStyle,
		...iconColorStyle,
	};

	return {
		chipStyle: chipCombinedStyle,
		chipTextStyle: textStyle,
		iconStyle: iconCombinedStyle,
	};
};

/** Function to generate shape styles */
const getShapeStyles = (shape: string): ViewStyle => {
	switch (shape) {
		case "round":
			return { borderRadius: 20 };
		case "square":
		default:
			return { borderRadius: 6 };
	}
};

/** Function to generate size styles */
const getSizeStyles = (
	size: string
): { chipTextStyle: TextStyle; chipStyle: ViewStyle; iconStyle: TextStyle } => {
	let chipTextStyle: TextStyle = {};
	let chipStyle: ViewStyle = {};
	let iconStyle: TextStyle = {};
	switch (size) {
		// X-Small Chip
		case "xSmall":
			chipTextStyle = {
				fontFamily: "ibm-plex-sans-semibold",
				fontSize: tokens.FONT_SIZE_0,
				fontWeight: tokens.FONT_WEIGHTS_SEMIBOLD,
				lineHeight: tokens.LINE_HEIGHTS_NONE * tokens.FONT_SIZE_0,
			};
			chipStyle = { height: 16 };
			iconStyle = { width: 10, height: 10 };
			break;

		// Small Chip
		case "small":
			chipTextStyle = {
				fontFamily: "ibm-plex-sans-semibold",
				fontSize: tokens.FONT_SIZE_0,
				fontWeight: tokens.FONT_WEIGHTS_SEMIBOLD,
				lineHeight: tokens.LINE_HEIGHTS_NONE * tokens.FONT_SIZE_0,
				paddingHorizontal: tokens.SPACE_M,
			};
			chipStyle = { height: 22 };
			iconStyle = { width: 13, height: 13 };
			break;

		// Medium Chip
		case "medium":
		default:
			chipTextStyle = {
				fontFamily: "ibm-plex-sans-medium",
				fontSize: tokens.FONT_SIZE_0,
				fontWeight: tokens.FONT_WEIGHTS_MEDIUM,
				lineHeight: tokens.LINE_HEIGHTS_NONE * tokens.FONT_SIZE_0,
			};
			chipStyle = { height: 24 };
			iconStyle = { width: 16, height: 16 };
			break;

		// Large Chip
		case "large":
			chipTextStyle = {
				fontFamily: "ibm-plex-sans-medium",
				fontSize: tokens.FONT_SIZE_1,
				fontWeight: tokens.FONT_WEIGHTS_MEDIUM,
				lineHeight: tokens.LINE_HEIGHTS_NONE * tokens.FONT_SIZE_1,
				paddingHorizontal: tokens.SPACE_M,
			};
			chipStyle = { height: 28 };
			iconStyle = { width: 20, height: 20 };
			break;
	}
	return { chipTextStyle, chipStyle, iconStyle };
};

/** Function to generate Color & Type styles */
const getColorStyles = (
	type: string,
	chipStyle: string
): {
	chipColorStyle: ViewStyle;
	textColorStyle: TextStyle;
	iconColorStyle: TextStyle;
} => {
	let chipColorStyle: ViewStyle = {};
	let textColorStyle: TextStyle = {};
	let iconColorStyle: TextStyle = {};
	switch (chipStyle) {
		// Filled Button
		case "filled":
		default:
			switch (type) {
				// DEFAULT Filled Chip
				case "default":
				default:
					chipColorStyle = {
						backgroundColor: tokens.ACTION_STANDARD_FILL_BG_DEFAULT,
					};
					textColorStyle = {
						color: tokens.ACTION_STANDARD_FILL_FG_DEFAULT,
					};
					iconColorStyle = {
						color: tokens.ACTION_STANDARD_FILL_EMP_DEFAULT,
					};
					break;

				// SUCCESS Filled Chip
				case "success":
					chipColorStyle = {
						backgroundColor: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_BG,
					};
					textColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_FG,
					};
					iconColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_EMP,
					};
					break;

				// INFO Filled Chip
				case "info":
					chipColorStyle = {
						backgroundColor: tokens.FEEDBACK_INFO_MEDIUM_FILL_BG,
					};
					textColorStyle = {
						color: tokens.FEEDBACK_INFO_MEDIUM_FILL_FG,
					};
					iconColorStyle = {
						color: tokens.FEEDBACK_INFO_MEDIUM_FILL_EMP,
					};
					break;

				// WARNING Filled Chip
				case "warning":
					chipColorStyle = {
						backgroundColor: tokens.FEEDBACK_WARNING_MEDIUM_FILL_BG,
					};
					textColorStyle = {
						color: tokens.FEEDBACK_WARNING_MEDIUM_FILL_FG,
					};
					iconColorStyle = {
						color: tokens.FEEDBACK_WARNING_MEDIUM_FILL_EMP,
					};
					break;

				// ERROR Filled Chip
				case "error":
					chipColorStyle = {
						backgroundColor: tokens.FEEDBACK_ERROR_MEDIUM_FILL_BG,
					};
					textColorStyle = {
						color: tokens.FEEDBACK_ERROR_MEDIUM_FILL_FG,
					};
					iconColorStyle = {
						color: tokens.FEEDBACK_ERROR_MEDIUM_FILL_EMP,
					};
					break;
			}
			break;

		// Outline Button
		case "outline":
			switch (type) {
				// DEFAULT Outline Button
				case "default":
					chipColorStyle = {
						...tokens.ACTION_STANDARD_BDR_DEFAULT,
					};
					textColorStyle = {
						color: tokens.ACTION_STANDARD_FILL_FG_DEFAULT,
					};
					iconColorStyle = {
						color: tokens.ACTION_STANDARD_FILL_EMP_DEFAULT,
					};
					break;

				case "success":
					chipColorStyle = {
						borderColor: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_EMP,
						borderWidth: 1,
						borderStyle: "solid",
					};
					textColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_FG,
					};
					iconColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_EMP,
					};
					break;

				case "info":
					chipColorStyle = {
						borderColor: tokens.FEEDBACK_INFO_MEDIUM_FILL_EMP,
						borderWidth: 1,
						borderStyle: "solid",
					};
					textColorStyle = {
						color: tokens.FEEDBACK_INFO_MEDIUM_FILL_FG,
					};
					iconColorStyle = {
						color: tokens.FEEDBACK_INFO_MEDIUM_FILL_EMP,
					};
					break;

				case "warning":
					chipColorStyle = {
						borderColor: tokens.FEEDBACK_WARNING_MEDIUM_FILL_EMP,
						borderWidth: 1,
						borderStyle: "solid",
					};
					textColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_FG,
					};
					iconColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_EMP,
					};
					break;

				case "error ":
					chipColorStyle = {
						borderColor: tokens.FEEDBACK_ERROR_MEDIUM_FILL_EMP,
						borderWidth: 1,
						borderStyle: "solid",
					};
					textColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_FG,
					};
					iconColorStyle = {
						color: tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_EMP,
					};
			}
			break;
	}
	return { chipColorStyle, textColorStyle, iconColorStyle };
};

export { getChipComponentStyles };
