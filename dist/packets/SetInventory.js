"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Packet_1 = __importDefault(require("./Packet"));
const Byte_1 = __importDefault(require("../types/Byte"));
const Int16_1 = __importDefault(require("../types/Int16"));
class SetInventoryPacket extends Packet_1.default {
    constructor(raw) {
        super(raw);
        this.playerId = Byte_1.default.read(this.payload, 0);
        this.slotId = Byte_1.default.read(this.payload, 1);
        this.itemStack = Int16_1.default.read(this.payload, 2);
        this.itemPrefix = Byte_1.default.read(this.payload, 4);
        this.itemId = Byte_1.default.read(this.payload, 5);
    }
}
exports.default = SetInventoryPacket;
