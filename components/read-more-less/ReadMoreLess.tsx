// REACT //
import React, { useCallback, useState } from "react";

// REACT NATIVE //
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

interface ReadMoreLessProps {
	description: string;
	noOfLines: number;
}

/** Read More Less Component */
const ReadMoreLess: React.FC<ReadMoreLessProps> = ({
	description,
	noOfLines = 3,
}) => {
	// Define States
	const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
	const [textShown, setTextShown] = useState<boolean>(false);
	const [numLines, setNumLines] = useState<number | undefined>();

	// Define Refs

	// Helper Functions
	/** Toggle the text visibility when the "Read More" or "Read Less" button is pressed */
	const toggleTextShown = () => {
		setTextShown((prev) => !prev);
		setNumLines(!textShown ? undefined : noOfLines);
	};

	/** Callback function to handle text layout */
	const onTextLayout = useCallback(
		(e: { nativeEvent: { lines: string | unknown[] } }) => {
			// Check if the text lines exceed the specified limit and the text is not already expanded
			if (e.nativeEvent.lines.length > noOfLines && !textShown) {
				setShowMoreButton(true); // Show the "Read More" button
				setNumLines(noOfLines); // Limit the number of displayed lines
			}
		},
		[textShown, noOfLines]
	);

	// Use Effect and Focus Effect

	return (
		<View>
			<Text
				style={[styles.readMoreText]}
				onTextLayout={onTextLayout}
				numberOfLines={numLines}
			>
				{description}
			</Text>

			{showMoreButton ? (
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={toggleTextShown}
					style={styles.readMoreBtn}
				>
					<Text style={styles.readMoreBtnText}>
						{textShown ? "See Less" : "See More"}
					</Text>
				</TouchableOpacity>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	readMoreText: {
		...tokens.BODY_1,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
	readMoreBtn: {
		padding: tokens.SPACE_XL,
		textAlign: "center",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: tokens.UI_NEUTRALS_100,
		borderStyle: "solid",
		marginTop: tokens.SPACE_XL,
	},
	readMoreBtnText: {
		fontFamily: "ibm-plex-sans-semibold",
		fontSize: tokens.FONT_SIZE_1,
		fontWeight: tokens.FONT_WEIGHTS_SEMIBOLD,
		color: tokens.ACTION_CTA_FG_DEFAULT,
	},
});

export default ReadMoreLess;
