import { Problem } from "../types/problem";
import {abcString} from "./abc-string";
import { aCappellaRecording } from "./a-cappella-recording";

interface ProblemMap {
	[key: string]: Problem;
}

export const problems: ProblemMap = {
	"abc-string": abcString,
	"a-cappella-recording": aCappellaRecording,
};