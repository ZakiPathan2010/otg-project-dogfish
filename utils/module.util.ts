import { ModuleTypes } from "../enums/e-learning.enum";

/** Function for Convert Module Type to String */
export const convertModuleTypeToString = (value: ModuleTypes): string => {
	switch (value) {
		case ModuleTypes.VIDEO:
			return "Video";
		case ModuleTypes.E_LEARNING:
			return "E-Learning";
		default:
			return "Unknown Type";
	}
};
