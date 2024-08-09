// REACT //
import React from "react";

// REACT NATIVE //
import { StyleSheet, View, Text } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// COMPONENTS //

// SVG's //

interface ProgressBarProps {
	progressPercentage: number;
	backgroundColor: string;
	foregroundColor: string;
	textColor: string;
}

/** Progress Bar Component */
const ProgressBar: React.FC<ProgressBarProps> = ({
	progressPercentage = 0,
	backgroundColor,
	foregroundColor,
	textColor,
}) => {
	// Define States

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<View style={styles.progressBarWrap}>
			{/* Progress Bar */}
			<View style={[styles.progressBar, { backgroundColor: backgroundColor }]}>
				<View
					style={[
						styles.progress,
						{
							width: `${progressPercentage}%`,
							backgroundColor: foregroundColor,
						},
					]}
				/>
			</View>

			<View style={styles.progressStatusWrap}>
				{/* Percentage */}
				<Text style={[styles.progressStatusCount, { color: textColor }]}>
					{progressPercentage}
				</Text>
				<Text style={[styles.progressPercentage, { color: textColor }]}>%</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	progressBarWrap: {
		flexDirection: "row",
		alignItems: "center",
	},
	progressBar: {
		width: "100%",
		height: tokens.SIZE_1 * 0.5,
		borderRadius: tokens.RADIUS_XL,
		overflow: "hidden",
		flex: 1,
	},
	progress: {
		height: "100%",
	},
	progressStatusWrap: {
		flexDirection: "row",
		marginLeft: tokens.SPACE_L,
		alignItems: "flex-end",
	},
	progressStatusCount: {
		fontFamily: "ibm-plex-sans-medium",
		fontSize: tokens.FONT_SIZE_2,
		fontWeight: tokens.FONT_WEIGHTS_MEDIUM,
	},
	progressPercentage: {
		fontFamily: "ibm-plex-sans-medium",
		fontSize: tokens.FONT_SIZE_0,
		fontWeight: tokens.FONT_WEIGHTS_MEDIUM,
	},
});

export default ProgressBar;
