"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Byte_1 = __importDefault(require("../types/Byte"));
const Packet_1 = __importDefault(require("./Packet"));
class ConnectionApprovedPacket extends Packet_1.default {
    constructor(raw) {
        super(raw);
        this.playerId = Byte_1.default.read(this.payload, 0);
    }
}
exports.default = ConnectionApprovedPacket;
