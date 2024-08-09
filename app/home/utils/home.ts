// ENUMS //
import { ELearningTypes, Status } from "../../../enums/e-learning.enum";

// TYPES //
import { ELearningData } from "../../../types/courses";
import { ModuleFilterData } from "../../../types/filters";

/** Get all the Unique Subjects */
export const getSubjects = (eLearnings: ELearningData[]) => {
	const subjects: string[] = [];

	// Iterate through the eLearnings array, and fetch only the unique Subjects
	eLearnings.forEach((eLearningItem) => {
		if (eLearningItem.e_learning_type === ELearningTypes.MODULE) {
			eLearningItem.module &&
				addUniqueSubject(eLearningItem.module.subject, subjects);
		} else {
			eLearningItem.series &&
				eLearningItem.series.modules.forEach((moduleItem) => {
					addUniqueSubject(moduleItem.subject, subjects);
				});
		}
	});
	return subjects;
};

/** Add subject to Array if it is not already present */
const addUniqueSubject = (subject: string, subjects: string[]) => {
	if (subject !== "" && !subjects.includes(subject)) {
		subjects.push(subject);
	}
};

/** Get all the Unique Target Groups in the Modules */
export const getTargetGroups = (eLearnings: ELearningData[]) => {
	const targetGroups: string[] = [];

	// Iterate through the eLearnings array, and fetch only the unique Target Groups
	eLearnings.forEach((eLearningItem) => {
		if (eLearningItem.e_learning_type === ELearningTypes.MODULE) {
			eLearningItem.module &&
				eLearningItem.module.target_groups.forEach((targetGroup) => {
					addUniqueTargetGroup(targetGroup.name, targetGroups);
				});
		} else {
			eLearningItem.series &&
				eLearningItem.series.modules.forEach((moduleItem) => {
					moduleItem.target_groups.forEach((targetGroup) => {
						addUniqueTargetGroup(targetGroup.name, targetGroups);
					});
				});
		}
	});
	return targetGroups;
};

/** Add Target Group to Array if it is not already present */
const addUniqueTargetGroup = (targetGroup: string, targetGroups: string[]) => {
	if (!targetGroups.includes(targetGroup)) {
		targetGroups.push(targetGroup);
	}
};

/** Get the Progress - Series and Modules */
export const getHomeProgress = (eLearnings: ELearningData[]) => {
	let total = 0;
	let inProgress = 0;
	let completed = 0;
	// Iterate through the eLearnings array, and fetch the Progress
	eLearnings.forEach((eLearningItem) => {

		if (eLearningItem.module.status !== Status.LOCKED) {
			total++;
		}
		if (eLearningItem.module.status === Status.IN_PROGRESS) {
			inProgress++;
		}
		if (eLearningItem.module.status === Status.COMPLETED) {
			completed++;
		}

	});
	return Math.round(((completed + inProgress * 0.5) / total) * 100);
};

/** Filter the E Learnings by the Search Query and the Filter Selections */
export const filterELearningsUtil = (
	eLearnings: ELearningData[],
	searchInput: string,
	filters: ModuleFilterData
) => {
	// Filter the E-Learnings based on the Search Query and the Filters
	const filteredELearnings = eLearnings.filter((eLearningItem) => {
		if (eLearningItem.e_learning_type === ELearningTypes.MODULE) {
			// For Module
			// Check if the module's name includes the search input (case insensitive)
			const nameMatches =
				searchInput.length === 0 ||
				eLearningItem.module?.module_name
					.toLowerCase()
					.includes(searchInput.toLowerCase());

			// Check if the module's subject matches one of the subjects in the filters,
			// or if the subjects filter is empty
			const subjectMatches =
				filters.subjects.length === 0 ||
				filters.subjects.includes(eLearningItem.module?.subject ?? "");

			// Check if any of the module's target groups matches one of the target groups in the filters,
			// or if the targetGroups filter is empty
			const targetGroupMatches =
				filters.targetGroups.length === 0 ||
				eLearningItem.module?.target_groups.some((targetGroup) =>
					filters.targetGroups.includes(targetGroup.name)
				);

			// Return true if all conditions match
			return nameMatches && subjectMatches && targetGroupMatches;
		} else {
			// For Series
			// Check if the module's name includes the search input (case insensitive)
			const nameMatches =
				searchInput.length === 0 ||
				eLearningItem.series?.series_title
					.toLowerCase()
					.includes(searchInput.toLowerCase());

			// Check if the module's (In the Series) - subject matches one of the subjects in the filters,
			// or if the subjects filter is empty
			const subjectMatches =
				filters.subjects.length === 0 ||
				eLearningItem.series?.modules.some((moduleItem) =>
					filters.subjects.includes(moduleItem.subject)
				);

			// Check if any of the module's (In Series) - target groups matches one of the target groups in the filters,
			// or if the targetGroups filter is empty
			const targetGroupMatches =
				filters.targetGroups.length === 0 ||
				eLearningItem.series?.modules.some((moduleItem) =>
					moduleItem.target_groups.some((targetGroup) =>
						filters.targetGroups.includes(targetGroup.name)
					)
				);

			// Return true if all conditions match
			return nameMatches && subjectMatches && targetGroupMatches;
		}
	});

	return filteredELearnings;
};
