// REACT //
import React, { useEffect, useState } from "react";

// REACT NATIVE //
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";

// PLUGINS //

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// COMPONENTS //
import Checkbox from "../common-components/form/Checkbox";
import Button from "../common-components/buttons/Button";
import Accordion from "../common-components/Accordion";
import Popup from "./Popup";

// SVG's //
import Close from "../../assets/icons/close.svg";

// TYPES //
import { ModuleFilterData } from "../../types/filters";

interface FilterPopupProps {
	onClosePopup: () => void;
	showPopup: boolean;
	subjects: string[];
	targetGroups: string[];
	filters: ModuleFilterData;
	onFilterApplied: (filters: ModuleFilterData) => void;
}

/** ELearning Sort Popup Component */
const FilterPopup: React.FC<FilterPopupProps> = ({
	onClosePopup,
	showPopup,
	subjects,
	targetGroups,
	filters,
	onFilterApplied,
}) => {
	// Define States
	const [moduleFilters, setModuleFilters] = useState<ModuleFilterData>({
		...filters,
	});
	const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

	// Define Refs

	// Helper Functions
	/** Add to filter Object */
	const addToFilter = (key: "subjects" | "targetGroups", value: string) => {
		// Changes the Filter Applied State
		setIsFilterApplied(true);

		// Check if the Filter already exists - then Add or Remove from filters accordingly
		if (!moduleFilters[key].includes(value)) {
			// Add to Filter
			setModuleFilters((prevState) => ({
				...prevState,
				[key]: [...prevState[key], value],
			}));
		} else {
			// Remove from Filter
			setModuleFilters((prevState) => ({
				...prevState,
				[key]: prevState[key].filter((item) => item !== value),
			}));
		}
	};

	/** Clear Filter by Key */
	const clearFilter = (key: "subjects" | "targetGroups") => {
		// Clear the Filter
		setModuleFilters((prevState) => ({
			...prevState,
			[key]: [],
		}));

		// Check if the Filter is Applied
		setIsFilterApplied(true);
	};

	/** Clear all the filters */
	const clearAllFilters = () => {
		// Clear all the filters
		setModuleFilters({
			subjects: [],
			targetGroups: [],
		});

		// Check if the Filter is Applied
		setIsFilterApplied(true);
	};

	/** Apply the Filters */
	const applyFilters = () => {
		onFilterApplied(moduleFilters);
		onClosePopup();
	};

	// Use Effect and Focus Effect
	useEffect(() => {
		setIsFilterApplied(false);
	}, [showPopup]);

	return (
		<Popup showPopup={showPopup} onClosePopup={onClosePopup}>
			<View style={styles.filterPopup}>
				{/* Popup Header */}
				<View style={styles.filterPopupHeader}>
					{/* Title */}
					<Text style={styles.headerText}>Filter</Text>

					{/* Close Button */}
					<TouchableOpacity onPress={onClosePopup} style={styles.closeFilterPopup}>
						<Close />
					</TouchableOpacity>
				</View>

				{/* Filter Options */}
				<ScrollView>
					<Accordion title="Subject Area" defaultOpen={true}>
						{/* Subjects - Filter Items */}
						<View style={styles.filterMain}>
							{subjects.map((subjectItem) => (
								<View style={styles.filterItem} key={`subject-filter-${subjectItem}`}>
									<Checkbox
										label={subjectItem}
										checked={moduleFilters.subjects.includes(subjectItem)}
										onPress={() => {
											addToFilter("subjects", subjectItem);
										}}
									/>
								</View>
							))}
						</View>

						{/* Subjects - Clear Filter */}
						<View style={styles.clearButton}>
							<Button
								text="Clear"
								buttonStyle="text"
								onClick={() => clearFilter("subjects")}
							/>
						</View>
					</Accordion>

					<Accordion title="Target Group">
						{/* Filter Items */}
						<View style={styles.filterMain}>
							{targetGroups.map((targetGroupItem) => (
								<View style={styles.filterItem} key={`target-group-${targetGroupItem}`}>
									<Checkbox
										label={targetGroupItem}
										checked={moduleFilters.targetGroups.includes(targetGroupItem)}
										onPress={() => {
											addToFilter("targetGroups", targetGroupItem);
										}}
									/>
								</View>
							))}
						</View>

						{/* Target Groups - Clear Filters */}
						<View style={styles.clearButton}>
							<Button
								text="Clear"
								buttonStyle="text"
								onClick={() => clearFilter("targetGroups")}
							/>
						</View>
					</Accordion>
				</ScrollView>

				<View style={styles.disableButtonContainer}>
					<View style={styles.fixedButtonWrap}>
						{/* Clear All Filter Button */}
						<View style={styles.clearAllButton}>
							<Button
								text="Clear all"
								mode="block"
								buttonStyle="outline"
								onClick={clearAllFilters}
								disabled={
									moduleFilters.subjects?.length === 0 &&
									moduleFilters.targetGroups?.length === 0
								}
							/>
						</View>

						{/* Apply All Filter Button */}
						<Button
							text="Apply"
							mode="block"
							disabled={!isFilterApplied}
							onClick={applyFilters}
						/>
					</View>
				</View>
			</View>
		</Popup>
	);
};

const styles = StyleSheet.create({
	filterPopup: {
		width: "90%",
		backgroundColor: tokens.LAYOUT_COMPONENT_BG_DEFAULT,
		padding: tokens.SPACE_L,
		borderRadius: tokens.RADIUS_M,
		...tokens.LAYOUT_COMPONENT_BDR_SUBTLE,
		maxHeight: "80%",
		overflow: "hidden",
	},
	filterPopupHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: tokens.SPACE_XL,
	},
	headerText: {
		...tokens.HEADING_06,
		color: tokens.LAYOUT_COMPONENT_FG_DEFAULT,
	},
	closeFilterPopup: {
		height: tokens.SPACE_L * 2,
		width: tokens.SPACE_L * 2,
		alignItems: "center",
		justifyContent: "center",
	},
	filterOption: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: tokens.SPACE_M,
		paddingHorizontal: tokens.SPACE_L,
	},
	filterMain: {
		paddingVertical: tokens.SPACE_M,
		paddingHorizontal: tokens.SPACE_L,
	},
	filterOptionTitle: {
		...tokens.COMPONENT_ACCORDION_TITLE,
		color: tokens.LAYOUT_COMPONENT_FG_DEFAULT,
	},
	filterItem: {
		padding: tokens.SPACE_M,
	},
	clearButton: {
		borderTopColor: tokens.UI_NEUTRALS_100,
		borderTopWidth: tokens.BORDER_S,
	},
	fixedButtonWrap: {
		padding: tokens.SPACE_XL,
	},
	clearAllButton: {
		marginBottom: tokens.SPACE_M,
	},
	disableButtonContainer: {
		backgroundColor: tokens.LAYOUT_COMPONENT_BG_SUBTLE,
		marginHorizontal: -tokens.SPACE_L,
		marginBottom: -tokens.SPACE_L,
	},
});

export default FilterPopup;
