import { Problem } from "../types/problem";
import { Language } from "../types/problem";

const starterCodeABCStringJS = `/**
 * @param {string} s - A string consisting of equal counts of A, B, and C
 * @returns {number} - Minimum number of beautiful subsequences
 */
function minBeautifulSubsequences(s) {
  // Write your code here
};`;

const starterCodeABCStringPython = `def min_beautiful_subsequences(s: str) -> int:
    # Write your code here
    pass`;

const starterCodeABCStringCPP = `#include <string>
using namespace std;

int minBeautifulSubsequences(string s) {
    // Write your code here
    return 0;
}`;

const starterCodeABCStringJava = `public class Solution {
  public static int minBeautifulSubsequences(String s) {
      // Write your code here
      return 0;
  }
}`;

const languageMap: Record<Language, string> = {
  javaScript: starterCodeABCStringJS,
  python: starterCodeABCStringPython,
  cpp: starterCodeABCStringCPP,
  java: starterCodeABCStringJava,
};

export const getStarterCode = (language: Language): string => {
  return languageMap[language];
};

export const abcString: Problem = {
  id: "abc-string",
  title: "1. ABC String",
  tests: [
    ["ABACBCAACCBB"],
  ],
  answers: [2],
  problemStatement: `<p class='mt-3'>
    You’re given a string consisting of the characters A, B, and C. The string contains the same count of A, B, and C characters.
  </p>
  <p class='mt-3'>
    A string is <strong>beautiful</strong> if:
    <ul class='list-disc ml-6'>
      <li>Its length is divisible by 3.</li>
      <li>The string can be split evenly into contiguous substrings of size 3, where each substring has one A, one B, and one C, in any order.</li>
    </ul>
  </p>
  <p class='mt-3'>
    For example: <code>ABCCBA</code> is a beautiful string, but <code>ABCAB</code> and <code>CCBAAB</code> are not beautiful.
  </p>
  <p class='mt-3'>
    Given a string, you want to partition it into subsequences (not necessarily contiguous) such that each subsequence is a beautiful string.
  </p>
  <p class='mt-3'>
    For example, for the string <code>ABACBCAACCB</code>, we can do the following:
  </p>
  <pre>
  AB   CA C B
    ACB  A C B
  </pre>
  <p class='mt-3'>
    This partitions the string into two subsequences <code>ABCACB</code> and <code>ACBACB</code>, both of which are beautiful.
  </p>
  <p class='mt-3'>
    Find the minimum number of subsequences you can partition the input into such that each subsequence is beautiful.
  </p>
  <p class='mt-3'>
    It can be proven that there is always at least one such partition for all possible inputs that satisfy the input constraints.
  </p>`,
  examples: [
    {
      id: 0,
      inputText: `s = "ABACBCAACCB"`,
      outputText: `2`,
      explanation: `The string can be partitioned into two beautiful subsequences: ABCACB and ACBACB.`,
    },
  ],
  constraints: `<li class='mt-2'><code>3 <= |s| <= 3 * 10^5</code></li>
  <li class='mt-2'><code>|s|</code> is divisible by 3</li>
  <li class='mt-2'>s contains an equal number of characters A, B, and C</li>`,
  starterCode: languageMap,
  starterFunctionName: "function minBeautifulSubsequences(",
  order: 1,
};
