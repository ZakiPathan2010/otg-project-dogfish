// REACT //
import React, {
	Dispatch,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

// MODULES //

// TYPES //
import { ELearningData } from "../types/courses";

// UTILS //
import { updateELearningsWithLocalStorage } from "../utils/eLearning.util";
import { useCoursesContext } from "./Courses.context";

interface SharedValueContextType {
	eLearnings: ELearningData[];
	setELearnings: Dispatch<React.SetStateAction<ELearningData[]>>;
	seriesIndex: number;
	setSeriesIndex: Dispatch<React.SetStateAction<number>>;
	moduleIndex: number;
	setModuleIndex: Dispatch<React.SetStateAction<number>>;
	updateELearnings: () => void;
}

// Create Shared Value Context
const SharedValueContext = createContext<SharedValueContextType | undefined>(
	undefined
);

/** Init the Context */
export const useSharedValueContext = () => {
	const context = useContext(SharedValueContext);
	if (!context) {
		throw new Error(
			"useSharedValueContext must be used within SharedValueProvider"
		);
	}
	return context;
};

type SharedValueProviderProps = {
	children: React.ReactNode;
};

/** Shared Value Context Provider */
export const SharedValueProvider: React.FC<SharedValueProviderProps> = ({
	children,
}) => {
	// Define States
	const [eLearnings, setELearnings] = useState<ELearningData[]>([]);
	const [seriesIndex, setSeriesIndex] = useState<number>(-1);
	const [moduleIndex, setModuleIndex] = useState<number>(-1);

	// Initialize your other state here

	// Define Setters

	// Helper Functions
	/** Function to Reset the E Learnings  */
	const updateELearnings = async () => {
		const { courses } = useCoursesContext();
		updateELearningsWithLocalStorage(courses).then((updatedJson) => {
			// Update the E-learning state with updated data as per Local Storage
			setELearnings(updatedJson);
		});
	};

	// Add the setters to the value passed to the provider
	const value: SharedValueContextType = useMemo(() => {
		return {
			eLearnings,
			setELearnings,
			seriesIndex,
			setSeriesIndex,
			moduleIndex,
			setModuleIndex,
			updateELearnings,
		};
	}, [eLearnings, moduleIndex, seriesIndex]);

	// Use Effects
	useEffect(() => {
		updateELearnings();
	}, []);

	return (
		<SharedValueContext.Provider value={value}>
			{children}
		</SharedValueContext.Provider>
	);
};
