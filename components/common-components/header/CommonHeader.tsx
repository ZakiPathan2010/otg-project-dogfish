// REACT //
import React from "react";

// REACT NATIVE //
import { View, StyleSheet, TouchableOpacity } from "react-native";

// TYPES //

// STYLES //
import tokens from "../../../infrastructure/theme/tokens/designTokens";

// NAVIGATION //

// SVG's //
import Menu from "../../../assets/icons/menu.svg";
import Notification from "../../../assets/icons/notification.svg";
import OceanLogo from "../../../assets/icons/ocean-learning.svg";
interface CommonHeaderProps {
	router: any;
	onNotificationClick?: () => void;
}

/** Common Header Component */
const CommonHeader: React.FC<CommonHeaderProps> = ({ router, onNotificationClick }) => {
	// Define States

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<View style={styles.headerWrap}>
			{/* Hamburger (Menu) Icon */}
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.hamburgerButton}
				onPress={() => {
					router.push("Menu");
				}}
			>
				<Menu height={24} width={24} />
			</TouchableOpacity>

			{/* Brand Logo */}
			<OceanLogo />

			{/* Notification Button */}
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.notificationButton}
				onPress={onNotificationClick}
			>
				<Notification height={24} width={24} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	headerWrap: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: tokens.UI_BLACK,
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 4,
	},
	hamburgerButton: {
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	notificationButton: {
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	headerTitle: {},
});

export default CommonHeader;
