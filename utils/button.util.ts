// REACT NATIVE //
import { TextStyle, ViewStyle } from "react-native";

// STYLES //
import tokens from "../infrastructure/theme/tokens/designTokens";

/** Combine styles for a button and its text */
const getButtonComponentStyles = (
	size: string,
	mode: string,
	type: string,
	buttonStyle: string,
	disabled: boolean,
	iconPosition: string // Add iconPosition as a parameter
): {
	btnStyle: ViewStyle;
	textStyle: TextStyle;
	iconStyle: ViewStyle;
} => {
	// Get button text style and padding based on size
	const {
		buttonTextStyle,
		buttonStyle: buttonPadding,
		iconStyle: defaultIconStyle,
	} = getSizeStyles(size);

	// Get mode styles based on mode
	const modeStyles = getModeStyles(mode);

	// Get button color and text color styles based on type and button style
	const { buttonColorStyle, textColorStyle, iconColorStyle } = getColorStyles(
		type,
		buttonStyle,
		disabled
	);

	// Combine button styles
	const btnStyle: ViewStyle = {
		...buttonPadding,
		...modeStyles,
		...buttonColorStyle,
		flexDirection: iconPosition === "left" ? "row" : "row-reverse",
	};

	// Combine text styles
	const textStyle: TextStyle = {
		...buttonTextStyle,
		...textColorStyle,
	};

	// Combine Icon styles
	const iconStyle: ViewStyle = {
		...defaultIconStyle,
		...iconColorStyle,
		...getIconPositionStyles(iconPosition),
	};

	return { btnStyle, textStyle, iconStyle };
};

/** Function to generate icon position styles */
const getIconPositionStyles = (iconPosition: string): ViewStyle => {
	switch (iconPosition) {
		case "left":
			return { marginRight: tokens.SPACE_XS, marginBottom: tokens.SPACE_S };
		case "right":
			return { marginLeft: tokens.SPACE_XS };
		default:
			return {};
	}
};

/** Function to generate size styles */
const getSizeStyles = (
	size: string
): {
	buttonTextStyle: TextStyle;
	buttonStyle: ViewStyle;
	iconStyle: ViewStyle;
} => {
	let buttonTextStyle: TextStyle = {};
	let buttonStyle: ViewStyle = {};
	let iconStyle: ViewStyle = {};
	switch (size) {
		// Small Button
		case "small":
			buttonTextStyle = { ...(tokens.COMPONENT_BUTTON_SM as TextStyle) };
			buttonStyle = { padding: tokens.SPACE_M };
			iconStyle = { width: tokens.SIZE_1, height: tokens.SIZE_1 };
			break;

		// Medium Button
		case "medium":
		default:
			buttonTextStyle = { ...(tokens.COMPONENT_BUTTON_MD as TextStyle) };
			buttonStyle = { padding: tokens.SPACE_L };
			iconStyle = { width: tokens.SIZE_1, height: tokens.SIZE_1 };
			break;

		// Large Button
		case "large":
			buttonTextStyle = { ...(tokens.COMPONENT_BUTTON_LRG as TextStyle) };
			buttonStyle = { padding: tokens.SPACE_L };
			iconStyle = { width: tokens.SIZE_1, height: tokens.SIZE_1 };
			break;
	}
	return { buttonTextStyle, buttonStyle, iconStyle };
};

/** Function to generate mode styles */
const getModeStyles = (mode: string): ViewStyle => {
	switch (mode) {
		// Block Button
		case "block":
		default:
			return { width: "100%" };

		// Inline Button
		case "inline":
			return { alignSelf: "flex-start" };
	}
};

