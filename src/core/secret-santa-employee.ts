import { Email } from "@/types";

export class SecretSantaEmployee {
  #name: string;
  #email: Email;

  #previousYearChild?: Email;
  #currentChild?: Email;

  constructor(name: string, email: string) {
    this.#name = name;
    this.#email = email;
  }

  setPreviousYearChild(childEmail: Email) {
    this.#previousYearChild = childEmail;
  }

  hasPreviousYearChild(): boolean {
    return !!this.#previousYearChild;
  }

  setCurrentChild(childEmail: Email) {
    this.#currentChild = childEmail;
  }

  hasCurrentChild(): boolean {
    return !!this.#currentChild;
  }

  getName(): string {
    return this.#name;
  }

  getEmail(): Email {
    return this.#email;
  }

  getCurrentChild(): Email {
    return this.#currentChild || "";
  }

  getPreviousYearChild(): Email {
    return this.#previousYearChild || "";
  }
}
