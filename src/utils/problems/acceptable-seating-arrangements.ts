import { Problem } from "../types/problem";
import { Language } from "../types/problem";

const starterCodeAcceptableSeatingJS = `/**
 * @param {number[][]} original - The original grid of student heights
 * @param {number[][]} target - The target grid of student heights
 * @returns {number[][]} - An array of swaps, where each swap is [r1, c1, r2, c2]
 */
function acceptableSeatingArrangements(original, target) {
  // Write your code here
};
`;

const starterCodeAcceptableSeatingPython = `def acceptable_seating_arrangements(original: list[list[int]], target: list[list[int]]) -> list[list[int]]:
    # Write your code here
    pass
`;

const starterCodeAcceptableSeatingCPP = `#include <vector>
using namespace std;

vector<vector<int>> acceptableSeatingArrangements(vector<vector<int>>& original, vector<vector<int>>& target) {
    // Write your code here
    return {};
}
`;

const languageMap: Record<Language, string> = {
  javaScript: starterCodeAcceptableSeatingJS,
  python: starterCodeAcceptableSeatingPython,
  cpp: starterCodeAcceptableSeatingCPP,
};

export const acceptableSeatingArrangements: Problem = {
  id: "acceptable-seating-arrangements",
  title: "B. Acceptable Seating Arrangements",
  problemStatement: `
    <p className="mt-3">
      Charlie is managing a classroom arranged in an <code>r</code> by <code>c</code> grid. Each student has a unique height. 
      A seating configuration is <strong>acceptable</strong> if each student sits in exactly one seat and the students are 
      seated in <strong>increasing order of height</strong> from left to right in each row.
      <br /><br />
      Given an initial acceptable arrangement and a desired target acceptable arrangement, help Charlie 
      convert the former into the latter using <strong>swaps</strong> of any two students. The catch is that after 
      <em>each</em> swap, the configuration must remain acceptable. You may use up to <code>10⁴</code> swaps.
    </p>`,
  examples: [
    {
      id: 0,
      inputText: `original = [[1,4,5],[2,3,6]] target = [[3,5,6],[1,2,4]]`,
      outputText: `[[2,1,1,1],[2,2,1,2],[2,3,1,3],[2,3,1,2]]`,
      explanation: "The students are swapped while maintaining increasing height in each row after each operation."
    }
  ],
  constraints: `
      <li className="mt-2"><code>1 ≤ r, c ≤ 20</code></li>
      <li className="mt-2">All student heights are distinct integers.</li>
      <li className="mt-2">Initial and target arrangements are both acceptable.</li>
      <li className="mt-2">You may perform at most <code>10⁴</code> swaps.</li>
    `,
  tests: [
    [[ [1,4,5],[2,3,6] ], [ [3,5,6],[1,2,4] ]],
  ],
  answers: [
    [[2,1,1,1],[2,2,1,2],[2,3,1,3],[2,3,1,2]]
  ],
  starterCode: languageMap,
  starterFunctionName: "acceptableSeatingArrangements",
  order: 3,
};
