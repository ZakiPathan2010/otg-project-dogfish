// REACT //
import React, { useMemo } from "react";

// REACT NATIVE //
import { StyleSheet, View, Text } from "react-native";

// PLUGINS //
import { SvgProps } from "react-native-svg";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// UTILS //
import { getChipComponentStyles } from "../../utils/chip.util";
import {
	ChipColorData,
	ChipShapeData,
	ChipSizeData,
	ChipTypeData,
} from "../../types/components/chip";

interface ChipProps {
	text: string;
	chipStyle?: ChipTypeData;
	color?: ChipColorData;
	size?: ChipSizeData;
	shape?: ChipShapeData;
	iconName?: React.ComponentType<SvgProps>;
}

/** Chip Component */
const Chip: React.FC<ChipProps> = ({
	text,
	chipStyle = "filled",
	color = "default",
	size = "medium",
	shape = "square",
	iconName: IconComponent,
}) => {
	// Define States

	// Use useMemo to memoize the styles
	const {
		chipStyle: chipComponentStyle,
		chipTextStyle,
		iconStyle,
	} = useMemo(
		() => getChipComponentStyles(size, color, chipStyle, shape),
		[size, color, chipStyle, shape]
	);

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<View style={[styles.chipComponent, chipComponentStyle]}>
			{/* Icon */}
			{IconComponent && (
				<IconComponent
					color={iconStyle.color}
					height={iconStyle.height as number}
					width={iconStyle.width as number}
					style={styles.iconLeftStyles}
				/>
			)}

			{/* Text */}
			<Text style={[chipTextStyle, styles.chipText]}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	chipComponent: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: tokens.SPACE_S,
		alignSelf: "flex-start",
		justifyContent: "center",
	},
	iconLeftStyles: {
		marginRight: tokens.SPACE_S,
	},
	chipText: {
		paddingTop: tokens.SPACE_XS + 1,
	},
});

export default Chip;
