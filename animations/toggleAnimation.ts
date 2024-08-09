import { LayoutAnimation } from "react-native";

// Animation configuration for toggling the content
export const toggleVisibilityAnimation = {
	// Overall duration of the animation
	duration: 100,
	update: {
		// Duration for updating the layout during expansion
		duration: 300,
		// Property to animate (in this case, opacity)
		property: LayoutAnimation.Properties.opacity,
		// Type of animation (easing in and easing out)
		type: LayoutAnimation.Types.easeInEaseOut,
	},
	delete: {
		// Duration for updating the layout during collapse
		duration: 200,
		// Property to animate (in this case, opacity)
		property: LayoutAnimation.Properties.opacity,
		// Type of animation (easing in and easing out)
		type: LayoutAnimation.Types.easeInEaseOut,
	},
};
