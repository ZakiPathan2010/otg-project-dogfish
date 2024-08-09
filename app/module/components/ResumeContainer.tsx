// REACT //
import React from "react";

// REACT NATIVE //
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ToastAndroid,
} from "react-native";

// ENUMS //
import { ELearningTypes } from "../../../enums/e-learning.enum";

// STYLES //
import tokens from "../../../infrastructure/theme/tokens/designTokens";

// COMPONENTS //
import ProgressBar from "../../../components/common-components/ProgressBar";

// SVG's //
import ForwardArrow from "../../../assets/icons/arrow-right.svg";

// PLUGIN //
import { router } from "expo-router";
import { ModuleData } from "@/types/courses";

interface ResumeContainerProps {
	progress: number;
	chapterName: string;
	moduleName: string;
	assessmentScore: number;
	source: ELearningTypes;
	shouldOpenPlayer: boolean;
	module: ModuleData
}

/** Resume Container Component */
const ResumeContainer: React.FC<ResumeContainerProps> = ({
	progress,
	chapterName,
	moduleName,
	assessmentScore,
	source,
	shouldOpenPlayer,
	module
}) => {
	// Navigation

	// Define States

	// Define Refs

	// Helper Functions
	/** Get the Text to display in the Button */
	const getButtonText = () => {
		if (progress < 100) {
			if (progress === 0) {
				return "Begin";
			}
			return "Resume";
		} else {
			return "Review";
		}
	};

	/** Function to navigate to the Player Screen */
	const goToPlayerScreen = () => {
		// Check if the Player should be opened
		if (shouldOpenPlayer) {
			router.push({
				pathname: "/webview", params: {
					moduleData: module,
				}
			});
		} else {
			// Should show a Toast
			ToastAndroid.show(
				"The module does not appear in your requirements.",
				ToastAndroid.SHORT
			);
		}
	};

	// Use Effect and Focus Effect

	return (
		<TouchableOpacity
			style={[
				styles.resumeContainer,
				{
					backgroundColor:
						progress === 100
							? tokens.FEEDBACK_SUCCESS_MEDIUM_FILL_FG
							: tokens.FEEDBACK_INFO_FG,
				},
			]}
			activeOpacity={0.8}
			onPress={() => {
				goToPlayerScreen();
			}}
		>
			{/* If the Module is not complete then Show Module/Chapter details */}
			{progress < 100 && (
				<View style={styles.chapterDetails}>
					{/* Module Name */}
					{/* <Text style={styles.moduleName}>{moduleName}</Text> */}

					{/* Chapter Name */}
					<Text style={styles.chapterName}>{chapterName}</Text>
				</View>
			)}

			{/* If the Module is complete then show the Assessment Score */}
			{progress === 100 && (
				<Text style={styles.assessmentScore}>
					Assessment Score: {assessmentScore}
				</Text>
			)}

			{/* Progress Bar Component */}
			{progress > 0 && (
				<ProgressBar
					progressPercentage={progress}
					backgroundColor={tokens.LAYOUT_COMPONENT_BG_TINT}
					foregroundColor={tokens.FEEDBACK_INFO_EMP}
					textColor={tokens.LAYOUT_INVERSE_SECONDARY}
				/>
			)}

			{/* Resume Details */}
			<View style={styles.moduleButtonWrap}>
				<Text style={styles.moduleButtonText}>{getButtonText()} Module</Text>
				<ForwardArrow
					style={styles.arrowIcon}
					color={tokens.ACTION_ONDARK_FG_DEFAULT}
				/>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	resumeContainer: {
		padding: tokens.SPACE_L,
		borderRadius: tokens.RADIUS_L,
		backgroundColor: "red",
	},
	chapterDetails: {
		marginBottom: tokens.SPACE_XL,
	},
	moduleName: {
		...tokens.SUBTITLE_2,
		color: tokens.ACTION_ONDARK_FG_DEFAULT,
	},
	chapterName: {
		...tokens.HEADING_05,
		color: tokens.ACTION_ONDARK_FG_DEFAULT,
	},
	assessmentScore: {
		...tokens.HEADING_05,
		color: tokens.ACTION_ONDARK_FG_DEFAULT,
		marginBottom: tokens.SPACE_M,
	},
	percentageText: {
		...tokens.SUBTITLE_2,
		color: tokens.UI_WHITE,
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
		fontFamily: "ibm-plex-sans-semibold",
		fontSize: tokens.FONT_SIZE_3,
		color: tokens.ACTION_ONDARK_FG_DEFAULT,
	},
	arrowIcon: {
		marginLeft: tokens.SPACE_M,
	},
});

export default ResumeContainer;
