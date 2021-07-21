import Byte from "../types/Byte";
import Packet from "./Packet";

export default class ConnectionApprovedPacket extends Packet {
    playerId: number;
    constructor(raw: Buffer) {
        super(raw);
        this.playerId = Byte.read(this.payload, 0);
    }
}
