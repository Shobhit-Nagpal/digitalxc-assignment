import { SecretSantaEmployee } from "@/core/secret-santa-employee";
import { expect, test } from "vitest";

test("Secret Santa Employee", () => {
  const employee = new SecretSantaEmployee("Shobhit", "shobhit@acme.com");
  expect(employee.getName()).toBe("Shobhit");
});
