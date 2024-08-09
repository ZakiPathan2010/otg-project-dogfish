// REACT //
import React, { useMemo } from "react";

// REACT NATIVE //
import {
	StyleSheet,
	View,
	Text,
	TextStyle,
	ViewStyle,
	TouchableOpacity,
} from "react-native";

// TYPES //
import { ModuleData } from "../../types/courses";

// ENUMS //
import { ELearningTypes } from "../../enums/e-learning.enum";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// COMPONENTS //
import { Image } from "expo-image";
import Chip from "../common-components/Chip";

// CONTEXTS //
import { useSharedValueContext } from "../../contexts/SharedValue.context";


// OTHERS //
import ModuleStatusChip from "../chips/ModuleStatusChip";
import { convertModuleTypeToString } from "../../utils/module.util";


interface ModuleCardProps {
	module: ModuleData;
	moduleIndex: number;
	source: ELearningTypes;
	router: any;
}

/** Module Card Component */
const ModuleCard: React.FC<ModuleCardProps> = ({
	module,
	moduleIndex,
	source,
	router,
}) => {
	// Define Contexts
	const { setModuleIndex } = useSharedValueContext();

	// Use useMemo to calculate moduleChipText
	const moduleChipText = useMemo(
		() => convertModuleTypeToString(module.type),
		[module.type]
	);

	// Define States

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<TouchableOpacity
			style={styles.moduleCard}
			onPress={() => {
				setModuleIndex(moduleIndex);
				router.push({
					pathname: "/module", params: {
						moduleData: JSON.stringify(module), source: source
					}
				});
			}}
			activeOpacity={0.8}
		>
			<View>
				{/* Card Image */}
				<Image style={styles.cardImage} source={module.cover_image} />
			</View>
			<View style={styles.cardInfo}>
				<View style={styles.infoHead}>
					{/* E-Learning Type Chip */}
					<Chip size="xSmall" text={moduleChipText} color="info" />

					{/* Status Chip */}
					<ModuleStatusChip status={module.status} />
				</View>

				{/* Title */}
				<Text style={styles.cardTitle}>{module.module_name}</Text>

				{/* Training Number */}
				<Text style={styles.trainingNumber}>#{module.training_number}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	moduleCard: {
		...(tokens.LAYOUT_COMPONENT_BDR_DEFAULT as ViewStyle),
		borderRadius: tokens.RADIUS_M,
	},
	cardImage: {
		width: "100%",
		height: 136,
		borderTopLeftRadius: tokens.RADIUS_M,
		borderTopRightRadius: tokens.RADIUS_M,
	},
	cardInfo: {
		padding: tokens.SPACE_XL,
	},
	infoHead: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: tokens.SPACE_S,
	},
	cardTitle: {
		fontFamily: "ibm-plex-sans-semibold",
		fontSize: tokens.FONT_SIZE_3,
		fontWeight: tokens.FONT_WEIGHTS_SEMIBOLD as TextStyle["fontWeight"],
		lineHeight: tokens.FONT_SIZE_3 * tokens.LINE_HEIGHTS_S,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
		marginBottom: tokens.SPACE_S,
	},
	trainingNumber: {
		...(tokens.BODY_2 as TextStyle),
		color: tokens.LAYOUT_CONTENT_SECONDARY,
	},
	cardComponent: {
		marginBottom: tokens.SPACE_XL,
	},
});

export default ModuleCard;
