"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionApproved_1 = __importDefault(require("./ConnectionApproved"));
const ConnectRequest_1 = __importDefault(require("./ConnectRequest"));
const PlayerAppearance_1 = __importDefault(require("./PlayerAppearance"));
const SetInventory_1 = __importDefault(require("./SetInventory"));
const Packets = {
    1: ConnectRequest_1.default,
    3: ConnectionApproved_1.default,
    4: PlayerAppearance_1.default,
    5: SetInventory_1.default,
};
exports.default = Packets;
