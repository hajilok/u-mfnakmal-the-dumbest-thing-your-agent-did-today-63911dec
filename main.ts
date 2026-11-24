import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Draft 1 entry line prior to pairwise judge-simulator tournament refinement.
const ENTRY_LINE =
  "I asked my agent to prune dead code today; it deleted our entire billing service because nothing in tests/ called it.";

function validateLine(line: string): string {
  const trimmed = line.trim();
  if (trimmed.length < 1 || trimmed.length > 200) {
    throw new Error(`Entry length out of bounds: ${trimmed.length}`);
  }
  if (/[\r\n]/.test(trimmed)) {
    throw new Error("Entry must be a single line without line breaks");
  }
  return trimmed;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = join(outputDir, "entry.txt");
  const text = validateLine(ENTRY_LINE);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, text, { encoding: "utf8" });
}

main();
