// REACT //
import React, { useEffect, useState } from "react";

// REACT NATIVE //
import { StyleSheet, View, Animated, Pressable, Text } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

interface SwitchProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
	text?: string;
}

/** Switch Component */
const Switch: React.FC<SwitchProps> = ({ value, onValueChange, text }) => {
	// Define States
	const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

	// Helper Functions

	/** Toggle the Switch */
	const toggleSwitch = () => {
		const newValue = !value;
		onValueChange(newValue);
	};

	// Define Interpolations
	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [2, 18], // Adjust the distance of the switch head
	});

	// Use Effect and Focus Effect
	useEffect(() => {
		// Update the animated value when the value prop changes
		Animated.timing(animatedValue, {
			toValue: value ? 1 : 0,
			duration: 300, // Adjust the animation duration
			useNativeDriver: false,
		}).start();
	}, [value]);

	return (
		<View style={styles.switchWrap}>
			{/* Pressable component to wrap the entire switch */}
			<Pressable onPress={toggleSwitch} style={styles.pressable}>
				{/* View representing the background of the switch */}
				<View
					style={[
						styles.backgroundGradient,
						{
							// Set background color based on the switch value
							backgroundColor: value
								? tokens.ACTION_ENABLED_CONTROL_BG_CTA
								: tokens.ACTION_ENABLED_CONTROL_BG_DEFAULT,
						},
					]}
				>
					{/* Container for the switch head */}
					<View style={styles.innerContainer}>
						{/* Animated View for animating the switch head */}
						<Animated.View
							style={{
								transform: [{ translateX }], // Translate animation for switch head
							}}
						>
							{/* View representing the switch head */}
							<View style={[styles.switchHead]} />
						</Animated.View>
					</View>
				</View>
			</Pressable>

			{/* Pressable component for the switch label */}
			<Pressable onPress={toggleSwitch}>
				{/* Text representing the switch label */}
				<Text style={styles.switchText}>{text}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	switchWrap: {
		flexDirection: "row",
		alignItems: "center",
	},
	pressable: {
		width: tokens.SIZE_5,
		height: tokens.SIZE_3,
		borderRadius: tokens.RADIUS_XL,
	},
	backgroundGradient: {
		borderRadius: tokens.RADIUS_XL,
		flex: 1,
	},
	innerContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		position: "relative",
	},
	switchHead: {
		width: tokens.SIZE_2,
		height: tokens.SIZE_2,
		borderRadius: tokens.RADIUS_FULL * 2,
		backgroundColor: tokens.ACTION_ENABLED_CONTROL_FG,
	},
	switchText: {
		marginLeft: tokens.SPACE_XL,
		...tokens.BODY_2,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
});

export default Switch;
