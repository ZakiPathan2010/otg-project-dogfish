// REACT //
import React from "react";

// REACT NATIVE //
import { View, Text } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";
import { commonStyles } from "../common-styles/commonStyles";

// COMPONENTS //

// UTILS //

// SVG's //
import Check from "../../assets/icons/check.svg";

interface WhatYouLearnComponentProps {
	pointers: Array<string>;
	keyId: string;
	description: string;
}

/** What You Learn Component */
const WhatYouLearnComponent: React.FC<WhatYouLearnComponentProps> = ({
	pointers,
	keyId,
	description,
}) => {
	// Define States

	// Define Memos

	// Define Refs

	// Helper Functions

	// Use Effect and Focus Effect

	return (
		<View style={[commonStyles.seriesDescriptor]}>
			{/* Series Description's - pointers */}
			<Text style={commonStyles.seriesDescriptorTitle}>
				What you&apos;ll learn
			</Text>
			<Text style={commonStyles.seriesDescriptorDescription}>{description}</Text>

			{/* Pointers of Series */}
			<View style={commonStyles.seriesDescriptorPointersWrap}>
				{/* Pointer Item */}
				{pointers.map((text, index) => (
					<View
						key={`${keyId}-${index}`}
						style={commonStyles.seriesDescriptorPointersItem}
					>
						<Check
							height={15}
							width={15}
							color={tokens.FEEDBACK_INFO_MEDIUM_FILL_EMP}
							style={commonStyles.pointerCheckIcon}
						/>
						<Text style={commonStyles.seriesDescriptorPointerText}>{text}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

export default WhatYouLearnComponent;