/** Function to generate Color & Type styles */
const getColorStyles = (
	type: string,
	buttonStyle: string,
	disabled: boolean
): {
	buttonColorStyle: ViewStyle;
	textColorStyle: TextStyle;
	iconColorStyle: ViewStyle;
} => {
	let buttonColorStyle: ViewStyle = {};
	let textColorStyle: TextStyle = {};
	let iconColorStyle: TextStyle = {};
	switch (buttonStyle) {
		// Filled Button
		case "filled":
		default:
			switch (type) {
				// CTA Filled Button
				case "cta":
				default:
					buttonColorStyle = {
						backgroundColor: disabled
							? tokens.ACTION_DISABLED_FILL_BG
							: tokens.ACTION_CTA_FILL_BG_DEFAULT,
					};
					textColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FILL_FG
							: tokens.ACTION_CTA_FILL_FG,
					};
					iconColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FG
							: tokens.ACTION_CTA_FG_DEFAULT,
					};
					break;

				// Neutral Filled Button
				case "neutral":
					buttonColorStyle = {
						backgroundColor: disabled
							? tokens.ACTION_DISABLED_FILL_BG
							: tokens.ACTION_NEUTRAL_FILL_BG_DEFAULT,
					};
					textColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FILL_FG
							: tokens.ACTION_NEUTRAL_FILL_FG,
					};
					iconColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FILL_FG
							: tokens.ACTION_NEUTRAL_FILL_FG,
					};
					break;

				// On Dark Filled Button
				case "onDark":
					buttonColorStyle = {
						backgroundColor: disabled
							? tokens.ACTION_DISABLED_FILL_BG
							: tokens.ACTION_ONDARK_FILL_BG_DEFAULT,
					};
					textColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FILL_FG
							: tokens.ACTION_ONDARK_FILL_FG,
					};
					iconColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FILL_FG
							: tokens.ACTION_ONDARK_FILL_FG,
					};
					break;

				// Danger Filled Button
				case "danger":
					buttonColorStyle = {
						backgroundColor: disabled
							? tokens.ACTION_DISABLED_FILL_BG
							: tokens.ACTION_DANGER_FILL_BG_DEFAULT,
					};
					textColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FILL_FG
							: tokens.ACTION_DANGER_FILL_FG,
					};
					iconColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FILL_FG
							: tokens.ACTION_DANGER_FILL_FG,
					};
					break;
			}
			break;

		// Outline Button
		case "outline":
			switch (type) {
				// CTA Outline Button
				case "cta":
					buttonColorStyle = {
						...(disabled
							? tokens.ACTION_DISABLED_BDR
							: (tokens.ACTION_CTA_BDR_DEFAULT as ViewStyle)),
					};
					textColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FG
							: tokens.ACTION_CTA_FG_DEFAULT,
					};
					iconColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FG
							: tokens.ACTION_CTA_FG_DEFAULT,
					};
					break;

				// Neutral Outline Button
				case "neutral":
					buttonColorStyle = {
						...(disabled
							? tokens.ACTION_DISABLED_BDR
							: (tokens.ACTION_NEUTRAL_BDR_DEFAULT as ViewStyle)),
					};
					textColorStyle = {
						color: disabled ? tokens.ACTION_DISABLED_FG : tokens.ACTION_NEUTRAL_FG,
					};
					iconColorStyle = {
						color: disabled ? tokens.ACTION_DISABLED_FG : tokens.ACTION_NEUTRAL_FG,
					};
					break;

				// On Dark Outline Button
				case "onDark":
					buttonColorStyle = {
						...(disabled
							? tokens.ACTION_DISABLED_BDR
							: (tokens.ACTION_ONDARK_BDR_DEFAULT as ViewStyle)),
					};
					textColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FG
							: tokens.ACTION_ONDARK_FG_DEFAULT,
					};
					iconColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FG
							: tokens.ACTION_ONDARK_FG_DEFAULT,
					};
					break;

				// Danger Outline Button
				case "danger":
					buttonColorStyle = {
						...(disabled
							? tokens.ACTION_DISABLED_BDR
							: (tokens.ACTION_DANGER_BDR_DEFAULT as ViewStyle)),
					};
					textColorStyle = {
						color: disabled ? tokens.ACTION_DISABLED_FG : tokens.ACTION_DANGER_FG,
					};
					iconColorStyle = {
						color: disabled ? tokens.ACTION_DISABLED_FG : tokens.ACTION_DANGER_FG,
					};
					break;
			}
			break;

		// Text Button
		case "text":
			switch (type) {
				// CTA Text Button
				case "cta":
				default:
					buttonColorStyle = {
						backgroundColor: "transparent",
					};
					textColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FG
							: tokens.ACTION_CTA_FG_DEFAULT,
					};
					iconColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FG
							: tokens.ACTION_CTA_FG_DEFAULT,
					};
					break;

				// Neutral Text Button
				case "neutral":
					buttonColorStyle = {
						backgroundColor: "transparent",
					};
					textColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FILL_FG
							: tokens.ACTION_NEUTRAL_FG,
					};
					iconColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FILL_FG
							: tokens.ACTION_NEUTRAL_FG,
					};
					break;

				// On Dark Text Button
				case "onDark":
					buttonColorStyle = {
						backgroundColor: "transparent",
					};
					textColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FG
							: tokens.ACTION_ONDARK_FG_DEFAULT,
					};
					iconColorStyle = {
						color: disabled
							? tokens.ACTION_DISABLED_FG
							: tokens.ACTION_ONDARK_FG_DEFAULT,
					};
					break;

				// Danger Text Button
				case "danger":
					buttonColorStyle = {
						backgroundColor: "transparent",
					};
					textColorStyle = {
						color: disabled ? tokens.ACTION_DISABLED_FG : tokens.ACTION_DANGER_FG,
					};
					iconColorStyle = {
						color: disabled ? tokens.ACTION_DISABLED_FG : tokens.ACTION_DANGER_FG,
					};
					break;
			}
			break;
	}
	return { buttonColorStyle, textColorStyle, iconColorStyle };
};

export { getButtonComponentStyles };
