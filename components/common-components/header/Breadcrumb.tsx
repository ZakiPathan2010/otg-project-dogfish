import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import tokens from "../../../infrastructure/theme/tokens/designTokens";

// STYLES //

// COMPONENTS //

// SERVICES //

// UTILS //

// PLUGINS //

// SVG's //
import BackArrow from "../../../assets/icons/arrow-back.svg";

interface BreadcrumbProps {
	text: string;
	onClick: () => void;
}

/** Common Header Component */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ text, onClick }) => {
	// Define States

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<TouchableOpacity style={styles.backButtonWrap} onPressIn={onClick} activeOpacity={0.5}>
			{/* Back Button */}
			<BackArrow color={tokens.ACTION_NEUTRAL_FG} />

			{/* BreadCrump Text */}
			<Text style={styles.breadCrumpText}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	backButtonWrap: {
		padding: tokens.SPACE_M,
		flexDirection: "row",
	},
	breadCrumpText: {
		marginLeft: tokens.SPACE_M,
		fontFamily: "ibm-plex-sans-medium",
		fontSize: tokens.FONT_SIZE_2,
		fontWeight: tokens.FONT_WEIGHTS_MEDIUM,
		color: tokens.LAYOUT_CONTENT_TERTIARY,
		flex: 1,
	},
});

export default Breadcrumb;
