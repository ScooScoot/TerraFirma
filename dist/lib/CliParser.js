"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference types="node"/>
class CliParser {
    constructor(args) {
        this.args = args;
    }
    get(option) {
        let indexOfArg = this.args.indexOf(option);
        return this.args[indexOfArg + 1];
    }
    ;
}
exports.default = CliParser;
