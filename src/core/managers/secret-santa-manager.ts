export class SecretSantaManager {
  private static instance: SecretSantaManager | null = null;

  createGame() {}

  getResult() {}

  public static getInstance(): SecretSantaManager {
    if (!SecretSantaManager.instance) {
      SecretSantaManager.instance = new SecretSantaManager();
    }

    return SecretSantaManager.instance;
  }
}
