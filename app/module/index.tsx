// REACT //
import React, { useEffect, useMemo, useState, useRef } from "react";

// REACT NATIVE //
import { View, Text, StatusBar, TouchableOpacity, ScrollView } from "react-native";

// MODULES //
import { moduleDetailStyles } from "./components/moduleDetail.styles";
import { convertModuleTypeToString } from "../../utils/module.util";
import { getModuleProgress } from "./utils/module.util";

// PLUGINS //
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

// TYPES //
import { ModuleData } from "../../types/courses";

// ENUMS //
import { ELearningTypes, Status } from "../../enums/e-learning.enum";

// STYLES //
import { commonStyles } from "../../components/common-styles/commonStyles";
import tokens from "../../infrastructure/theme/tokens/designTokens";

// COMPONENTS //
import { Image } from "expo-image";
import CommonHeader from "../../components/common-components/header/CommonHeader";
import Chip from "../../components/common-components/Chip";
import ResumeContainer from "./components/ResumeContainer";
import Alert from "../../components/common-components/Alert";
import LearningUnitCard from "./components/LearningUnitCard";
import WhatYouLearnComponent from "../../components/common-components/WhatYouLearnComponent";
import Breadcrumb from "../../components/common-components/header/Breadcrumb";
import ReadMoreLess from "../../components/read-more-less/ReadMoreLess";
import Toast from "../../components/common-components/Toast";

// CONTEXTS //
import { useCoursesContext } from "@/contexts/Courses.context";
import { useSharedValueContext } from "../../contexts/SharedValue.context";

// NAVIGATION //
import { useFocusEffect } from "@react-navigation/native";

// SVG's //
import Download from "../../assets/icons/cloud-download.svg"
import { router, useLocalSearchParams } from "expo-router";


