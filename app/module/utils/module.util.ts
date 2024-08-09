// ENUMS //
import { Status } from "../../../enums/e-learning.enum";

// TYPES //
import { ModuleData } from "../../../types/eLearning";

/** Calculate the Progress by looking at all the Chapters */
export const getModuleProgress = (module: ModuleData) => {
	let total = 0;
	let inProgress = 0;
	let completed = 0;

	// Iterate through the chapters array, and fetch the Progress
	module.chapters.forEach((chapterItem) => {
		total++;
		if (chapterItem.status === Status.IN_PROGRESS) {
			inProgress++;
		}
		if (chapterItem.status === Status.COMPLETED) {
			completed++;
		}
	});
	// In progress is half points, completed is full points, not started is 0 points
	return Math.round(((completed + inProgress * 0.5) / total) * 100);
};
