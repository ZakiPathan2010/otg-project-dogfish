// TYPES //
import { ChipColorData } from "./components/chip";

type StatusData = {
	icon_name: React.ComponentType<SvgProps>;
	bg_color: ChipColorData;
	text: string;
};

export type StatusConfigData = {
	[key: number]: StatusData;
};