"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Packet_1 = __importDefault(require("./Packet"));
const Color_1 = __importDefault(require("../types/Color"));
const Byte_1 = __importDefault(require("../types/Byte"));
const Bit_1 = __importDefault(require("../types/Bit"));
const StringType_1 = __importDefault(require("../types/StringType"));
class PlayerAppearancePacket extends Packet_1.default {
    constructor(raw) {
        super(raw);
        this.playerId = Byte_1.default.read(this.payload, 0);
        this.variant = Byte_1.default.read(this.payload, 1);
        this.hairStyle = Byte_1.default.read(this.payload, 2);
        //read from end of buffer now to determine length of name string
        this.torchFlags = Bit_1.default.all(this.payload, this.length);
        this.difficulty = Bit_1.default.all(this.payload, this.length - 1);
        this.shoeColor = Color_1.default.read(this.payload, this.length - 2);
        this.pantsColor = Color_1.default.read(this.payload, this.length - 5);
        this.undershirtColor = Color_1.default.read(this.payload, this.length - 8);
        this.shirtColor = Color_1.default.read(this.payload, this.length - 11);
        this.eyeColor = Color_1.default.read(this.payload, this.length - 14);
        this.skinColor = Color_1.default.read(this.payload, this.length - 17);
        this.hairColor = Color_1.default.read(this.payload, this.length - 20);
        this.hideMisc = Byte_1.default.read(this.payload, this.length - 23);
        this.hideAccessory2 = Bit_1.default.all(this.payload, this.length - 24);
        this.hideAccessory1 = Bit_1.default.all(this.payload, this.length - 25);
        this.hairDye = Byte_1.default.read(this.payload, this.length - 26);
        let stringLength = this.length - 27;
        this.name = StringType_1.default.read(this.payload, 3);
    }
}
exports.default = PlayerAppearancePacket;
