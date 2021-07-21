"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
class TerrariumClient extends net_1.Socket {
    constructor() {
        super(...arguments);
        this.writeQueue = [];
    }
    start(port, address) {
        return new Promise((resolve, reject) => {
            this.connect(port, address, () => {
                this.writeQueue.forEach((data) => {
                    this.write(data);
                });
                resolve(undefined);
            });
        });
    }
}
exports.default = TerrariumClient;
/*export default class Client {
    constructor() {
        let client = new Socket();
        client.on("data", (data: Buffer) => {
            let packet = new Packet(data);
            console.log(`Type is ${packet.type.toString()}`);
            console.log(`Length is ${packet.length.toString()}`)
            console.log(`Content is ${StringType.read(packet.payload, 0, packet.payload.length)}`);
        });
        client.on("connect", () => {
            let type = Buffer.alloc(1);
            type[0] = 1;
            let content = Buffer.from("LegacyMultiplayer.2", "ascii");
            let jointType = Buffer.concat([type, content]);
            let length = Buffer.alloc(4);
            length.writeInt32LE(jointType.byteLength, 0);
            client.write(Buffer.concat([length, jointType]));
        })
        client.connect(7777, "127.0.0.1");
    }
}*/
//# sourceMappingURL=Client.js.map