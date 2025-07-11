import { cn } from "../utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("px-4", "py-2", "bg-blue-500");
    expect(result).toBe("px-4 py-2 bg-blue-500");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const isInactive = false;
    const result = cn(
      "base-class",
      isActive && "active",
      isInactive && "inactive",
    );
    expect(result).toBe("base-class active");
  });

  it("should handle undefined and null values", () => {
    const result = cn("base-class", undefined, null, "valid-class");
    expect(result).toBe("base-class valid-class");
  });

  it("should merge conflicting Tailwind classes correctly", () => {
    const result = cn("px-4", "px-6");
    expect(result).toBe("px-6");
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["px-4", "py-2"], "bg-red-500");
    expect(result).toBe("px-4 py-2 bg-red-500");
  });

  it("should handle objects with boolean values", () => {
    const result = cn({
      "px-4": true,
      "py-2": false,
      "bg-blue-500": true,
    });
    expect(result).toBe("px-4 bg-blue-500");
  });
});
