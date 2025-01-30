import fs from "fs/promises";
import { SecretSantaManager } from "@/core/managers/secret-santa-manager";
import { expect, test, beforeEach } from "vitest";
import * as XLSX from "xlsx";

async function readExcelFile(filename: string) {
  const response = await fs.readFile(filename);
  const workbook = XLSX.read(response, {
    type: "array",
    cellDates: true,
    cellStyles: true,
  });

  // Get the first sheet
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convert to array of arrays, skip header row
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  return data.slice(1) as string[][]; // Skip header row
}

test("doesn't have same child as prev year", async () => {
  // Read current year and previous year data from Excel
  const data = await readExcelFile("/home/shbhtngpl/personal/assesments/digitalxc-assignment/data/Secret-Santa-Game-Result-2023.xlsx");
  const currentYearData = data.map((row) => row.slice(0,2))
  const previousYearData = data.map((row) => row.slice(2, row.length))

  // Initialize Secret Santa Manager
  const manager = SecretSantaManager.getInstance();

  // Create new pairings
  manager.createPairings(currentYearData, previousYearData);

  // Get results
  const results = manager.getResult();

  // Create a map of previous year assignments
  const previousYearAssignments = new Map<string, string>();
  for (const row of previousYearData) {
    previousYearAssignments.set(row[1], row[3]); // Using email columns
  }

  // Check that no employee has the same child as previous year
  for (const result of results) {
    const previousChild = previousYearAssignments.get(result.employeeEmail);
    if (previousChild) {
      expect(result.childEmail).not.toBe(previousChild);
    }
  }

  // Additional checks
  // 1. Check no self-assignments
  for (const result of results) {
    expect(result.employeeEmail).not.toBe(result.childEmail);
  }

  // 2. Check that all assignments form a complete cycle
  const assignments = new Map<string, string>();
  for (const result of results) {
    assignments.set(result.employeeEmail, result.childEmail);
  }

  // Verify cycle
  const visited = new Set<string>();
  let current = results[0].employeeEmail;

  while (!visited.has(current)) {
    visited.add(current);
    current = assignments.get(current)!;
  }

  // Check that all employees are part of the cycle
  expect(visited.size).toBe(results.length);

  // 3. Check that every employee is both a giver and receiver
  const givers = new Set(results.map((r) => r.employeeEmail));
  const receivers = new Set(results.map((r) => r.childEmail));

  expect(givers.size).toBe(receivers.size);
  for (const giver of givers) {
    expect(receivers.has(giver)).toBe(true);
  }
});
