// REACT //
import React, { useMemo } from "react";

// REACT NATIVE //
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

// PLUGINS //
import { SvgProps } from "react-native-svg";

// STYLES //
import tokens from "../../../infrastructure/theme/tokens/designTokens";

// UTILS //
import { getButtonComponentStyles } from "../../../utils/button.util";

interface ButtonProps {
	disabled?: boolean;
	text: string;
	onClick?: () => void;
	size?: "small" | "medium" | "large";
	mode?: "block" | "inline";
	type?: "cta" | "neutral" | "onDark" | "danger";
	buttonStyle?: "outline" | "filled" | "text";
	iconName?: React.ComponentType<SvgProps> | null;
	iconPosition?: "left" | "right";
}

/** Button Component */
const Button: React.FC<ButtonProps> = ({
	disabled = false,
	text,
	onClick,
	size = "medium",
	mode = "inline",
	type = "cta",
	buttonStyle = "filled",
	iconName: IconComponent,
	iconPosition = "left",
}) => {
	// Define Refs

	// Define States

	// Define Memo
	// Use useMemo to memoize the combined styles
	const { btnStyle, textStyle, iconStyle } = useMemo(
		() =>
			getButtonComponentStyles(
				size,
				mode,
				type,
				buttonStyle,
				disabled,
				iconPosition
			),
		[size, mode, type, buttonStyle, disabled, iconPosition]
	);

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<TouchableOpacity
			onPress={() => {
				onClick && onClick();
			}}
			activeOpacity={0.8}
			style={[styles.commonButton, btnStyle]}
			disabled={disabled}
		>
			{/* Icon */}
			{IconComponent && (
				<View style={[styles.iconWrapper]}>
					<IconComponent style={iconStyle} />
				</View>
			)}

			{/* Button Text */}
			<Text style={[styles.commonButtonText, textStyle]}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	commonButton: {
		borderRadius: tokens.RADIUS_S,
		alignItems: "center",
		justifyContent: "center",
	},
	commonButtonText: {
		textAlign: "center",
		color: tokens.ACTION_CTA_FILL_FG,
	},
	iconWrapper: {
		marginHorizontal: tokens.SPACE_M,
	},
});

export default Button;
