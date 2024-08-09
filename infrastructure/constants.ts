// REACT NATIVE //
import { Dimensions, Platform } from "react-native";

// Define constant values
export const CONSTANTS = {
	WINDOW_HEIGHT: Dimensions.get("window").height,
	WINDOW_WIDTH: Dimensions.get("window").width,
	OS: Platform.OS,
	IS_ANDROID: Platform.OS === "android",
	IS_IOS: Platform.OS === "ios",
	VERSION: Platform.Version,
	EMAIL_ID: "jlpicard@starfleet.net",
	PASSWORD: "1234",
	RUSTICI_PATH: "rustici/",
};
