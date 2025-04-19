import { Problem } from "../types/problem";
import { Language } from "../types/problem";

const starterCodeAcceptableSeatingJS = `/**
 * @param {number[][]} original - The initial acceptable seating arrangement
 * @param {number[][]} target - The desired acceptable seating arrangement
 * @returns {number[][]} - List of swaps, each represented as [r1, c1, r2, c2]
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

const starterCodeAcceptableSeatingJava = `public class Solution {
    public static List<List<Integer>> acceptableSeatingArrangements(int[][] original, int[][] target) {
        // Write your code here
        return new ArrayList<>();
    }
}`;

const languageMap: Record<Language, string> = {
  javaScript: starterCodeAcceptableSeatingJS,
  python: starterCodeAcceptableSeatingPython,
  cpp: starterCodeAcceptableSeatingCPP,
  java: starterCodeAcceptableSeatingJava,
};

export const acceptableSeatingArrangements: Problem = {
  id: "acceptable-seating-arrangements",
  title: "3: Acceptable Seating Arrangements",
  problemStatement: `
    <p class='mt-3'>
      Charlie is managing a classroom. The seats in the classroom are arranged in a grid with <code>r</code> rows and <code>c</code> columns. Each student has a distinct height.
    </p>
    <br />
    <p>
      A configuration of students is considered <strong>acceptable</strong> if the following conditions are met:
      <br /><br />
      <ul class='list-disc ml-6'>
        <li>Each student is assigned to exactly one seat.</li>
        <li>Each row contains students sorted in strictly increasing order of height from left to right.</li>
      </ul>
    </p>
    <br />
    <p>
      The students are initially seated in an acceptable arrangement. Charlie wants to rearrange students into a different acceptable arrangement. To do this, he can swap any two students.
      However, he wants to ensure that the configuration stays acceptable after each swap.
    </p>
    <br />
    <p>
      Help Charlie devise a strategy to move the students from the original arrangement to his preferred arrangement. You don’t need to minimize the number of swaps, but you are limited to at most <code>10⁴</code> swaps
    </p>
    <br />
    <p>
      It can be proven that this is always possible for all possible inputs that satisfy the input constraints.
    </p>
  `,
  examples: [
    {
      id: 0,
      inputText: `original = [[1, 4, 5], [2, 3, 6]], target = [[3, 5, 6], [1, 2, 4]]`,
      outputText: `[[2,1,1,1],[2,2,1,2],[2,3,1,3],[2,3,1,2]]`,
      explanation: `The original grid is converted to the target by a series of valid swaps that maintain acceptable order in each row.`
    }
  ],
  constraints: `
    <ul>
      <li class='mt-2'><code>1 ≤ r, c ≤ 20</code></li>
      <li class='mt-2'>Each height <code>h</code> is distinct and in the range <code>1 ≤ h ≤ r ⋅ c</code></li>
      <li class='mt-2'>Both the original and target configurations are guaranteed to be acceptable</li>
      <li class='mt-2'>You may perform at most <code>10⁴</code> swaps</li>
    </ul>
  `,
  tests: [
    [[[1, 4, 5], [2, 3, 6]], [[3, 5, 6], [1, 2, 4]]],
  ],
  answers: [
    [[2, 1, 1, 1], [2, 2, 1, 2], [2, 3, 1, 3], [2, 3, 1, 2]],
  ],
  starterCode: languageMap,
  starterFunctionName: "acceptableSeatingArrangements",
  order: 3,
};
