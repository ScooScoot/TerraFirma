///<reference types="node"/>
export default class CliParser {
    args: string[];
    constructor(args: string[]) {
        this.args = args;
    }
    get(option: string) {
        let indexOfArg = this.args.indexOf(option);
        return this.args[indexOfArg + 1];
    };
}
