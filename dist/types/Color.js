"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Byte_1 = __importDefault(require("./Byte"));
class color {
    read(buffer, offset) {
        let result = [];
        while (result.length < 3) {
            result.push(Byte_1.default.read(buffer, offset + result.length));
        }
        return result;
    }
}
let Color = new color();
exports.default = Color;
