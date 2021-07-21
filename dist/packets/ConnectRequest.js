"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StringType_1 = __importDefault(require("../types/StringType"));
const Packet_1 = __importDefault(require("./Packet"));
class ConnectRequestPacket extends Packet_1.default {
    constructor(raw) {
        super(raw);
        this.typeKeys = { version: "string" };
        this.version = StringType_1.default.read(this.payload, 0);
    }
}
exports.default = ConnectRequestPacket;
