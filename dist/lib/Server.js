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
const net_1 = require("net");
const Packet_1 = __importDefault(require("../packets/Packet"));
const ConnectRequest_1 = __importDefault(require("../packets/ConnectRequest"));
const Client_1 = __importDefault(require("./Client"));
class TerrariumServer extends net_1.Server {
    constructor() {
        super();
        this.on("connection", (client) => __awaiter(this, void 0, void 0, function* () {
            client.on("data", (data) => {
                let packet = new Packet_1.default(data);
                if (packet.id === 1) {
                    let temp = new ConnectRequest_1.default(data);
                    temp.version = "\x0BTerraria230";
                    data = temp.serialized;
                }
                if (proxyClient.writable) {
                    proxyClient.write(data);
                }
                else {
                    proxyClient.writeQueue.push(data);
                }
            });
            client.on("close", () => {
                proxyClient.end();
            });
            let proxyClient = new Client_1.default();
            proxyClient.on("data", (data) => {
                if (client.writable)
                    client.write(data);
            });
            proxyClient.on("close", () => {
                proxyClient.end();
                client.end();
            });
            yield proxyClient.start(this.destinationPort, this.destinationAddress);
        }));
    }
    start(destinationPort, destinationAddress, listenerPort, listenerAddress) {
        this.destinationPort = destinationPort;
        this.destinationAddress = destinationAddress;
        return new Promise((resolve, reject) => {
            this.listen(listenerPort, listenerAddress, () => resolve(undefined));
        });
    }
}
exports.default = TerrariumServer;
