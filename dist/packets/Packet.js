"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Byte_1 = __importDefault(require("../types/Byte"));
const Int16_1 = __importDefault(require("../types/Int16"));
const StringType_1 = __importDefault(require("../types/StringType"));
class Packet {
    constructor(raw) {
        this.typeKeys = {};
        this.length = Int16_1.default.read(raw, 0) - 1;
        this.id = Byte_1.default.read(raw, 2);
        this.hexid = this.id.toString(16);
        this.payload = raw.slice(3);
    }
    get serialized() {
        let keys = Object.keys(this.typeKeys);
        let res = [];
        for (let i = 0; i < keys.length; i++) {
            let type = this.typeKeys[keys[i]];
            let name = keys[i];
            let value = this[name];
            switch (type) {
                case "string": {
                    res.push(StringType_1.default.write(value, i !== keys.length - 1));
                    break;
                }
                default: {
                    throw "Type not found";
                    process.exit();
                }
            }
        }
        let payload = Buffer.concat(res);
        let id = Byte_1.default.write(this.id);
        return Buffer.concat([
            Int16_1.default.write(payload.byteLength + 3),
            id,
            payload
        ]);
    }
}
exports.default = Packet;
