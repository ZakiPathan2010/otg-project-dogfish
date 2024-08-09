/* eslint-disable @typescript-eslint/no-explicit-any */
// REACT NATIVE //
import { Appearance, ColorSchemeName } from "react-native";

// Define your dark and light token objects
import { token } from "./tokens";
import { darkTokens } from "./darkTokens";
import { lightTokens } from "./lightTokens";

/** Function to merge tokens based on the current color scheme */
const mergeTokens = (baseTokens: any, overrideTokens: any) => {
	return {
		...baseTokens,
		...overrideTokens,
	};
};

/** Function to select tokens based on the current color scheme */
const selectTokens = (colorScheme: ColorSchemeName) => {
	if (colorScheme === "dark") {
		return mergeTokens(token, darkTokens);
	} else {
		return mergeTokens(token, lightTokens);
	}
};

let currentColorScheme = Appearance.getColorScheme();
let tokens = selectTokens(currentColorScheme);

/** Function to handle the appearance change */
const handleAppearanceChange = ({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) => {
	currentColorScheme = colorScheme;
	tokens = selectTokens(colorScheme);
};

Appearance.addChangeListener(handleAppearanceChange);

export default tokens;
