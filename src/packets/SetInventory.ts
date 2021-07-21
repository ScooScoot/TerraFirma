import Packet from "./Packet";
import Byte from "../types/Byte";
import Int16 from "../types/Int16"

export default class SetInventoryPacket extends Packet {
    playerId: number;
    slotId: number;
    itemStack: number;
    itemPrefix: number;
    itemId: number;
    
    constructor(raw:Buffer){
        super(raw);
        this.playerId = Byte.read(this.payload, 0);
        this.slotId=Byte.read(this.payload, 1);
        this.itemStack = Int16.read(this.payload, 2);
        this.itemPrefix = Byte.read(this.payload, 4);
        this.itemId = Byte.read(this.payload, 5);
    }
}