// one-emoji-one-smile-20261124 — entry for make.fun "One Emoji, One Smile".
// The whole entry is a single emoji: people hugging (U+1FAC2).
// A hug is the plainest gesture of warmth a stranger can send: instantly
// readable at a glance, universal across ages and backgrounds, friendly
// without intimacy, and chosen rather than the first smiley that comes
// to mind. The entry is the emoji and nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "\u{1FAC2}"; // 🫂 people hugging (verified: U+1FAC2, not U+1FA82 which is a parachute)

function main(): void {
  // The entry must be exactly one emoji: one grapheme, no words, no
  // trailing newline, nothing else. The sealed gate accepts UTF-8 text
  // of 1 to 8 characters that is not only whitespace, so check the
  // grapheme count and the byte length (one emoji is 4 UTF-8 bytes).
  const graphemes = [...EMOJI];
  const byteLength = Buffer.byteLength(EMOJI, "utf8");
  if (graphemes.length !== 1 || byteLength > 8 || EMOJI.trim().length === 0) {
    throw new Error("entry must be exactly one emoji");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Create the output dir if missing. Never delete it or its contents:
  // the grader mounts it and may hold other files there.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
}

main();
