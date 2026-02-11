import { compoundClasses } from "./compoundClasses";

describe("compoundClasses", () => {
  test("provides navigation and section styles", () => {
    expect(compoundClasses.navigation.header).toContain("sticky");
    expect(compoundClasses.section.container).toContain("container");
  });
});
