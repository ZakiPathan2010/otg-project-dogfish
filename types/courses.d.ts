// ENUMS //
import { ELearningTypes, ModuleTypes, Status } from "../enums/e-learning.enum";

// TYPES //
import { ImageSourcePropType } from "react-native";

// Target Group interface
interface TargetGroupData {
  id: number;
  name: string;
}

// Chapter interface
interface ChapterData {
  chapter_id: number;
  name: string;
  is_assessment: boolean;
  prerequisites: []; // You can define a type for prerequisites if needed
  sco_id: string;
  is_visible: boolean;
  duration: string;
  estimation?: number; // Optional field
  status?: Status;
  mastery_score?: number;
}

// Module interface
interface ModuleData {
  module_id: string;
  module_name: string;
  descriptions: string[];
  duration: number;
  type: ModuleTypes;
  training_number: string;
  minimum_score: number;
  current_release_number: number;
  zip_path: string;
  launch_link: string;
  release_date: string;
  cover_image: ImageSourcePropType;
  number_of_release: number;
  subject: string;
  about_description: string;
  target_groups: TargetGroupData[];
  regulations: string[];
  chapters: ChapterData[];
  mastery_score?: number;
  status?: Status;
}

// eLearning interface
interface ELearningData {
  e_learning_type: ELearningTypes;
  module?: ModuleData;
  series?: SeriesData;
}

type LocalModuleItemData = {
  runtimeXml: string;
  configurationJs: string;
  score: number;
  status: Status;
  learning_units: {
    [key: number | string]: {
      // Chapter ID
      status: Status;
      score: number;
    };
  };
};

export {
  TargetGroupData,
  ChapterData,
  ModuleData,
  ELearningData,
  LocalModuleItemData
};
