import { Email, SecretSantaResult } from "@/types";
import { SecretSantaEmployee } from "../secret-santa-employee";

export class SecretSantaManager {
  private static instance: SecretSantaManager | null = null;
  private employees: SecretSantaEmployee[] = [];

  createPairings(data: string[][], previousYearData?: string[][]) {
    this.employees = [];
    this.employees = data.map((row) => new SecretSantaEmployee(row[0], row[1]));

    // Set previous year assignments if available
    if (previousYearData) {
      for (const row of previousYearData) {
        const employeeEmail = row[1]; // Using email from column 2
        const previousChildEmail = row[3]; // Using email from column 4
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
        const potentialChild = this.employees[j];

        // Remove self-assignments
        if (i === j) {
          adjacencyMatrix[i][j] = false;
          continue;
        }

        // Remove previous year assignments
        if (
          currentEmployee.hasPreviousYearChild() &&
          currentEmployee.getPreviousYearChild() === potentialChild.getEmail()
        ) {
          adjacencyMatrix[i][j] = false;
        }
      }
    }

    // Find valid assignments using DFS
    const assigned = new Array(n).fill(false);
    const path: number[] = [];

    const findValidPath = (
      current: number,
      start: number,
      count: number,
    ): boolean => {
      // If we've assigned everyone and can complete the cycle back to start
      if (count === n && adjacencyMatrix[current][start]) {
        path.push(start);
        return true;
      }

      // Try each potential child
      for (let next = 0; next < n; next++) {
        if (!adjacencyMatrix[current][next] || assigned[next]) continue;

        assigned[next] = true;
        path.push(next);

        if (findValidPath(next, start, count + 1)) {
          return true;
        }

        assigned[next] = false;
        path.pop();
      }

      return false;
    };

    // Try to find valid assignments starting from each employee
    let success = false;
    for (let start = 0; start < n && !success; start++) {
      path.length = 0;
      assigned.fill(false);
      assigned[start] = true;
      path.push(start);
      success = findValidPath(start, start, 1);
    }

    if (!success) {
      throw new Error("Could not find valid Secret Santa assignments");
    }

    // Set current assignments based on found path
    for (let i = 0; i < n; i++) {
      const currentEmployee = this.employees[path[i]];
      const childEmployee = this.employees[path[(i + 1) % n]];
      currentEmployee.setCurrentChild(childEmployee.getEmail() as Email);
    }

  }

  getResult(): Array<SecretSantaResult> {
    return this.employees.map((employee) => {
      const childEmail = employee.getCurrentChild();
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
