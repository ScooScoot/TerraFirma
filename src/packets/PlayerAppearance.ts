import Packet from "./Packet";
import Color from "../types/Color";
import Byte from "../types/Byte";
import Bit from "../types/Bit";
import StringType from "../types/StringType";

export default class PlayerAppearancePacket extends Packet {
	playerId: number;
	variant: number;
	hairStyle: number;
	name: string;
	hairDye: number;
	hideAccessory1: number[];
	hideAccessory2: number[];
	hideMisc: number;
	hairColor: number[];
	skinColor: number[];
	eyeColor: number[];
	shirtColor: number[];
	undershirtColor: number[];
	pantsColor: number[];
	shoeColor: number[];
	difficulty: number[];
	torchFlags: number[];
	constructor(raw: Buffer) {
		super(raw);
		this.playerId = Byte.read(this.payload, 0);
		this.variant = Byte.read(this.payload, 1);
		this.hairStyle = Byte.read(this.payload, 2);
		//read from end of buffer now to determine length of name string
        this.torchFlags = Bit.all(this.payload, this.length);
        this.difficulty = Bit.all(this.payload, this.length - 1);
        this.shoeColor = Color.read(this.payload, this.length - 2);
        this.pantsColor = Color.read(this.payload, this.length - 5);
        this.undershirtColor = Color.read(this.payload, this.length - 8);
        this.shirtColor = Color.read(this.payload, this.length - 11);
        this.eyeColor = Color.read(this.payload, this.length - 14);
        this.skinColor = Color.read(this.payload, this.length - 17);
        this.hairColor = Color.read(this.payload, this.length - 20);
        this.hideMisc = Byte.read(this.payload, this.length - 23);
        this.hideAccessory2 = Bit.all(this.payload, this.length - 24);
        this.hideAccessory1 = Bit.all(this.payload, this.length - 25);
        this.hairDye = Byte.read(this.payload, this.length - 26);

        let stringLength = this.length - 27;
        this.name = StringType.read(this.payload, 3);
    }
}
