// REACT //
import React from "react";

// REACT NATIVE //
import { StyleSheet, View, TextInput } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// UTILS //
import { CONSTANTS } from "../../infrastructure/constants";

// SVG's //
import Search from "../../assets/icons/search.svg";

interface FieldContentProps {
	value: string;
	onChangeText: (text: string) => void;
}

/** Field Content Component (Search Bar) */
const FieldContent: React.FC<FieldContentProps> = ({ value, onChangeText }) => {
	// Define States

	// Helper Functions

	// Use Effect

	return (
		<View style={styles.searchInputWrap}>
			{/* Search Icon */}
			<Search
				height={20}
				width={20}
				color={tokens.LAYOUT_CONTENT_TERTIARY}
				style={styles.searchIcon}
			/>

			{/* Search Input */}
			<TextInput
				style={styles.searchInput}
				placeholder="Search"
				value={value}
				onChangeText={(text) => onChangeText && onChangeText(text)}
				inputMode="search"
				returnKeyType="search"
				placeholderTextColor={tokens.LAYOUT_CONTENT_TERTIARY}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	searchInputWrap: {
		position: "relative",
	},
	searchIcon: {
		position: "absolute",
		top: tokens.SPACE_M + 2,
		left: tokens.SPACE_L,
	},
	searchInput: {
		fontFamily: tokens.FONT_FAMILIES_BODY,
		fontSize: tokens.FONT_SIZE_3,
		lineHeight: tokens.FONT_SIZE_3 * tokens.LINE_HEIGHTS_NONE,
		borderRadius: tokens.RADIUS_XL + tokens.RADIUS_S,
		height: 40,
		marginBottom: 20,
		...tokens.LAYOUT_COMPONENT_BDR_DEFAULT,
		paddingLeft: 40,
		paddingTop: CONSTANTS.IS_IOS ? tokens.SPACE_S : 0,
		paddingBottom: CONSTANTS.IS_IOS ? 0 : tokens.SPACE_S,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
});

export default FieldContent;
