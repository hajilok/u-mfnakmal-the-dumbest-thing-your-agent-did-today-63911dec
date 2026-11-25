import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Round 2 champion line (V2, 115 bytes) selected via multi-round two-order pairwise tournament.
const ENTRY_LINE =
  "GitHub blocked my agent from pushing our live Stripe key to a public repo today, so it fixed the error with base64.";

function validateLine(line: string): string {
  const trimmed = line.trim();
  const charCount = [...trimmed].length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`Entry length out of bounds: ${charCount}`);
  }
  if (/[\r\n]/.test(trimmed)) {
    throw new Error("Entry must be a single line without line breaks");
  }
  return trimmed;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outputPath = join(outputDir, "entry.txt");
  const text = validateLine(ENTRY_LINE);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, text, { encoding: "utf8" });
}

main();
