"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference types="node"/>
class bit {
    read(buffer, byte, bit) {
        return (buffer[byte] >> bit) % 2;
    }
    write(buffer, byte, bit, value) {
        if (value == 0) {
            buffer[byte] &= ~(1 << bit);
        }
        else {
            buffer[byte] |= 1 << bit;
        }
    }
    all(buffer, byte) {
        let res = [];
        while (res.length < 8) {
            res.push(this.read(buffer, byte, res.length));
        }
        return res;
    }
}
let Bit = new bit();
exports.default = Bit;
