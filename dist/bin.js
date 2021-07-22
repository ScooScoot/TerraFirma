#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./lib/Server"));
const CliParser_1 = __importDefault(require("./lib/CliParser"));
(function () {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let args = process.argv;
        args.shift();
        args.shift();
        let parser = new CliParser_1.default(args);
        let [destinationAddress, destinationPort] = ((_a = parser.get("-d")) === null || _a === void 0 ? void 0 : _a.split(":")) || [
            "127.0.0.1",
            "7777",
        ];
        let [listenAddress, listenPort] = ((_b = parser.get("-l")) === null || _b === void 0 ? void 0 : _b.split(":")) || [
            "0.0.0.0",
            "7778",
        ];
        /*let [destinationAddress, destinationPort] = args[0]
            ? args[0].split(":")
            : ["127.0.0.1", "7777"];
        let [listenAddress, listenPort] = args[1]
            ? args[1].split(":")
            : ["0.0.0.0", "7778"];
    */
        let server = new Server_1.default();
        console.log("Starting Terrarium.");
        yield server.start(parseInt(destinationPort), destinationAddress, parseInt(listenPort), listenAddress);
        console.log(`Terrarium ready on ${listenAddress}:${listenPort}`);
        server.on("connection", (client) => {
            console.log(`${client.remoteAddress}:${client.remotePort} connected.`);
            client.on("close", () => {
                console.log(`${client.remoteAddress}${client.remotePort} disconnected.`);
            });
        });
    });
})();
