"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const PacketsMappedToId_1 = __importDefault(require("../packets/PacketsMappedToId"));
const Packet_1 = __importDefault(require("../packets/Packet"));
const ConnectRequest_1 = __importDefault(require("../packets/ConnectRequest"));
class getPcDefs {
    constructor(localListeningPort, localConnectionPort) {
        this.server = net_1.createServer();
        this.server.on("listening", () => {
            console.log("emulated pc server ready");
            this.server.on("connection", (client) => {
                let emulatedClient = net_1.createConnection(localConnectionPort, "127.0.0.1");
                let emulatedClientQueue = [];
                client.on("data", (data) => {
                    let packet = new Packet_1.default(data);
                    console.log(packet);
                    if (PacketsMappedToId_1.default[packet.id]) {
                        let pack = new PacketsMappedToId_1.default[packet.id](data);
                        if (pack.id === 1) {
                            let connectPack = pack;
                            connectPack.version = "\x0BTerraria230";
                            data = pack.serialized;
                        }
                        console.log(pack);
                        console.log(data);
                        console.log(pack.serialized);
                    }
                    if (!emulatedClient.writable) {
                        emulatedClientQueue.push(data);
                        emulatedClient.once("connect", () => {
                            emulatedClient.write(data);
                        });
                    }
                    else {
                        emulatedClient.write(data);
                    }
                    if (PacketsMappedToId_1.default[packet.id]) {
                        let pack = new Packet_1.default(data); //new Packets[packet.id](data) as Packet;
                        if (pack.id === 1) {
                            let connectPack = new ConnectRequest_1.default(data);
                            connectPack.version = "\x0BTerraria230";
                        }
                        console.log(pack);
                        console.log(data);
                        console.log(pack.serialized);
                    }
                });
                emulatedClient.on("connect", () => {
                    console.log("emulated client connected");
                    emulatedClient.on("data", (data) => {
                        let packet = new Packet_1.default(data);
                        console.log(packet);
                        client.write(data);
                        /*if (Packets[packet.id]) {
                            let pack = new Packets[packet.id](data) as Packet;
                            console.log(pack);
                            console.log(data);
                            console.log(pack.serialized);
                        }*/
                    });
                    emulatedClientQueue.forEach((data) => {
                        emulatedClient.write(data);
                    });
                });
            });
        });
        this.server.listen(localListeningPort, "0.0.0.0");
    }
}
new getPcDefs(7779, 7777);
//# sourceMappingURL=GetPcDefs.js.map