export default function ModuleDetials() {
    // Navigation params
    const { moduleData } = useLocalSearchParams();
    const { source } = useLocalSearchParams();

    // Navigation

    // Define Contexts
    //const { eLearnings, moduleIndex } = useSharedValueContext();
    //const { courses } = useCoursesContext();

    // Define States & Refs
    const [toastVisible, setToastVisible] = useState<boolean>(false);
    const [toastTitle, setToastTitle] = useState<string>("");
    const module = useRef<ModuleData | null | undefined>(
        JSON.parse(moduleData)
    );
    const [nextChapter, setNextChapter] = useState<string>(
        module.current?.chapters[0].name ?? ""
    );
    const [progress, setProgress] = useState<number>(0);

    // Use useMemo to calculate moduleChipText
    const moduleChipText = useMemo(() => {
        if (module.current && module.current.type) {
            return convertModuleTypeToString(module.current.type);
        }
        return "";
    }, [module.current]);

    // Define Refs

    // Helper Functions
    /** This function shows a Toast */
    const showToast = (title: string) => {
        setToastTitle(title);
        setToastVisible(true);
    };

    /** Get the Text for Bread Crumb */
    const getBreadcrumbText = useMemo(() => {
        return "Home";
    }, [moduleData]);

    /** Get the next Chapter to Resume to */
    const getNextChapter = () => {
        // Find the first Chapter that is not started or in progress
        const nextChapterItem = module.current?.chapters.find(
            (chapterItem) =>
                chapterItem.status === Status.NOT_STARTED ||
                chapterItem.status === Status.IN_PROGRESS
        );
        // Set the name of the next Chapter
        if (nextChapterItem) {
            setNextChapter(nextChapterItem.name);
        }
    };

    /** Calculate the Progress of the Module */
    const calculateProgress = () => {
        module.current && setProgress(getModuleProgress(module.current));
    };

    // Use Effect and Focus Effect
    useFocusEffect(() => {
        getNextChapter();
        calculateProgress();
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
                {/* Cover Image - Module */}
                <View style={moduleDetailStyles.imageContainer}>
                    <Image
                        style={moduleDetailStyles.headerImage}
                        source={module.current?.cover_image}
                    />
                    {/* Gradient Design over the Cover Image */}
                    <LinearGradient
                        colors={[
                            `rgba(${tokens.LAYOUT_SURFACE_LEVEL1_RGB}, 0.00)`,
                            `rgba(${tokens.LAYOUT_SURFACE_LEVEL1_RGB}, 0.00)`,
                            tokens.LAYOUT_SURFACE_LEVEL1,
                        ]}
                        start={[0, 0]}
                        end={[0, 1]}
                        style={moduleDetailStyles.gradientOverlay}
                    />
                </View>

                {/* Module Information */}
                <View
                    style={[commonStyles.container, moduleDetailStyles.moduleDetailContainer]}
                >
                    <Breadcrumb
                        onClick={() => {
                            router.back();
                        }}
                        text={getBreadcrumbText}
                    />

                    {/* Module Info */}
                    <View style={commonStyles.headSectionWrap}>
                        {/* Module Title */}
                        <Text style={moduleDetailStyles.moduleDetailTitle}>
                            {module.current?.module_name}
                        </Text>

                        {/* Module Other Info */}
                        <View style={moduleDetailStyles.infoWrap}>
                            <View>
                                <Chip
                                    size="xSmall"
                                    text={moduleChipText}
                                    color="info"
                                    chipStyle="filled"
                                />
                            </View>
                            <Text style={moduleDetailStyles.infoText}>
                                #{module.current?.training_number}
                            </Text>
                        </View>
                    </View>

                    <View style={commonStyles.alertComponentWrap}>
                        <Alert
                            type="inPage"
                            title={
                                module.current?.zip_path === ""
                                    ? "This module does not appear in your requirements"
                                    : "This module appears in your requirements"
                            }
                            color={module.current?.zip_path === "" ? "error" : "info"}
                        />
                    </View>

                    <View style={moduleDetailStyles.resumeContainerWrap}>
                        <ResumeContainer
                            progress={progress}
                            chapterName={nextChapter}
                            moduleName={module.current?.module_name ?? ""}
                            assessmentScore={10}
                            source={source}
                            shouldOpenPlayer={module.current?.zip_path !== ""}
                            module={moduleData}
                        />
                    </View>

                    {/* Learning Units */}
                    <View style={moduleDetailStyles.moduleItemWrap}>
                        {/* Learning Unit's Title */}
                        <Text style={moduleDetailStyles.moduleDetailCommonTitle}>
                            Learning Units
                        </Text>
                        {/* Learning Unit's */}
                        <View style={moduleDetailStyles.chaptersList}>
                            {module.current?.chapters.map((chapterItem) => (
                                <LearningUnitCard
                                    key={`${module.current?.module_id}-${chapterItem.chapter_id}`}
                                    status={chapterItem.status ?? Status.NOT_STARTED}
                                    name={chapterItem.name}
                                    duration={chapterItem.duration}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Completing Activity */}
                    <View style={moduleDetailStyles.moduleItemWrap}>
                        <View style={moduleDetailStyles.chaptersList}>
                            {/* Completing This Activity Title */}
                            <Text style={moduleDetailStyles.moduleDetailCommonTitle}>
                                Completing This Activity
                            </Text>

                            <Text style={moduleDetailStyles.completeActivityDescription}>
                                In order to mark this activity as complete, please meet the following
                                requirements:
                            </Text>
                        </View>
                        <View style={moduleDetailStyles.completeActivityInfo}>
                            <Text style={moduleDetailStyles.completeActivityInfoText}>
                                Minimum score required:
                            </Text>
                            <Text style={moduleDetailStyles.completeActivityInfoPercentage}>
                                {module.current?.minimum_score}%
                            </Text>
                        </View>
                    </View>

                    <View style={moduleDetailStyles.moduleItemWrap}>
                        <WhatYouLearnComponent
                            pointers={module.current?.descriptions ?? []}
                            keyId={module.current?.module_id ?? ""}
                            description="The main learning objectives of this module are that the learner will be able to:"
                        />
                    </View>

                    {/* Module Details */}
                    <View style={moduleDetailStyles.moduleInfo}>
                        {/* Subject Area */}
                        <View style={moduleDetailStyles.moduleInfoItem}>
                            <Text style={moduleDetailStyles.moduleInfoTitle}>Subject Area</Text>
                            <Text style={moduleDetailStyles.moduleInfoDescription}>
                                {module.current?.subject === "" ? "_" : module.current?.subject}
                            </Text>
                        </View>

                        {/* Revisions */}
                        <View style={moduleDetailStyles.moduleInfoItem}>
                            <Text style={moduleDetailStyles.moduleInfoTitle}>Revisions</Text>
                            <Text style={moduleDetailStyles.moduleInfoDescription}>
                                {module.current?.number_of_release}
                            </Text>
                        </View>

                        {/* Product Code */}
                        <View style={moduleDetailStyles.moduleInfoItem}>
                            <Text style={moduleDetailStyles.moduleInfoTitle}>Product Code</Text>
                            <Text style={moduleDetailStyles.moduleInfoDescription}>
                                {module.current?.training_number}
                            </Text>
                        </View>

                        {/* Learning Units */}
                        <View style={moduleDetailStyles.moduleInfoItem}>
                            <Text style={moduleDetailStyles.moduleInfoTitle}>Learning Units</Text>
                            <Text style={moduleDetailStyles.moduleInfoDescription}>
                                {module.current?.chapters.length}
                            </Text>
                        </View>

                        {/* Average Duration */}
                        <View style={moduleDetailStyles.moduleInfoItem}>
                            <Text style={moduleDetailStyles.moduleInfoTitle}>Average Duration</Text>
                            <Text style={moduleDetailStyles.moduleInfoDescription}>
                                {module.current?.duration} minutes
                            </Text>
                        </View>
                    </View>

                    {/* Completion History */}
                    <View style={moduleDetailStyles.moduleItemWrap}>
                        {/* Completing This Activity Title */}
                        <Text style={moduleDetailStyles.moduleDetailCommonTitle}>
                            Completion History
                        </Text>

                        <View style={moduleDetailStyles.completionHistoryWrap}>
                            {/* Completion History Head */}
                            <View style={moduleDetailStyles.completionHistoryItem}>
                                <Text
                                    style={[
                                        moduleDetailStyles.completionHistoryDate,
                                        moduleDetailStyles.completionHistoryInfo,
                                    ]}
                                >
                                    Date
                                </Text>
                                <Text
                                    style={[
                                        moduleDetailStyles.completionHistoryScore,
                                        commonStyles.textCenter,
                                        moduleDetailStyles.completionHistoryInfo,
                                    ]}
                                >
                                    Score
                                </Text>
                                <Text
                                    style={[
                                        moduleDetailStyles.completionHistoryReport,
                                        commonStyles.textCenter,
                                        moduleDetailStyles.completionHistoryInfo,
                                    ]}
                                >
                                    Report
                                </Text>
                            </View>

                            {/* Completion History Item */}
                            <View style={moduleDetailStyles.completionHistoryItem}>
                                <Text
                                    style={[
                                        moduleDetailStyles.completionHistoryDate,
                                        moduleDetailStyles.completionHistoryInfo,
                                    ]}
                                >
                                    20 March 2024
                                </Text>
                                <Text
                                    style={[
                                        moduleDetailStyles.completionHistoryScore,
                                        commonStyles.textCenter,
                                        moduleDetailStyles.completionHistoryInfo,
                                    ]}
                                >
                                    100%
                                </Text>
                                <TouchableOpacity
                                    style={[
                                        moduleDetailStyles.completionHistoryReport,
                                        commonStyles.textCenter,
                                        moduleDetailStyles.completionHistoryInfo,
                                    ]}
                                    activeOpacity={0.8}
                                >
                                    <Download />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={moduleDetailStyles.moduleItemWrap}>
                        {/* Completing This Activity Title */}
                        <Text style={moduleDetailStyles.moduleDetailCommonTitle}>
                            About this Module
                        </Text>

                        {/* Module Description */}
                        <ReadMoreLess
                            description={module.current?.about_description ?? ""}
                            noOfLines={2}
                        />
                    </View>

                    {/* Activity */}
                    <View style={moduleDetailStyles.moduleItemWrap}>
                        {/* Activity Title */}
                        <Text style={moduleDetailStyles.moduleDetailCommonTitle}>
                            This activity is suitable for:
                        </Text>

                        {/* Activity Tags */}
                        <View style={moduleDetailStyles.activityChipWrap}>
                            {/* Activity Tag */}
                            <View style={moduleDetailStyles.activityChipWrap}>
                                {module.current?.target_groups.map((targetGroupItem) => (
                                    <View
                                        key={targetGroupItem.name}
                                        style={moduleDetailStyles.activityChipItem}
                                    >
                                        <Chip
                                            size="large"
                                            color="default"
                                            chipStyle="filled"
                                            text={targetGroupItem.name}
                                            shape="round"
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Regulations */}

                    {module.current?.regulations && module.current?.regulations.length > 0 && (
                        <View style={moduleDetailStyles.moduleItemWrap}>
                            {/* Regulations Title */}
                            <Text style={moduleDetailStyles.moduleDetailCommonTitle}>
                                Regulations
                            </Text>

                            <View style={moduleDetailStyles.regulationsWrap}>
                                {module.current?.regulations.map((regulationItem) => (
                                    // Regulation Item
                                    <View style={moduleDetailStyles.regulationItem} key={regulationItem}>
                                        <View style={moduleDetailStyles.regulationDot} />
                                        <Text style={moduleDetailStyles.regulationDescription}>
                                            {regulationItem}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>

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
