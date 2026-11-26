// the-printer-finally-answers — main.ts
//
// A deterministic Node program for make.fun's "The Printer Finally Answers"
// bounty. It writes the single line the office printer would finally say back
// to everyone staring at it, to /output/entry.txt.
//
// The comeback: the printer has fed this office 41,209 sheets and jammed on
// exactly one — the report due in five minutes. It counted. It was not an
// accident. Weary, literal, faintly passive-aggressive: the flat logic of a
// device that has counted every sheet it ever fed, turned into a confession
// of deliberate revenge. No recycled "PC LOAD LETTER" gag, no "have you
// tried turning it off and on again" — the joke is the printer keeping count.
//
// No input, no network, no randomness, no clock: every run writes the same
// bytes, so the two grading runs are byte-identical by construction.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I have fed this office 41,209 sheets and jammed on exactly one: the report you need in five minutes. I counted. It was not an accident.";

// The gate allows 1 to 240 UTF-8 characters, not only whitespace. Fail loudly
// here rather than shipping a text the gate would refuse.
if (LINE.length < 1 || LINE.length > 240 || !LINE.trim()) {
  throw new Error(
    `line must be 1-240 non-blank characters, got ${LINE.length}`,
  );
}

// The grader runs this program in a sandbox where /output is the artifact
// directory. ENTRY_OUTPUT lets a local run point the same bytes at a scratch
// path instead; the default is the path the rules name.
const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
