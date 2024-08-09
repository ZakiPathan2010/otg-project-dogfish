// REACT //
import React, { useCallback, useEffect, useState, memo } from "react";

// REACT NATIVE //
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";

// PLUGINS //
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

// TYPES //
import { ELearningData } from "../../types/courses";
import { ModuleFilterData } from "../../types/filters";

// ENUMS //
import { ELearningTypes } from "../../enums/e-learning.enum";

// STYLES //
import { homeStyles } from "./home.style";
import { commonStyles } from "../../components/common-styles/commonStyles";
import tokens from "../../infrastructure/theme/tokens/designTokens";

// COMPONENTS //
import ModuleCard from "../../components/card/ModuleCard";
import ProgressBar from "../../components/common-components/ProgressBar";
import Switch from "../../components/common-components/Switch";
import FieldContent from "../../components/common-components/FieldContent";
import Button from "../../components/common-components/buttons/Button";
import CommonHeader from "../../components/common-components/header/CommonHeader";
import ELearningSortPopup from "../../components/popup/ELearningSortPopup";
import FilterPopup from "../../components/popup/Filter";
import Toast from "../../components/common-components/Toast";

// CONTEXTS //
import { useCoursesContext } from "@/contexts/Courses.context";

// UTILS //
import {
  filterELearningsUtil,
  getHomeProgress,
  getSubjects,
  getTargetGroups,
} from "./utils/home";

// NAVIGATION //
import { useFocusEffect } from "@react-navigation/native";

// SVG's //
import Help from "../../assets/icons/help.svg";
import Filter from "../../assets/icons/filter.svg";
import UpwardArrow from "../../assets/icons/upward-arrow.svg";
import DownwardArrow from "../../assets/icons/down-arrow.svg";

