"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerrariumClient = exports.TerrariumServer = void 0;
const Server_1 = __importDefault(require("./lib/Server"));
exports.TerrariumServer = Server_1.default;
const Client_1 = __importDefault(require("./lib/Client"));
exports.TerrariumClient = Client_1.default;
