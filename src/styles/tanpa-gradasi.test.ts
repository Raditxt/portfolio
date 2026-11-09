import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const src = fileURLToPath(new URL("..", import.meta.url));

test("tidak ada gradasi di CSS atau TSX mana pun di src", () => {
  const berkas = readdirSync(src, { recursive: true, encoding: "utf8" }).filter((p) =>
    /\.(css|tsx)$/.test(p),
  );
  const pelanggar = berkas.filter((p) => /gradient\(/i.test(readFileSync(join(src, p), "utf8")));
  expect(pelanggar).toEqual([]);
});
