// OTHERS //
import { ELearningData } from "./courses";

export type UserData = {
  first_name: string;
  last_name: string;
  token: string;
}

export type UserDataResponse = {
  status: boolean;
  status_code: number,
  data: {
    user: UserData,
    courses: ELearningData[]
  }
}