// TYPES //
import { ELearningData, ModuleData } from "../types/courses";

// ENUMS //
import { ELearningTypes, Status } from "../enums/e-learning.enum";

// SERVICES //
import { getDataStorage } from "../services/storage.service";

/** Update E-Learning Data based on Local Storage */
const updateELearningsWithLocalStorage = async (
	eLearnings: ELearningData[]
): Promise<ELearningData[]> => {
	const updatedELearnings = await Promise.all(
		eLearnings.map(async (item: ELearningData) => {
			if (item.e_learning_type === ELearningTypes.MODULE && item.module) {
				// For Modules
				await updateModuleAsPerStorage(item.module);
			} else if (item.e_learning_type === ELearningTypes.SERIES && item.series) {
				// For Series
				await Promise.all(
					item.series.modules.map((moduleItem) =>
						updateModuleAsPerStorage(moduleItem)
					)
				);
				// Check Series status
				const seriesStatus = checkSeriesStatus(item.series.modules);
				// Update Series Status in the main E-Learning data
				item.series.series_status = seriesStatus;
			}
			return item;
		})
	);

	return updatedELearnings;
};

/** Check Module in the Local storage */
const updateModuleAsPerStorage = async (module: ModuleData): Promise<void> => {
	try {
		// Get the Module data from local storage
		const localStorageData = await getDataStorage(module.module_id);

		// Update the mastery_score key of main E-Learning data
		if (localStorageData?.mastery_score !== undefined) {
			module.mastery_score = localStorageData.mastery_score;
		} else {
			module.mastery_score = 0;
		}

		// Update the status key of the main E-Learning ata
		if (localStorageData?.status !== undefined) {
			module.status = localStorageData.status;
		} else {
			module.status = Status.NOT_STARTED;
		}

		// Get the Chapter Status too from Local Storage, or else set it to NOT_STARTED
		module.chapters.map((chapterItem, chapterIndex) => {
			const chapterStatus =
				localStorageData?.learning_units[chapterItem.chapter_id]?.status;
			// If data available in Local Storage
			if (chapterStatus !== undefined) {
				module.chapters[chapterIndex].status = chapterStatus;
			} else {
				module.chapters[chapterIndex].status = Status.NOT_STARTED;
			}
		});

		return;
	} catch (error) {
		console.error("Error Updating Module Data:", error);
		throw error;
	}
};

/** Check Series Status based on combined Module Status */
const checkSeriesStatus = (module: ModuleData[]): Status => {
	const statuses = module.map((item) => item.status) ?? [];
	if (statuses.every((status) => status === Status.NOT_STARTED)) {
		return Status.NOT_STARTED;
	} else if (statuses.every((status) => status === Status.COMPLETED)) {
		return Status.COMPLETED;
	} else if (statuses.every((status) => status === Status.LOCKED)) {
		return Status.LOCKED;
	} else if (statuses.some((status) => status === Status.IN_PROGRESS)) {
		return Status.IN_PROGRESS;
	} else {
		return Status.NOT_STARTED;
	}
};

/** Get Random Status for Chapters */
export const getRandomStatusForChapter = (): Status => {
	// Generate Random Number between 0 to 2
	const randomNumber = Math.floor(Math.random() * 3);

	const status = [Status.NOT_STARTED, Status.IN_PROGRESS, Status.COMPLETED];
	return status[randomNumber];
};

export { updateELearningsWithLocalStorage };
