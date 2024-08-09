// REACT NATIVE //
import { StyleSheet } from "react-native";

// STYLES //
import tokens from "../../infrastructure/theme/tokens/designTokens";

// UTILS //

export const homeStyles = StyleSheet.create({
    homeHeaderWrap: {
        marginBottom: tokens.SPACE_XL,
    },
    homeTitleWrap: {
        marginBottom: tokens.SPACE_XL + tokens.SPACE_M,
    },
    homeTitle: {
        ...tokens.HEADING_02,
        color: tokens.LAYOUT_CONTENT_PRIMARY,
    },
    homeHeading: {
        ...tokens.HEADING_04,
        marginBottom: tokens.SPACE_S,
        color: tokens.LAYOUT_CONTENT_PRIMARY,
    },
    description: {
        ...tokens.BODY_1,
        color: tokens.LAYOUT_CONTENT_SECONDARY,
    },
    progressInfo: {},
    progressInfoText: {
        ...tokens.SUBTITLE_1,
        color: tokens.LAYOUT_CONTENT_PRIMARY,
        marginBottom: tokens.SPACE_M,
    },
    infoSwitch: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: tokens.SPACE_L,
        marginBottom: tokens.SPACE_XL + tokens.SPACE_S,
    },
    helpButton: {
        padding: tokens.SPACE_M,
    },
    homeCtaWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: tokens.SPACE_XL,
    },
    nameDropdownButton: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: -tokens.SPACE_XL - tokens.SPACE_S,
    },
    nameDropdownBorder: {
        borderLeftWidth: 1,
        height: 24,
        width: 1,
        backgroundColor: tokens.ACTION_NEUTRAL_FG,
        opacity: 0.4,
    },
    nameDropdownIcon: {
        marginLeft: tokens.SPACE_M,
    },
    cardComponent: {
        marginBottom: tokens.SPACE_XL,
    },
    homeContainer: {
        paddingTop: tokens.SPACE_XL * 2,
        paddingBottom: tokens.SPACE_XL * 3,
    },
    noModuleWrap: {
        marginBottom: tokens.SPACE_XL,
        alignItems: "center",
        padding: tokens.SPACE_XL,
    },
    noModuleText: {
        fontFamily: "ibm-plex-sans-regular",
        fontSize: tokens.FONT_SIZE_2,
        color: tokens.LAYOUT_CONTENT_PRIMARY,
    },
});
