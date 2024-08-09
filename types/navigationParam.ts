// ENUMS //
import { ELearningTypes } from "../enums/e-learning.enum";

export type RootStackParamList = {
	Home: undefined;
	Login: undefined;
	SeriesDetail: undefined;
	ModuleDetail: { source: ELearningTypes };
	Menu: undefined;
	Webview: {
		source: ELearningTypes;
	};
};
