// REACT //
import React, { useMemo, useState } from "react";

// REACT NATIVE //
import {
	StyleSheet,
	View,
	Text,
	TextStyle,
	TextInput,
	StyleProp,
	ViewStyle,
	KeyboardTypeOptions,
	TouchableOpacity,
} from "react-native";

// STYLES //
import tokens from "../../../../infrastructure/theme/tokens/designTokens";

// UTILS //
import { getInputStyles } from "../../../utils/textInput.util";

// SVG's //
import AlertIcon from "../../../../assets/icons/alert.svg";
import VisibilityIcon from "../../../../assets/icons/visibility.svg";
import VisibilityOffIcon from "../../../../assets/icons/visibility-off.svg";

interface TextInputBoxProps {
	label?: string;
	errorMessage?: string;
	style?: StyleProp<ViewStyle>;
	value: string;
	onChangeText: (text: string) => void;
	type?: "text" | "password" | "email";
	multiline?: boolean;
	numberOfLines?: number;
	keyboardType?: KeyboardTypeOptions | undefined;
	onBlur?: () => void;
	autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
	maximumCharacterLength?: number;
	showCharacterCount?: boolean;
	helperText?: string;
	isOptional?: boolean;
	isDisabled?: boolean;
}

/** Text Input component */
const TextInputBox: React.FC<TextInputBoxProps> = ({
	label = "",
	errorMessage = "",
	style,
	value = "",
	onChangeText,
	multiline = false,
	numberOfLines = 1,
	type = "text",
	keyboardType,
	onBlur,
	autoCapitalize = "none",
	maximumCharacterLength = 1000,
	showCharacterCount = false,
	helperText,
	isOptional,
	isDisabled = false,
}) => {
	// Define Contexts

	// Define States
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	// Memoized input styles
	const inputStyles = useMemo(
		() =>
			getInputStyles(
				isFocused,
				errorMessage,
				type,
				multiline,
				isDisabled,
				numberOfLines
			),
		[isFocused, errorMessage, type, multiline, isDisabled, numberOfLines]
	);

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	// View starts here
	return (
		<View style={style}>
			<View style={[styles.inputHeaderWrap]}>
				<View style={styles.inputHeader}>
					{/* Input Label */}
					{label !== "" && (
						<Text
							style={[
								tokens.LABEL as TextStyle,
								styles.loginLabel,
								isDisabled ? { color: tokens.ACTION_DISABLED_FG } : null,
							]}
						>
							{label}
						</Text>
					)}

					{/* Optional Text */}
					{isOptional && (
						<Text style={[tokens.CHIP as TextStyle, styles.optionalText]}>
							(Optional)
						</Text>
					)}
				</View>

				{/* Helper Text */}
				{helperText && (
					<Text style={[tokens.HELPER as TextStyle, styles.helperText]}>
						{helperText}
					</Text>
				)}
			</View>
			<View style={[styles.textInputWrap]}>
				{/* Text Input */}
				<TextInput
					style={[styles.textInput, inputStyles]}
					keyboardType={keyboardType}
					multiline={multiline}
					numberOfLines={numberOfLines}
					selectionColor={tokens.LAYOUT_CONTENT_PRIMARY}
					value={value}
					autoCorrect={true}
					onChangeText={(text) => {
						if (
							text.length <= maximumCharacterLength ||
							maximumCharacterLength === null
						) {
							onChangeText(text);
						}
					}}
					autoCapitalize={autoCapitalize}
					secureTextEntry={type === "password" && !isPasswordVisible}
					onBlur={onBlur}
					onFocus={() => setIsFocused(true)}
					editable={!isDisabled}
				/>

				{/* Visibility Icon */}
				{type === "password" && (
					<TouchableOpacity
						style={styles.rightIconWrapper}
						onPress={() => setIsPasswordVisible(!isPasswordVisible)}
						activeOpacity={0.8}
					>
						{isPasswordVisible ? (
							<VisibilityIcon
								height={20}
								width={20}
								color={tokens.LAYOUT_CONTENT_TERTIARY}
							/>
						) : (
							<VisibilityOffIcon
								height={20}
								width={20}
								color={tokens.LAYOUT_CONTENT_TERTIARY}
							/>
						)}
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.inputBottom}>
				{/* Error Message */}
				{errorMessage !== "" && (
					<View style={styles.errorWrap}>
						<AlertIcon
							height={14}
							width={14}
							color={tokens.FEEDBACK_ERROR_EMP}
							style={styles.alertIcon}
						/>
						<Text style={styles.errorMessage}>{errorMessage}</Text>
					</View>
				)}

				{/* Character Count */}
				{showCharacterCount && (
					<Text style={styles.charactersCount}>
						{value.length}/{maximumCharacterLength} chars
					</Text>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: tokens.LAYOUT_COMPONENT_BG_DEFAULT,
		paddingHorizontal: tokens.SPACE_L,
		paddingVertical: tokens.SPACE_M - 2,
		color: tokens.LAYOUT_CONTENT_PRIMARY,
		borderRadius: tokens.RADIUS_S,
		fontSize: tokens.FONT_SIZE_3,
		lineHeight: tokens.FONT_SIZE_3 * tokens.LINE_HEIGHTS_NONE,
	},
	inputHeaderWrap: {
		marginBottom: tokens.SPACE_M,
	},
	inputHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	loginLabel: {
		color: tokens.LAYOUT_CONTENT_PRIMARY,
		flex: 1,
		paddingRight: tokens.SPACE_M,
		fontFamily: "ibm-plex-sans-medium",
	},
	optionalText: {
		color: tokens.LAYOUT_CONTENT_PRIMARY,
	},
	helperText: {
		marginTop: tokens.SPACE_XS,
		color: tokens.LAYOUT_CONTENT_TERTIARY,
	},
	textInputWrap: {
		position: "relative",
	},
	inputBottom: {
		marginTop: tokens.SPACE_M,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	errorWrap: {
		flexDirection: "row",
		alignItems: "flex-start",
		flex: 1,
		paddingRight: tokens.SPACE_XL,
	},
	alertIcon: {
		marginTop: tokens.SPACE_XS,
	},
	errorMessage: {
		flex: 1,
		fontWeight: tokens.FONT_WEIGHTS_REGULAR as TextStyle["fontWeight"],
		marginLeft: tokens.SPACE_S,
		color: tokens.FEEDBACK_ERROR_FG,
		fontFamily: tokens.FONT_FAMILIES_BODY,
		fontSize: tokens.FONT_SIZE_1,
	},
	charactersCount: {
		fontWeight: tokens.FONT_WEIGHTS_REGULAR as TextStyle["fontWeight"],
		color: tokens.FEEDBACK_ERROR_FG,
		fontFamily: tokens.FONT_FAMILIES_BODY,
		fontSize: tokens.FONT_SIZE_1,
	},
	rightIconWrapper: {
		position: "absolute",
		top: 0,
		right: 0,
		zIndex: 1,
		height: "100%",
		width: 40,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default TextInputBox;
