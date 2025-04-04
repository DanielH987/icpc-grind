import assert from "assert";
import { Problem } from "../types/problem";

export const aCappellaRecordingHandler = (fn: any) => {
	try {
		const tests = [
			{ n: 6, d: 0, pitches: [3, 1, 4, 1, 5, 9] },
			{ n: 6, d: 1, pitches: [3, 1, 4, 1, 5, 9] },
			{ n: 6, d: 2, pitches: [3, 1, 4, 1, 5, 9] },
			{ n: 6, d: 4, pitches: [3, 1, 4, 1, 5, 9] },
			{ n: 6, d: 8, pitches: [3, 1, 4, 1, 5, 9] },
		];
		const answers = [5, 4, 3, 2, 1];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i].n, tests[i].d, tests[i].pitches);
			assert.equal(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.error("Error from aCappellaRecordingHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeACappellaRecordingJS = `function minRecordings(n, d, pitches) {
  // Write your code here
};`;

export const aCappellaRecording: Problem = {
    id: "a-cappella-recording",
    title: "11. A Cappella Recording",
    tests:  [
      [6, 0, [3, 1, 4, 1, 5, 9]],
      [6, 1, [3, 1, 4, 1, 5, 9]],
      [6, 2, [3, 1, 4, 1, 5, 9]],
      [6, 4, [3, 1, 4, 1, 5, 9]],
      [6, 8, [3, 1, 4, 1, 5, 9]],
    ],
    problemStatement: `<p class='mt-3'>
    Geoffry is preparing an a cappella composition where he sings the entire song by himself.
  </p>
  <p class='mt-3'>
    Each note of the song has a pitch between 0 and 10^9. Because of the varying pitches in the song,
    Geoffry will record himself singing multiple times. In a single recording, he will pick some subset
    of the notes to sing and he will sing exactly those notes. To avoid straining his voice too much,
    within a single recording, there is a limit to the difference between the maximum pitch and the
    minimum pitch among the notes he sings.
  </p>
  <p class='mt-3'>
    Compute the minimum number of times that Geoffry can record himself singing the song and each
    note is sung in at least one of the recordings.
  </p>`,
    examples: [
        {
            id: 0,
            inputText: `n = 6, d = 0, pitches = [3, 1, 4, 1, 5, 9]`,
            outputText: `5`,
            explanation: "Since d=0, each distinct pitch requires a separate recording, except for repeated notes.",
        },
        {
            id: 1,
            inputText: `n = 6, d = 1, pitches = [3, 1, 4, 1, 5, 9]`,
            outputText: `4`,
            explanation: "Grouping pitches in recordings within a range of d=1 minimizes the number of recordings.",
        },
        {
            id: 2,
            inputText: `n = 6, d = 2, pitches = [3, 1, 4, 1, 5, 9]`,
            outputText: `3`,
            explanation: "Grouping pitches in recordings within a range of d=2 minimizes the number of recordings.",
        },
        {
            id: 3,
            inputText: `n = 6, d = 4, pitches = [3, 1, 4, 1, 5, 9]`,
            outputText: `2`,
            explanation: "Grouping pitches in recordings within a range of d=4 minimizes the number of recordings.",
        },
        {
            id: 4,
            inputText: `n = 6, d = 8, pitches = [3, 1, 4, 1, 5, 9]`,
            outputText: `1`,
            explanation: "Grouping pitches in recordings within a range of d=8 minimizes the number of recordings.",
        },
    ],
    constraints: `<li class='mt-2'><code>1 <= n <= 10^5</code></li>
    <li class='mt-2'><code>0 <= d <= 10^9</code></li>
    <li class='mt-2'><code>0 <= pitches[i] <= 10^9</code></li>`,
    starterCode: starterCodeACappellaRecordingJS,
    handlerFunction: aCappellaRecordingHandler,
    starterFunctionName: "function minRecordings(",
    order: 6,
};
