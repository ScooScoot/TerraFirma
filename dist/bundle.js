(() => {
    const defines = {};
    const entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies, factory };
        entry[0] = name;
    }
    define("require", ["exports"], (exports) => {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: (name) => resolve(name) });
    });
    #!/usr/bin/env
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    define("types/Bit", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        ///<reference types="node"/>
        class bit {
            read(buffer, byte, bit) {
                return (buffer[byte] >> bit) % 2;
            }
            write(buffer, byte, bit, value) {
                if (value == 0) {
                    buffer[byte] &= ~(1 << bit);
                }
                else {
                    buffer[byte] |= 1 << bit;
                }
            }
            all(buffer, byte) {
                let res = [];
                while (res.length < 8) {
                    res.push(this.read(buffer, byte, res.length));
                }
                return res;
            }
        }
        let Bit = new bit();
        exports.default = Bit;
    });
    define("types/Byte", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class byte {
            read(buffer, offset) {
                return buffer.readUIntLE(offset, 1);
            }
            write(value) {
                let buf = Buffer.alloc(1);
                buf.writeUIntLE(value, 0, 1);
                return buf;
            }
        }
        let Byte = new byte();
        exports.default = Byte;
    });
    define("types/Int16", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        ///<reference types="node"/>
        class int16 {
            read(buffer, offset) {
                return buffer.readInt16LE(offset);
            }
            write(value) {
                let buf = Buffer.alloc(2);
                buf.writeInt16LE(value, 0);
                return buf;
            }
        }
        let Int16 = new int16();
        exports.default = Int16;
    });
    define("types/Int32", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        ///<reference types="node"/>
        class int32 {
            read(buffer, offset) {
                return buffer.readInt32LE(offset);
            }
        }
        let Int32 = new int32();
        exports.default = Int32;
    });
    define("types/Color", ["require", "exports", "types/Byte"], function (require, exports, Byte_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Byte_1 = __importDefault(Byte_1);
        class color {
            read(buffer, offset) {
                let result = [];
                while (result.length < 3) {
                    result.push(Byte_1.default.read(buffer, offset + result.length));
                }
                return result;
            }
        }
        let Color = new color();
        exports.default = Color;
    });
    define("types/StringType", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class stringType {
            read(buffer, offset) {
                return buffer
                    .slice(offset, buffer.length)
                    .toString("ascii")
                    .split("\\x00\\x00")[0];
            }
            write(data, needsTerminator = true) {
                return Buffer.from(`${data}${needsTerminator ? "\\x00\\x00" : ""}`, "ascii");
            }
        }
        let StringType = new stringType();
        exports.default = StringType;
    });
    define("packets/Packet", ["require", "exports", "types/Byte", "types/Int16", "types/StringType"], function (require, exports, Byte_2, Int16_1, StringType_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Byte_2 = __importDefault(Byte_2);
        Int16_1 = __importDefault(Int16_1);
        StringType_1 = __importDefault(StringType_1);
        class Packet {
            constructor(raw) {
                this.typeKeys = {};
                this.length = Int16_1.default.read(raw, 0) - 1;
                this.id = Byte_2.default.read(raw, 2);
                this.hexid = this.id.toString(16);
                this.payload = raw.slice(3);
            }
            get serialized() {
                let keys = Object.keys(this.typeKeys);
                let res = [];
                for (let i = 0; i < keys.length; i++) {
                    let type = this.typeKeys[keys[i]];
                    let name = keys[i];
                    let value = this[name];
                    switch (type) {
                        case "string": {
                            res.push(StringType_1.default.write(value, i !== keys.length - 1));
                            break;
                        }
                        default: {
                            throw "Type not found";
                            process.exit();
                        }
                    }
                }
                let payload = Buffer.concat(res);
                let id = Byte_2.default.write(this.id);
                return Buffer.concat([
                    Int16_1.default.write(payload.byteLength + 3),
                    id,
                    payload
                ]);
            }
        }
        exports.default = Packet;
    });
    define("packets/ConnectRequest", ["require", "exports", "types/StringType", "packets/Packet"], function (require, exports, StringType_2, Packet_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        StringType_2 = __importDefault(StringType_2);
        Packet_1 = __importDefault(Packet_1);
        class ConnectRequestPacket extends Packet_1.default {
            constructor(raw) {
                super(raw);
                this.typeKeys = { version: "string" };
                this.version = StringType_2.default.read(this.payload, 0);
            }
        }
        exports.default = ConnectRequestPacket;
    });
    define("lib/Client", ["require", "exports", "net"], function (require, exports, net_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
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
    });
    define("lib/Server", ["require", "exports", "net", "packets/Packet", "packets/ConnectRequest", "lib/Client"], function (require, exports, net_2, Packet_2, ConnectRequest_1, Client_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Packet_2 = __importDefault(Packet_2);
        ConnectRequest_1 = __importDefault(ConnectRequest_1);
        Client_1 = __importDefault(Client_1);
        class TerrariumServer extends net_2.Server {
            constructor() {
                super();
                this.on("connection", (client) => __awaiter(this, void 0, void 0, function* () {
                    client.on("data", (data) => {
                        let packet = new Packet_2.default(data);
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
    });
    define("main", ["require", "exports", "lib/Server", "lib/Client"], function (require, exports, Server_1, Client_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.TerrariumClient = exports.TerrariumServer = void 0;
        Server_1 = __importDefault(Server_1);
        Client_2 = __importDefault(Client_2);
        exports.TerrariumServer = Server_1.default;
        exports.TerrariumClient = Client_2.default;
        if (require.main === module)
            (function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let args = process.argv;
                    args.shift();
                    args.shift();
                    let [destinationAddress, destinationPort] = args[0].split(":");
                    let [listenPort, listenAddress] = args[1]
                        ? args[1].split(":")
                        : ["7778", "0.0.0.0"];
                    let server = new Server_1.default();
                    console.log("Starting Terrarium.");
                    yield server.start(parseInt(destinationPort), destinationAddress, parseInt(listenPort), listenAddress);
                    console.log("Terrarium ready");
                    server.on("connection", (client) => {
                        console.log(`${client.remoteAddress}:${client.remotePort} connected.`);
                        client.on("close", () => {
                            console.log(`${client.remoteAddress}${client.remotePort} disconnected.`);
                        });
                    });
                });
            })();
    });
    define("packets/ConnectionApproved", ["require", "exports", "types/Byte", "packets/Packet"], function (require, exports, Byte_3, Packet_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Byte_3 = __importDefault(Byte_3);
        Packet_3 = __importDefault(Packet_3);
        class ConnectionApprovedPacket extends Packet_3.default {
            constructor(raw) {
                super(raw);
                this.playerId = Byte_3.default.read(this.payload, 0);
            }
        }
        exports.default = ConnectionApprovedPacket;
    });
    define("packets/PlayerAppearance", ["require", "exports", "packets/Packet", "types/Color", "types/Byte", "types/Bit", "types/StringType"], function (require, exports, Packet_4, Color_1, Byte_4, Bit_1, StringType_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Packet_4 = __importDefault(Packet_4);
        Color_1 = __importDefault(Color_1);
        Byte_4 = __importDefault(Byte_4);
        Bit_1 = __importDefault(Bit_1);
        StringType_3 = __importDefault(StringType_3);
        class PlayerAppearancePacket extends Packet_4.default {
            constructor(raw) {
                super(raw);
                this.playerId = Byte_4.default.read(this.payload, 0);
                this.variant = Byte_4.default.read(this.payload, 1);
                this.hairStyle = Byte_4.default.read(this.payload, 2);
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
                this.hideMisc = Byte_4.default.read(this.payload, this.length - 23);
                this.hideAccessory2 = Bit_1.default.all(this.payload, this.length - 24);
                this.hideAccessory1 = Bit_1.default.all(this.payload, this.length - 25);
                this.hairDye = Byte_4.default.read(this.payload, this.length - 26);
                let stringLength = this.length - 27;
                this.name = StringType_3.default.read(this.payload, 3);
            }
        }
        exports.default = PlayerAppearancePacket;
    });
    define("packets/SetInventory", ["require", "exports", "packets/Packet", "types/Byte", "types/Int16"], function (require, exports, Packet_5, Byte_5, Int16_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Packet_5 = __importDefault(Packet_5);
        Byte_5 = __importDefault(Byte_5);
        Int16_2 = __importDefault(Int16_2);
        class SetInventoryPacket extends Packet_5.default {
            constructor(raw) {
                super(raw);
                this.playerId = Byte_5.default.read(this.payload, 0);
                this.slotId = Byte_5.default.read(this.payload, 1);
                this.itemStack = Int16_2.default.read(this.payload, 2);
                this.itemPrefix = Byte_5.default.read(this.payload, 4);
                this.itemId = Byte_5.default.read(this.payload, 5);
            }
        }
        exports.default = SetInventoryPacket;
    });
    define("packets/PacketsMappedToId", ["require", "exports", "packets/ConnectionApproved", "packets/ConnectRequest", "packets/PlayerAppearance", "packets/SetInventory"], function (require, exports, ConnectionApproved_1, ConnectRequest_2, PlayerAppearance_1, SetInventory_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        ConnectionApproved_1 = __importDefault(ConnectionApproved_1);
        ConnectRequest_2 = __importDefault(ConnectRequest_2);
        PlayerAppearance_1 = __importDefault(PlayerAppearance_1);
        SetInventory_1 = __importDefault(SetInventory_1);
        const Packets = {
            1: ConnectRequest_2.default,
            3: ConnectionApproved_1.default,
            4: PlayerAppearance_1.default,
            5: SetInventory_1.default,
        };
        exports.default = Packets;
    });
    define("types/Float", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        ///<reference types="node"/>
        class float {
            read(buffer, offset) {
                return buffer.readFloatLE(offset);
            }
        }
        let Float = new float();
        exports.default = Float;
    });
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            const dependencies = ['exports'];
            const factory = (exports) => {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies, factory };
        }
    }
    const instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        const define = get_define(name);
        instances[name] = {};
        const dependencies = define.dependencies.map(name => resolve(name));
        define.factory(...dependencies);
        const exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();