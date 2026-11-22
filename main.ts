// The picture that tastes of one ingredient — make.fun entry.
// Copies the pre-rendered food photograph (entry.png) to the grader's
// output directory. Node 22, stdlib only, no network.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(outDir, { recursive: true });
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
copyFileSync(src, dst);

const size = statSync(dst).size;
if (size > 1048576) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB cap`);
}
console.log(`wrote entry.png (${size} bytes) to ${dst}`);
