"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class stringType {
    read(buffer, offset) {
        return buffer
            .slice(offset, buffer.length)
            .toString("ascii")
            .split("\\x00\\x00")[0];
    }
    write(data, needsTerminator = true) {
        return Buffer.from(`${data}${needsTerminator ? "\\x00\\x00" : ""}`, "ascii");
    }
}
let StringType = new stringType();
exports.default = StringType;
