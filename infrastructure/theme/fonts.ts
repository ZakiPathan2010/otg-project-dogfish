import { useFonts } from "expo-font";

// Import fonts
import MONTSERRAT_LIGHT from "../../../assets/fonts/montserrat/montserrat-light.ttf";
import MONTSERRAT_REGULAR from "../../../assets/fonts/montserrat/montserrat-regular.ttf";
import MONTSERRAT_MEDIUM from "../../../assets/fonts/montserrat/montserrat-medium.ttf";
import MONTSERRAT_SEMI_BOLD from "../../../assets/fonts/montserrat/montserrat-semibold.ttf";
import MONTSERRAT_BOLD from "../../../assets/fonts/montserrat/montserrat-bold.ttf";
import MONTSERRAT_BLACK from "../../../assets/fonts/montserrat/montserrat-black.ttf";
import IBM_PLEX_SANS_LIGHT from "../../../assets/fonts/ibm-plex-sans/ibm-plex-sans-light.ttf";
import IBM_PLEX_SANS_REGULAR from "../../../assets/fonts/ibm-plex-sans/ibm-plex-sans-regular.ttf";
import IBM_PLEX_SANS_MEDIUM from "../../../assets/fonts/ibm-plex-sans/ibm-plex-sans-medium.ttf";
import IBM_PLEX_SANS_SEMI_BOLD from "../../../assets/fonts/ibm-plex-sans/ibm-plex-sans-semibold.ttf";
import IBM_PLEX_SANS_BOLD from "../../../assets/fonts/ibm-plex-sans/ibm-plex-sans-bold.ttf";

/** Load Fonts */
export const loadFonts = () => {
	return useFonts({
		"montserrat-black": MONTSERRAT_BLACK,
		"montserrat-bold": MONTSERRAT_BOLD,
		"montserrat-semibold": MONTSERRAT_SEMI_BOLD,
		"montserrat-medium": MONTSERRAT_MEDIUM,
		"montserrat-regular": MONTSERRAT_REGULAR,
		"montserrat-light": MONTSERRAT_LIGHT,
		"ibm-plex-sans-light": IBM_PLEX_SANS_LIGHT,
		"ibm-plex-sans-regular": IBM_PLEX_SANS_REGULAR,
		"ibm-plex-sans-medium": IBM_PLEX_SANS_MEDIUM,
		"ibm-plex-sans-semibold": IBM_PLEX_SANS_SEMI_BOLD,
		"ibm-plex-sans-bold": IBM_PLEX_SANS_BOLD,
	});
};
