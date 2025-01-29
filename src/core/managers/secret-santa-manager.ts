import { Email, SecretSantaResult } from "@/types";
import { SecretSantaEmployee } from "../secret-santa-employee";

export class SecretSantaManager {
  private static instance: SecretSantaManager | null = null;
  private employees: SecretSantaEmployee[] = [];

  private constructor() {}

  createPairings(data: string[][], previousYearData?: string[][]) {
    this.employees = [];

    this.employees = data.map((row) => new SecretSantaEmployee(row[0], row[1]));

    if (previousYearData) {
      for (const row of previousYearData) {
        const employeeEmail = row[0];
        const previousChildEmail = row[3];

        const employee = this.findEmployeeByEmail(employeeEmail);
        if (employee) {
          employee.setPreviousYearChild(previousChildEmail);
        }
      }
    }

    const n = this.employees.length;
    const adjacencyMatrix: boolean[][] = Array(n)
      .fill(false)
      .map(() => Array(n).fill(true));

    // Remove invalid edges (self-assignments and previous year matches)
    for (let i = 0; i < n; i++) {
      const currentEmployee = this.employees[i];

      for (let j = 0; j < n; j++) {
        // Remove self-assignments
        if (i === j) {
          adjacencyMatrix[i][j] = false;
          continue;
        }

        const potentialChild = this.employees[j];

        // Remove previous year assignments
        if (
          currentEmployee.hasPreviousYearChild() &&
          currentEmployee.getEmail() === potentialChild.getEmail()
        ) {
          adjacencyMatrix[i][j] = false;
        }
      }
    }

    // Find valid assignments using DFS
    const visited = new Set<number>();
    const assigned = new Set<number>();
    const path: number[] = [];

    const findValidPath = (current: number): boolean => {
      if (path.length === n && adjacencyMatrix[current][path[0]]) {
        // Found valid cycle
        return true;
      }

      visited.add(current);
      for (let next = 0; next < n; next++) {
        if (!adjacencyMatrix[current][next] || assigned.has(next)) continue;

        path.push(next);
        assigned.add(next);

        if (findValidPath(next)) return true;

        path.pop();
        assigned.delete(next);
      }
      visited.delete(current);
      return false;
    };

    // Try to find valid assignments starting from each employee
    let success = false;
    for (let start = 0; start < n && !success; start++) {
      visited.clear();
      assigned.clear();
      path.length = 0;

      path.push(start);
      assigned.add(start);
      success = findValidPath(start);
    }

    if (!success) {
      throw new Error("Could not find valid Secret Santa assignments");
    }

    // Set current assignments based on found path
    for (let i = 0; i < path.length; i++) {
      const currentEmployee = this.employees[path[i]];
      const childEmployee = this.employees[path[(i + 1) % path.length]];
      currentEmployee.setCurrentChild(childEmployee.getEmail() as Email);
    }
  }

  getResult(): Array<SecretSantaResult> {
    return this.employees.map((employee) => {
      const childEmail = employee.getEmail();
      const child = this.findEmployeeByEmail(childEmail);

      if (!child) {
        throw new Error(
          `Could not find child for employee ${employee.getName()}`,
        );
      }

      return {
        employeeName: employee.getName(),
        employeeEmail: employee.getEmail(),
        childName: child.getName(),
        childEmail: childEmail,
      };
    });
  }
  findEmployeeByEmail(email: string) {
    return this.employees.find((emp) => emp.getEmail() === email);
  }

  public static getInstance(): SecretSantaManager {
    if (!SecretSantaManager.instance) {
      SecretSantaManager.instance = new SecretSantaManager();
    }

    return SecretSantaManager.instance;
  }
}
