// REACT //
import React from "react";

// REACT NATIVE //
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	View,
	TextStyle,
} from "react-native";

// STYLES //
import tokens from "../../../infrastructure/theme/tokens/designTokens";

// SVG's //
import CheckIcon from "../../../assets/icons/check.svg";

interface CheckboxProps {
	label: string;
	checked: boolean;
	onPress: () => void;
}

/** Check box  */
const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onPress }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.checkboxContainer}
			onPress={onPress}
		>
			{/* for making checkbox checked add class (isChecked) */}
			<View style={[styles.checkbox, checked ? styles.isChecked : null]}>
				{checked && (
					<CheckIcon style={styles.checkedIcon} color={tokens.FEEDBACK_INFO_BG} />
				)}
			</View>
			<Text style={styles.checkboxLabel}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkbox: {
		width: tokens.SIZE_1,
		height: tokens.SIZE_1,
		borderColor: tokens.LAYOUT_CONTENT_SECONDARY,
		borderRadius: tokens.RADIUS_S * 0.5,
		borderWidth: 1,
		marginRight: tokens.SPACE_M,
		alignItems: "center",
		justifyContent: "center",
	},
	isChecked: {
		borderColor: tokens.ACTION_CTA_FG_DEFAULT,
		backgroundColor: tokens.ACTION_CTA_FG_DEFAULT,
	},
	checkboxLabel: {
		...(tokens.BODY_2 as TextStyle),
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
	checkedIcon: {
		width: 12,
		height: 12,
	},
});

export default Checkbox;