export default function Home() {
  // Define Contexts
  const { courses } = useCoursesContext();

  // Define States
  const [displayELearnings, setDisplayELearnings] = useState<ELearningData[]>(
    courses || []
  );
  const [isSwitchEnable, setIsSwitchEnable] = useState<boolean>(false);
  const [moduleSubjects, setModuleSubjects] = useState<string[]>([]);
  const [moduleTargetGroups, setModuleTargetGroups] = useState<string[]>([]);
  const [eLearningProgress, setELearningProgress] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filters, setFilters] = useState<ModuleFilterData>({
    subjects: [],
    targetGroups: [],
  });
  const [sortType, setSortType] = useState<string>("Name");
  // Filter and Sort Popups
  const [showELearningSortPopup, setShowELearningSortPopup] =
    useState<boolean>(false);
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastTitle, setToastTitle] = useState<string>("");

  // Define Refs

  // Helper Functions
  /** Get all the Unique Subjects available */
  const getELearningSubjects = useCallback(() => {
    courses && setModuleSubjects(getSubjects(courses));
  }, [courses]);

  /** Get all the unique Target Groups of the Modules */
  const getELearningTargetGroups = useCallback(() => {
    courses && setModuleTargetGroups(getTargetGroups(courses));
  }, [courses]);

  /** Get the Progress in the overall E-Learning's */
  const getELearningProgress = useCallback(() => {
    courses && setELearningProgress(getHomeProgress(courses));
  }, [courses]);

  /** Filter the Modules/Series by the text types in Search */
  const filterELearnings = () => {
    courses &&
      setDisplayELearnings(filterELearningsUtil(courses, searchInput, filters));
  };

  /** Flat List - Render E Learning Item */
  const renderELearningItem = (item: ELearningData, index: number) => {
    if (!displayELearnings.includes(item)) {
      return null;
    }
    // Return a Module Card
    return (
      <View
        style={homeStyles.cardComponent}
        key={`module-${item.module?.module_id}`}
      >
        <ModuleCard
          module={item.module}
          moduleIndex={index}
          source={ELearningTypes.MODULE}
          router={router}
        />
      </View>
    );
  };

  /** This function shows a popup to show ELearning Dropdown */
  const showELearningDropdown = () => {
    setShowELearningSortPopup(true);
  };

  /** This function shows a popup to show Filter */
  const showFilter = () => {
    setShowFilterPopup(true);
  };

  /** This function shows a Toast */
  const showToast = (title: string) => {
    setToastTitle(title);
    setToastVisible(true);
  };

  // Use Effect and Focus Effect

  useEffect(() => {
    filterELearnings();
  }, [searchInput, filters]);

  useEffect(() => {
    getELearningSubjects();
    getELearningTargetGroups();
  }, []);

  useFocusEffect(() => {
    getELearningProgress();
  });

  return (
    <SafeAreaView>
      {/* Status Bar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={tokens.UI_BLACK}
        translucent
      />

      {/* Header */}
      <CommonHeader
        onNotificationClick={() => showToast("No notifications to show")}
        router={router}
      />

      {/* Main Content */}
      <ScrollView>
        <View style={[commonStyles.container, homeStyles.homeContainer]}>
          <View style={homeStyles.homeHeaderWrap}>
            {/* Title */}
            <View style={homeStyles.homeTitleWrap}>
              <Text style={homeStyles.homeTitle}>Welcome back,</Text>
              <Text style={homeStyles.homeTitle}>Jean-Luc!</Text>
            </View>

            <View>
              {/* Heading */}
              <Text style={homeStyles.homeHeading}>My Requirements</Text>

              {/* Description */}
              <Text style={homeStyles.description}>
                You have been assigned the following series and modules specific to your
                role.
              </Text>
            </View>
          </View>

          {/* Progress Bar Component */}
          <View style={homeStyles.progressInfo}>
            <Text style={homeStyles.progressInfoText}>Overall Progress</Text>
            <ProgressBar
              progressPercentage={eLearningProgress}
              backgroundColor={tokens.LAYOUT_COMPONENT_BG_TINT}
              foregroundColor={tokens.FEEDBACK_INFO_EMP}
              textColor={tokens.LAYOUT_CONTENT_SECONDARY}
            />
          </View>

          <View style={homeStyles.infoSwitch}>
            {/* Adaptive Learning - Switch */}
            <Switch
              value={isSwitchEnable}
              onValueChange={setIsSwitchEnable}
              text="Adaptive Learning"
            />

            {/* Help Icon */}
            <TouchableOpacity
              style={homeStyles.helpButton}
              activeOpacity={0.8}
              onPress={() => showToast("Info not available")}
            >
              <Help height={20} width={20} color={tokens.ACTION_NEUTRAL_FG} />
            </TouchableOpacity>
          </View>

          {/* Field Content Component - Search Bar */}
          <FieldContent value={searchInput} onChangeText={setSearchInput} />

          <View style={homeStyles.homeCtaWrap}>
            {/* Name Button */}
            <TouchableOpacity
              style={homeStyles.nameDropdownButton}
              onPress={showELearningDropdown}
              activeOpacity={0.8}
            >
              <Button
                iconName={UpwardArrow}
                text={sortType}
                buttonStyle="text"
                size="large"
                type="neutral"
                onClick={showELearningDropdown}
              />
              <View style={homeStyles.nameDropdownBorder} />
              <DownwardArrow
                height={16}
                width={16}
                style={homeStyles.nameDropdownIcon}
              />
            </TouchableOpacity>

            {/* Filter Button */}
            <Button
              iconName={Filter}
              text="Filter"
              buttonStyle="text"
              size="large"
              type="neutral"
              onClick={showFilter}
            />
          </View>

          {/* All the Modules/Series Wrap */}
          <View>
            {displayELearnings.length > 0 ? (
              courses.map((eLearningItem, eLearningIndex) =>
                renderELearningItem(eLearningItem, eLearningIndex)
              )
            ) : (
              <View style={homeStyles.noModuleWrap}>
                <Text style={homeStyles.noModuleText}>No modules available.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Sort Popup */}
      <ELearningSortPopup
        onClosePopup={() => {
          setShowELearningSortPopup(false);
        }}
        showPopup={showELearningSortPopup}
        sortBy={sortType}
        onSortApplied={(sortType) => setSortType(sortType)}
      />

      {/* Filter Popup */}
      <FilterPopup
        onClosePopup={() => {
          setShowFilterPopup(false);
        }}
        showPopup={showFilterPopup}
        subjects={moduleSubjects}
        targetGroups={moduleTargetGroups}
        filters={filters}
        onFilterApplied={(filterItems) => setFilters(filterItems)}
      />

      {/* Toast */}
      <Toast
        text={toastTitle}
        color="error"
        setVisible={() => setToastVisible(false)}
        visible={toastVisible}
      />
    </SafeAreaView>
  );
};

