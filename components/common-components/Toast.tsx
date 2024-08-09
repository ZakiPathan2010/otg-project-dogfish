// REACT //
import React, { useEffect } from "react";

// REACT NATIVE //
import { View } from "react-native";

// COMPONENTS //
import Alert from "./Alert";

interface ToastProps {
	color: "info" | "success" | "warning" | "error";
	text: string;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/** Toast Component */
const Toast: React.FC<ToastProps> = ({ color, text, visible, setVisible }) => {
	// Define States

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (visible) {
			timer = setTimeout(() => {
				setVisible(false);
			}, 3000);
		}

		return () => clearTimeout(timer);
	}, [visible, setVisible]);

	return visible ? (
		<View style={{ position: "absolute", bottom: 80, width: "80%", left: "10%" }}>
			<Alert title={text} color={color} type="inPage" />
		</View>
	) : null;
};

export default Toast;
