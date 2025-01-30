import { SecretSantaEmployee } from "@/core/secret-santa-employee";
import { expect, test } from "vitest";

test("employee name", () => {
  const employee = new SecretSantaEmployee("Shobhit", "shobhit@acme.com");
  expect(employee.getName()).toBe("Shobhit");
});

test("employee email", () => {
  const employee = new SecretSantaEmployee("Shobhit", "shobhit@acme.com");
  expect(employee.getEmail()).toBe("shobhit@acme.com");
});

test("check prev child", () => {
  const employee = new SecretSantaEmployee("Shobhit", "shobhit@acme.com");
  expect(employee.hasPreviousYearChild()).toBe(false);
});
