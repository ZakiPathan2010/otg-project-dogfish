// REACT NATIVE //
import { StyleSheet } from "react-native";

// STYLES //
import tokens from "../../../infrastructure/theme/tokens/designTokens";

export const moduleDetailStyles = StyleSheet.create({
	moduleDetailContainer: {
		paddingBottom: 100,
	},
	headerImage: {
		height: 150,
		width: "100%",
	},
	imageContainer: {
		position: "relative",
	},
	gradientOverlay: {
		position: "absolute",
		height: 150,
		width: "100%",
		bottom: 0,
	},
	backButtonWrap: {
		padding: tokens.SPACE_M,
		alignItems: "center",
		justifyContent: "center",
	},
	breadCrumpWrap: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: tokens.SPACE_L,
	},
	breadCrumpText: {
		marginLeft: tokens.SPACE_M,
		fontFamily: "ibm-plex-sans-medium",
		fontSize: tokens.FONT_SIZE_2,
		fontWeight: tokens.FONT_WEIGHTS_MEDIUM,
		color: tokens.LAYOUT_CONTENT_TERTIARY,
	},
	moduleDetailCommonTitle: {
		...tokens.HEADING_03,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
		marginBottom: tokens.SPACE_M,
	},
	chaptersList: {
		marginTop: tokens.SPACE_M,
	},
	moduleDetailTitle: {
		...tokens.HEADING_02,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
	moduleItemWrap: {
		marginTop: tokens.SPACE_L * 2,
	},
	moduleDetailStyles: {},
	infoWrap: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: tokens.SPACE_M,
	},
	infoText: {
		marginLeft: tokens.SPACE_M,
		...tokens.BODY_2,
		color: tokens.ACTION_NEUTRAL_FG,
	},
	resumeContainerWrap: {},
	descriptorWrap: {
		marginTop: tokens.SPACE_XL * 2,
	},
	descriptorText: {
		textAlign: "center",
		marginBottom: tokens.SPACE_XL * 2,
		...tokens.HEADING_04,
		color: tokens.LAYOUT_CONTENT_SECONDARY,
	},
	eLearningCardWrap: {
		paddingBottom: tokens.SPACE_XL * 2,
	},
	eLearningCardItem: {
		marginBottom: tokens.SPACE_XL,
	},
	completeActivityDescription: {
		...tokens.SUBTITLE_2,
		color: tokens.LAYOUT_CONTENT_SECONDARY,
	},
	completeActivityInfo: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: tokens.SPACE_L * 2,
		justifyContent: "space-between",
	},
	completeActivityInfoText: {
		...tokens.BODY_1,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
	completeActivityInfoPercentage: {
		...tokens.HEADING_04,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
	moduleInfo: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	moduleInfoItem: {
		width: "50%",
		marginBottom: tokens.SPACE_XL,
	},
	moduleInfoTitle: {
		...tokens.BODY_2_SHORTFORM,
		color: tokens.LAYOUT_CONTENT_SECONDARY,
	},
	moduleInfoDescription: {
		...tokens.SUBTITLE_1,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
	completionHistoryWrap: {},
	completionHistoryItem: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: tokens.SPACE_M,
		justifyContent: "space-between",
	},
	completionHistoryInfo: {
		color: tokens.LAYOUT_CONTENT_PRIMARY,
		...tokens.BODY_2,
	},
	completionHistoryDate: {
		width: "40%",
	},
	completionHistoryScore: {
		width: "30%",
	},
	completionHistoryReport: {
		width: "20%",
	},
	completionHistoryDownload: {
		padding: tokens.SPACE_S,
	},
	activityChipWrap: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	activityChipItem: {
		marginRight: tokens.SPACE_XL,
		marginBottom: tokens.SPACE_XL,
	},
	regulationsWrap: {},
	regulationItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginTop: tokens.SPACE_M,
	},
	regulationDot: {
		width: 6,
		height: 6,
		borderRadius: 6,
		backgroundColor: tokens.LAYOUT_CONTENT_PRIMARY,
		marginRight: tokens.SPACE_L,
		marginTop: tokens.SPACE_M,
	},
	regulationDescription: {
		...tokens.BODY_1,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
		flex: 1,
	},
});
