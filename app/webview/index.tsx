// REACT //
// REACT //
// REACT //
import React, { useEffect, useRef, useState } from "react";

// REACT NATIVE //
import { ActivityIndicator, BackHandler, Text, View } from "react-native";

// PLUGINS //
import { WebView, WebViewNavigation } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaView } from "react-native-safe-area-context";

// TYPES //
import { LocalModuleItemData, ModuleData } from "../../types/courses";

// ENUMS //
import { ELearningTypes, Status } from "../../enums/e-learning.enum";

// STYLES //
import { webviewStyles } from "./components/webview.styles";

// CONTEXTS //
import { useSharedValueContext } from "../../contexts/SharedValue.context";

// SERVICES //
import {
    getDataStorage,
    setDataStorage,
} from "../../services/storage.service";

// UTILS //
import { getRandomStatusForChapter } from "../../utils/eLearning.util";

// NAVIGATION //
import { RouteProp, useNavigation } from "@react-navigation/native";

// REACT NATIVE //

// PLUGINS //

// TYPES //

// ENUMS //

// STYLES //

// CONTEXTS //

// SERVICES //

// UTILS //

// NAVIGATION //

// REACT NATIVE //

// PLUGINS //
import { router, useLocalSearchParams } from "expo-router";

// TYPES //

// ENUMS //

// STYLES //

// CONTEXTS //

// SERVICES //

// UTILS //

