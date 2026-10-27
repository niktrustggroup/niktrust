import { describe, expect, it } from "vitest";
import { toggleInList, MAX_COMPARE } from "@/lib/site";

describe("compare list", () => {
  it("allows at most 4 platforms", () => {
    expect(MAX_COMPARE).toBe(4);
    expect(toggleInList(["a", "b", "c", "d"], "e")).toEqual(["a", "b", "c", "d"]);
  });
  it("removes a platform that is already selected", () => {
    expect(toggleInList(["a", "b"], "a")).toEqual(["b"]);
  });
});
