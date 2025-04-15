import { Problem } from "../types/problem";
import {abcString} from "./abc-string";
import { aCappellaRecording } from "./a-cappella-recording";
import { acceptableSeatingArrangements } from "./acceptable-seating-arrangements";

interface ProblemMap {
	[key: string]: Problem;
}

export const problems: ProblemMap = {
	"abc-string": abcString,
	"a-cappella-recording": aCappellaRecording,
	"acceptable-seating-arrangements": acceptableSeatingArrangements,
};