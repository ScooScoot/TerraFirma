"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class byte {
    read(buffer, offset) {
        return buffer.readUIntLE(offset, 1);
    }
    write(value) {
        let buf = Buffer.alloc(1);
        buf.writeUIntLE(value, 0, 1);
        return buf;
    }
}
let Byte = new byte();
exports.default = Byte;
