// REACT //
import React from "react";

// REACT NATIVE //
import { StyleSheet, View, Text } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// UTILS //
import {
	getAlertComponentStyles,
	getIconComponent,
} from "../../utils/alert.util";

interface AlertProps {
	title: string;
	type: "banner" | "inPage" | "toast";
	color?: "success" | "info" | "warning" | "error";
	size?: "small" | "medium";
	description?: string;
}

/** Alert Component */
const Alert: React.FC<AlertProps> = ({
	title = "",
	type = "inPage",
	color = "error",
	size = "medium",
	description = "",
}) => {
	// Define States

	// Define Refs

	// Helper Functions
	const { alertStyle, titleTextStyle, descriptionTextStyle, iconStyle } =
		getAlertComponentStyles(type, color, size);

	// Get the icon component based on the color
	const IconComponent = getIconComponent(color);

	// Use Effect and Focus Effect

	return (
		<View
			style={[
				styles.alertWrap,
				alertStyle,
			]}
		>
			{/* Icon */}
			{IconComponent && (
				<View style={[styles.iconLeftStyles]}>
					<IconComponent
						color={iconStyle.color}
						height={iconStyle.height as number}
						width={iconStyle.width as number}
					/>
				</View>
			)}

			{/* Alert Content */}
			<View style={[styles.alertContent]}>
				{/* Title */}
				<Text style={[titleTextStyle]}>{title}</Text>

				{/* Description */}
				{description && <Text style={[descriptionTextStyle]}>{description}</Text>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	alertWrap: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	iconLeftStyles: {
		marginTop: tokens.SPACE_XS + 1,
	},
	alertContent: {
		marginLeft: tokens.SPACE_L + tokens.SPACE_XS,
		flex: 1,
		marginBottom: tokens.SPACE_XS,
	},
});

export default Alert;
