// REACT //
import React, { useState } from "react";

// REACT NATIVE //
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// COMPONENTS //
import Popup from "./Popup";

// SVG's //
import Check from "../../assets/icons/check.svg";

interface SortItem {
	id: number;
	name: string;
}
interface ELearningSortPopupProps {
	onClosePopup: () => void;
	showPopup: boolean;
	sortBy: string;
	onSortApplied: (sortBy: string) => void;
}

/** ELearning Sort Popup Component */
const ELearningSortPopup: React.FC<ELearningSortPopupProps> = ({
	onClosePopup,
	showPopup,
	sortBy,
	onSortApplied,
}) => {
	// Define States
	const [selectedItem, setSelectedItem] = useState<string>(sortBy);

	const sortOptions: SortItem[] = [
		{ id: 1, name: "Name" },
		{ id: 2, name: "Product Code" },
		{ id: 3, name: "Release Date" },
	];

	// Define Refs

	// Helper Functions
	/** Sort Items */
	const handleItemClick = (itemSelected: SortItem) => {
		setSelectedItem(itemSelected.name);
		onSortApplied(itemSelected.name);
		onClosePopup();
	};

	// Use Effect and Focus Effect

	return (
		<Popup showPopup={showPopup} onClosePopup={onClosePopup}>
			<View style={styles.sortItemWrap}>
				{sortOptions.map((sortOptionItem) => (
					<TouchableOpacity
						key={sortOptionItem.id}
						style={[styles.sortItem]}
						onPress={() => handleItemClick(sortOptionItem)}
						activeOpacity={0.7}
					>
						{/* Dropdown Text Title */}
						<Text
							style={[
								styles.sortItemText,
								selectedItem === sortOptionItem.name && styles.selectedItem,
							]}
						>
							{sortOptionItem.name}
						</Text>

						{/* Check Icon */}
						{selectedItem === sortOptionItem.name ? (
							<Check color={tokens.LAYOUT_CONTENT_TERTIARY} height={18} width={18} />
						) : (
							<View style={{ height: 18, width: 18 }} />
						)}
					</TouchableOpacity>
				))}
			</View>
		</Popup>
	);
};

const styles = StyleSheet.create({
	sortItemWrap: {
		width: "70%",
		backgroundColor: tokens.LAYOUT_COMPONENT_BG_DEFAULT,
		padding: tokens.SPACE_L,
		borderRadius: tokens.RADIUS_M,
		...tokens.LAYOUT_COMPONENT_BDR_SUBTLE,
	},
	sortItem: {
		padding: tokens.SPACE_M,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 36,
	},
	sortItemText: {
		color: tokens.LAYOUT_CONTENT_PRIMARY,
		...tokens.BODY_2,
	},
	selectedItem: {
		color: tokens.LAYOUT_CONTENT_PRIMARY,
		fontFamily: "ibm-plex-sans-medium",
	},
});

export default ELearningSortPopup;
