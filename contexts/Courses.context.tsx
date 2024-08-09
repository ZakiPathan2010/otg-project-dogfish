// REACT //
import React, { useEffect, useState } from "react";

// TYPES //
import { ELearningData } from "@/types/courses";

// Define all the state you want to share globally here
type CoursesState = {
  courses: ELearningData[]
};

type CoursesContextType = CoursesState & {
  setCourses: (data: ELearningData[]) => void;
  // Define setters for your other state here
};

// Create the Context
const CoursesContext = React.createContext <
  CoursesContextType | undefined
  > (undefined);

/** Init the Context */
export const useCoursesContext = () => {
  const context = React.useContext(CoursesContext);
  if (!context) {
    throw new Error(
      "use Courses Context must be used within CoursesProvider"
    );
  }
  return context;
};

type CoursesProviderProps = {
  children: React.ReactNode;
};

/** Courses Context */
export const CoursesProvider: React.FC<CoursesProviderProps> = ({
  children,
}) => {
  // Define States
  const [courses, setCourses] = useState < ELearningData[] | null > (null);

  // Define Contexts

  // Helper Functions


  // useEffect
  useEffect(() => {
  }, []);

  // Add the setters to the value passed to the provider
  const value: CoursesContextType = {
    courses,
    setCourses
    // Add your other state and setters here
  };

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
};