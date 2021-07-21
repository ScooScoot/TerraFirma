"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference types="node"/>
class int32 {
    read(buffer, offset) {
        return buffer.readInt32LE(offset);
    }
}
let Int32 = new int32();
exports.default = Int32;
