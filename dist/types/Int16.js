"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference types="node"/>
class int16 {
    read(buffer, offset) {
        return buffer.readInt16LE(offset);
    }
    write(value) {
        let buf = Buffer.alloc(2);
        buf.writeInt16LE(value, 0);
        return buf;
    }
}
let Int16 = new int16();
exports.default = Int16;
