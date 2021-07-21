"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
class TerrariumClient extends net_1.Socket {
    constructor() {
        super(...arguments);
        this.writeQueue = [];
    }
    start(port, address) {
        return new Promise((resolve, reject) => this.connect(port, address, () => {
            this.writeQueue.forEach((data) => this.write(data));
            resolve(undefined);
        }));
    }
}
exports.default = TerrariumClient;
