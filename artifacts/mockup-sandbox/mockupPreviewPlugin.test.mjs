import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { mockupPreviewPlugin } from "./mockupPreviewPlugin.ts";

test("mockup discovery preserves nested files, exclusions, and rescans", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "mockup-discovery-"));
  const generated = path.join(root, "src/.generated/mockup-components.ts");
  const plugin = mockupPreviewPlugin();
  plugin.configResolved({ root });

  async function add(relative) {
    const file = path.join(root, "src/components/mockups", relative);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, "export default function Preview() { return null; }");
  }

  try {
    // A missing mockups directory must still produce a valid empty module.
    await plugin.buildStart();
    assert.match(await readFile(generated, "utf8"), /modules: ModuleMap = \{\n\n\};/);

    for (const file of [
      "Main.tsx", "nested/Card.tsx", "_Hidden.tsx", "_private/Secret.tsx",
      "nested/_Internal.tsx", ".hidden/Dot.tsx", ".Dot.tsx", "ignore.ts",
    ]) {
      await add(file);
    }
    await mkdir(path.join(root, "src/components/mockups/Directory.tsx"));
    await plugin.buildStart();
    const source = await readFile(generated, "utf8");
    assert.match(source, /"\.\/components\/mockups\/Main\.tsx"/);
    assert.match(source, /import\("\.\.\/components\/mockups\/nested\/Card\.tsx"\)/);
    assert.doesNotMatch(source, /Hidden|Secret|Internal|Dot|ignore|Directory/);
    assert.equal((source.match(/\(\) => import/g) ?? []).length, 2);

    await rm(path.join(root, "src/components/mockups/Main.tsx"));
    await add("New.tsx");
    await plugin.buildStart();
    const rescanned = await readFile(generated, "utf8");
    assert.doesNotMatch(rescanned, /Main\.tsx/);
    assert.match(rescanned, /New\.tsx/);
    assert.match(rescanned, /nested\/Card\.tsx/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