// NAVIGATION //
/** Functional Component of WebView Screen */
export default function webview() {
    // Navigation params
    const { moduleData } = useLocalSearchParams();

    const moduleItem = useRef<ModuleData | null | undefined>(
        JSON.parse(moduleData)
    );

    // Navigation Hook
    const navigation = useNavigation();

    // Define Contexts
    const { eLearnings, seriesIndex, moduleIndex, updateELearnings } =
        useSharedValueContext();

    // Define States

    // Check the Source Type and set Module Accordingly
    const module = useRef<ModuleData | undefined>(
        eLearnings[moduleIndex]?.module
    );

    const [currentUrl, setCurrentUrl] = useState<string>("");

    const localModuleItem = useRef<LocalModuleItemData>(null);

    const [shouldLoad, setShouldLoad] = useState<boolean>();

    // Define Constants
    //const playerPath = source[0]. // Get the Rustici Player Path
    // URL to open in Webview (For Rustici Player), the Params remain constant
    //const sourceURL = `https://oceantg-dev.engine.scorm.com/RusticiEngine/defaultui/launch.jsp?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYXVuY2giLCJjb25maWd1cmF0aW9uIjoiIiwicmVnaXN0cmF0aW9uIjoiY3J1aXNlLWRlbW8teGFwaS1LeG1OMDV5Ny10ZXN0TGVhcm5lcklkIiwianRpIjoianhTTE9ySk1TaUczNDhfMFJXRHFtQSJ9.JeoWutk2rImnPhRCe_73iJ9dqPk0H9vMeNastjpuLD4`;

    // Define Refs
    const webviewRef = React.useRef<WebView>(null);

    // Helper Functions

    /** Get data of the module from Local Storage  */
    const setupPlayerConfiguration = async () => {
        /* try {
            // Get the the Local Module Data from Local Storage
            const localStorageModule = await getDataFromLocalStorage(
                module?.current?.module_id ?? ""
            );
            // Set the Local Module Data (even if undefined)
            localModuleItem.current = localStorageModule;

            let configurationJsContent = localStorageModule?.configurationJs ?? "";
            // Data is not available for the Module
            if (!localStorageModule) {
                // Get Configuration JS content from the Course Folder
                configurationJsContent = await getConfigurationContentFromFileService(
                    module?.current?.module_id
                );
            }
            if (configurationJsContent) {
                // Store the Configuration JS in Rustici Player Folder
                await setConfigurationFileService(configurationJsContent);
                setShouldLoad(true);
            } else {
                setShouldLoad(false);
            }
            console.log("Configuration JS Content", configurationJsContent.length);
        } catch (error) {
            console.log("Error in getModuleData", error);
        } */
    };

    /** Function to handle the Player Closed Event */
    const handlePlayerClosed = async (payload: any) => {
        // Structure the data as per the requirements of our LS Data Type
        const localStorageModule: LocalModuleItemData = await getLocalModuleItem(
            payload
        );
        // Store the Local Module Data in Local Storage
        await setDataStorage(
            module?.current?.module_id ?? "",
            localStorageModule
        );
        // Redirect to the back screen
        navigation.goBack();
    };

    /** Function to handle the events from the Webview */
    const onMessage = async (payload: any) => {
        // Get the Data/Payload from the event fired by Rustici Player
        const eventPayload = JSON.parse(payload.nativeEvent.data);
        // Check the Event Type
        switch (eventPayload.event) {
            case "player_closed":
                // Player Closed Event
                await handlePlayerClosed(eventPayload);
                break;
            default:
                break;
        }
    };

    // TODO: Make the code more modular and reusable (Declarative Programming)
    /** Function to give the data to store locally */
    const getLocalModuleItem = async (data: any): Promise<LocalModuleItemData> => {
        const {
            configurationJs,
            runtimeXml,
        }: { configurationJs: string; runtimeXml: string } = data;
        const localModuleData = {
            configurationJs:
                configurationJs ?? localModuleItem?.current?.configurationJs,
            runtimeXml: runtimeXml ?? localModuleItem?.current?.runtimeXml,
            // TODO: Parse the runtimeXml and get the other data
            score: localModuleItem?.current?.score ?? Math.floor(Math.random() * 100),
            status: localModuleItem?.current?.status ?? Status.IN_PROGRESS,
            learning_units: localModuleItem?.current?.learning_units ?? {},
        };

        // Loop through the Chapters and set the status and score of the Chapters as Learning Units for the Module
        module?.current?.chapters?.forEach((chapter) => {
            // First Check if the learning unit does not have Completed Status, then only update the Status
            if (
                !localModuleData?.learning_units[chapter.chapter_id] ||
                localModuleData?.learning_units[chapter.chapter_id].status !==
                Status.COMPLETED
            ) {
                const randomStatus = getRandomStatusForChapter();
                localModuleData.learning_units[chapter.chapter_id] = {
                    status: randomStatus,
                    score: randomStatus === Status.COMPLETED ? 100 : 0,
                };
            }
        });
        // Check if All Chapters are Completed - Then set the Module Status as Completed otherwise In Progress
        localModuleData.status = module?.current?.chapters?.every(
            (chapter) =>
                localModuleData?.learning_units[chapter.chapter_id].status ===
                Status.COMPLETED
        )
            ? Status.COMPLETED
            : Status.IN_PROGRESS;

        return localModuleData;
    };

    /** Function to handle the navigation of the Webview and perform tasks based on the Current Url */
    const handleLoadEnd = () => {
        if (currentUrl.includes("offline-results.html")) {
            // Current page is Offline results then Inject JS to get local runtimeXML and ConfigurationJS

            //   JS to get the data from Webview Local Storage to pass o App
            const injectedJavascript = `(function() {
			const configurationJsLocalStorage = window.localStorage.getItem('configurationJs');
			const runtimeXmlLocalStorage = window.localStorage.getItem('runtimeXml');
			window.ReactNativeWebView.postMessage(JSON.stringify({configurationJs : configurationJsLocalStorage,runtimeXml:runtimeXmlLocalStorage,event:'player_closed'}));
		  })();`;
            webviewRef?.current?.injectJavaScript(injectedJavascript);
        }
    };

    // Use Effect and Focus Effect
    useEffect(() => {
        // Set the Screen Orientation to Auto
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        //setupPlayerConfiguration();
        // On Exit of the Screen set the Screen Orientation to Portrait
        return () => {
            // Update the E-Learning Data in the Context
            updateELearnings();
            // Set the Screen Orientation to Portrait
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        };
    }, []);

    useEffect(() => {
        /** Back button handler to redirect to offline-results.html to get the latest Configuration JS and Runtime XML */
        const backAction = () => {
            // Call your function here
            // Redirect the Webview to Offline Results Page
            if (webviewRef?.current) {
                webviewRef?.current?.injectJavaScript(
                    "window.location.href = 'offline-results.html';"
                );
                // Return true to prevent default back button behavior
                return true;
            }
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={webviewStyles.webviewContainer}>
            <WebView
                style={webviewStyles.webviewItem}
                ref={webviewRef}
                source={{ uri: "https://oceantg-dev.engine.scorm.com" + moduleItem.current?.launch_link }}
                allowFileAccess={true}
                allowFileAccessFromFileURLs={true}
                allowsFullscreenVideo={true}
                allowUniversalAccessFromFileURLs={true}
                javaScriptEnabled={true}
                allowsInlineMediaPlayback={true}
                javaScriptCanOpenWindowsAutomatically={false}
                mixedContentMode="always"
                domStorageEnabled={true}
                setSupportMultipleWindows={false}
                useWebKit={true}
                networkActivityIndicatorVisible={true}
                mediaPlaybackRequiresUserGesture={false}
                loadWithOverviewMode={false}
                allowContentAccess={true}
                geolocationEnabled={true}
                cacheEnabled={true}
                onMessage={onMessage}
                onLoadEnd={handleLoadEnd}
                onNavigationStateChange={(navState: WebViewNavigation) => {
                    // Set the Current URL of the Webview in the State
                    setCurrentUrl(navState.url);
                }}
                originWhitelist={["*"]}
                useWebView2={true}
            />
        </SafeAreaView>
    );
};
