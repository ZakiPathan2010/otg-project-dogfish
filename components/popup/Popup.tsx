// REACT //
import React, { useEffect, useState } from "react";

// REACT NATIVE //
import { TouchableOpacity, View, Modal, StyleSheet } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

interface PopupProps {
	children: React.ReactNode;
	showPopup: boolean;
	onClosePopup?: () => void;
	dismissOnBackdrop?: boolean;
}

/** Popup Component */
const Popup: React.FC<PopupProps> = ({
	children,
	showPopup = false,
	onClosePopup,
	dismissOnBackdrop = false,
}) => {
	// Define States
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(showPopup);

	// Define Refs

	// Helper Functions
	/** Close the Popup */
	const closePopup = () => {
		onClosePopup && onClosePopup();
		setIsPopupOpen(false);
	};

	// Use Effect and Focus Effect
	useEffect(() => {
		setIsPopupOpen(showPopup);
	}, [showPopup]);

	return (
		<Modal animationType="fade" transparent={true} visible={isPopupOpen}>
			{/* Backdrop */}
			<TouchableOpacity
				onPress={dismissOnBackdrop ? undefined : closePopup}
				activeOpacity={0.6}
				style={styles.backdrop}
			/>
			{/* Popup Wrapper */}
			<View style={styles.centeredView}>{children}</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: tokens.UI_NEUTRALS_950,
		opacity: 0.6,
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: "100%",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Popup;
