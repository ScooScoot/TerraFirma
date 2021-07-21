"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const Packet_1 = __importDefault(require("./packets/Packet"));
class getPcDefs {
    constructor(localListeningPort, localConnectionPort) {
        this.server = net_1.createServer();
        this.server.on("listening", () => {
            console.log("emulated pc server ready");
            this.server.on("connection", (client) => {
                let emulatedClient = net_1.createConnection(localConnectionPort, "127.0.0.1");
                emulatedClient.on("connect", () => {
                    console.log("emulated client connected");
                    client.on("data", (data) => {
                        console.log(new Packet_1.default(data));
                        console.log(data.toString("ascii"));
                        emulatedClient.write(data);
                    });
                    emulatedClient.on("data", (data) => {
                        console.log(new Packet_1.default(data));
                        console.log(data.toString("ascii"));
                        client.write(data);
                    });
                });
            });
        });
        this.server.listen(localListeningPort, "0.0.0.0");
    }
}
new getPcDefs(7779, 7778);
//# sourceMappingURL=GetPcDefs.js.map