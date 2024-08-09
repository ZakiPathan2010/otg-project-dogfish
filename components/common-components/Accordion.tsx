// REACT //
import React, { useRef, useState } from "react";

// REACT NATIVE //
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Animated,
	LayoutAnimation,
} from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// ANIMATIONS //
import { toggleVisibilityAnimation } from "../../animations/toggleAnimation";

// SVG's //
import AccordionArrow from "../../assets/icons/down-arrow.svg";

interface AccordionProps {
	title: string;
	children?: React.ReactNode;
	defaultOpen?: boolean;
}

/** Accordion Component */
const Accordion: React.FC<AccordionProps> = ({
	title,
	children,
	defaultOpen = false,
}) => {
	// Define States
	const [showContent, setShowContent] = useState<boolean>(defaultOpen);

	// Define Refs
	const animateController = useRef(
		new Animated.Value(defaultOpen ? 1 : 0)
	).current;

	// Helper Functions
	/** Open and Close the Accordion item on the click of Accordion head text*/
	const toggleAccordionItem = () => {
		const animationConfig = {
			duration: 300,
			toValue: showContent ? 0 : 1,
			useNativeDriver: true,
		};
		Animated.timing(animateController, animationConfig).start();
		LayoutAnimation.configureNext(toggleVisibilityAnimation);

		setShowContent((prevState) => !prevState);
	};

	/** Rotate when the List Items are opened and closed  */
	const arrowTransform = animateController.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "-180deg"],
	});

	// Use Effect and Focus Effect

	return (
		<>
			{/* Toggle Accordion Button */}
			<TouchableOpacity
				style={styles.filterOption}
				onPress={() => {
					toggleAccordionItem();
				}}
			>
				{/* Accordion Title */}
				<Text style={styles.filterOptionTitle}>{title}</Text>

				{/* Accordion Arrow */}
				<Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
					<AccordionArrow />
				</Animated.View>
			</TouchableOpacity>

			{/* Accordion Content */}
			{showContent && <View style={styles.filterMain}>{children}</View>}
		</>
	);
};

const styles = StyleSheet.create({
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
});

export default Accordion;
