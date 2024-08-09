// REACT NATIVE //
import { StyleSheet } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// UTILS //
import { CONSTANTS } from "../../infrastructure/constants";

export const commonStyles = StyleSheet.create({
	container: {
		backgroundColor: tokens.LAYOUT_SURFACE_LEVEL1,
		padding: tokens.SPACE_L,
		minHeight: CONSTANTS.WINDOW_HEIGHT,
	},
	homeContainer: {
		paddingTop: tokens.SPACE_XL * 2,
		paddingBottom: tokens.SPACE_XL * 3,
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
	breadCrumpWrap: {},
	titleSmall: {},
	titleLarge: {},
	trainingNumber: {},
	seriesDetailStyles: {},
	infoWrap: {},
	headSectionWrap: {
		marginBottom: tokens.SPACE_XL,
	},
	seriesDescriptor: {
		marginBottom: tokens.SPACE_L * 2,
	},
	seriesDescriptorTitle: {
		...tokens.HEADING_03,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
		marginBottom: tokens.SPACE_M,
	},
	seriesDescriptorDescription: {
		...tokens.SUBTITLE_2,
		color: tokens.LAYOUT_CONTENT_SECONDARY,
		marginBottom: tokens.SPACE_L * 2,
	},
	seriesDescriptorPointersWrap: {
		paddingHorizontal: tokens.SPACE_XL,
	},
	seriesDescriptorPointersItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: tokens.SPACE_L,
		padding: tokens.SPACE_S,
	},
	seriesDescriptorPointerText: {
		marginLeft: tokens.SPACE_L,
		...tokens.BODY_2,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
	pointerCheckIcon: {
		marginTop: tokens.SPACE_S,
	},
	alertComponentWrap: {
		marginBottom: tokens.SPACE_M,
	},
	textCenter: {
		textAlign: "center",
		alignItems: "center",
	},
});
