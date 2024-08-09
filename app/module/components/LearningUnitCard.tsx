// REACT //
import React, { useMemo } from "react";

// REACT NATIVE //
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// STYLES //
import tokens from "../../../infrastructure/theme/tokens/designTokens";

// COMPONENTS //
import ChapterStatusChip from "./ChapterStatusChip";

// UTILS //
import getLearningUnitCardStyles from "../../../utils/learningUnitCard.util";

interface LearningUnitCardProps {
	status: number;
	name: string;
	duration: string;
}

/** Resume Container Component */
const LearningUnitCard: React.FC<LearningUnitCardProps> = ({
	status,
	name,
	duration,
}) => {
	// Define States

	// Define Memos
	const { bg_color, title_color, timing_color } = useMemo(
		() => getLearningUnitCardStyles(status),
		[status]
	);

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<TouchableOpacity
			style={[styles.cardContainer, bg_color]}
			activeOpacity={0.8}
		>
			<View style={styles.chapterDetails}>
				{/* Chapter Name */}
				<Text style={[styles.chapterName, title_color]}>{name}</Text>

				{/* Chapter Timing */}
				<Text style={[styles.percentageText, timing_color]}>{duration}</Text>
			</View>
			<View style={styles.chapterStatusDetails}>
				{/* Chapter Status Chip */}
				<ChapterStatusChip status={status} />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: tokens.UI_GREEN_150,
		padding: tokens.SPACE_XL,
		borderRadius: tokens.RADIUS_L,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: tokens.SPACE_M + tokens.SPACE_XS,
	},
	chapterDetails: {
		flex: 1,
	},
	chapterStatusDetails: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	chapterName: {
		...tokens.SUBTITLE_2,
		color: tokens.UI_BLACK,
	},
	percentageText: {
		...tokens.SUBTITLE_3,
		color: tokens.UI_GREEN_800,
		fontWeight: tokens.FONT_WEIGHTS_SEMIBOLD,
	},
	chapterDescription: {
		color: tokens.ACTION_ONDARK_FG_DEFAULT,
		...tokens.BODY_2,
	},
	moduleButtonWrap: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-end",
		padding: tokens.SPACE_S,
	},
	moduleButtonText: {
		...tokens.BODY_2,
		color: tokens.ACTION_ONDARK_FG_DEFAULT,
	},
	arrowIcon: {
		marginLeft: tokens.SPACE_M,
	},
});

export default LearningUnitCard;
