export default class Scenario {
    static _instance: Scenario | null = null

    private constructor() {}

    static get instance(): Scenario {
        if (!Scenario._instance) {
            Scenario._instance = new Scenario()
        }
        return Scenario._instance
    }
}