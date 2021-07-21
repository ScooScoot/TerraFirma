"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference types="node"/>
class float {
    read(buffer, offset) {
        return buffer.readFloatLE(offset);
    }
}
let Float = new float();
exports.default = Float;
