import { Problem } from "../types/problem";
import { aCappellaRecording } from "./a-cappella-recording";

interface ProblemMap {
	[key: string]: Problem;
}

export const problems: ProblemMap = {
	"a-cappella-recording": aCappellaRecording,
};