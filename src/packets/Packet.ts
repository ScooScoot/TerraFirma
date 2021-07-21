import Bit from "../types/Bit";
import Byte from "../types/Byte";
import Int16 from "../types/Int16";
import Int32 from "../types/Int32";
import Color from "../types/Color";
import StringType from "../types/StringType";

export default class Packet {
	length: number;
	id: number;
	hexid: string;
	payload: Buffer;
	typeKeys: { [key: string]: string } = {};

	constructor(raw: Buffer) {
		this.length = Int16.read(raw, 0) - 1;
		this.id = Byte.read(raw, 2);
		this.hexid = this.id.toString(16);
		this.payload = raw.slice(3);
	}

	get serialized(): Buffer {
		let keys = Object.keys(this.typeKeys);
		let res: Buffer[] = [];
		for (let i = 0; i < keys.length; i++) {
			let type = this.typeKeys[keys[i]];
			let name = keys[i];
			let value = this[name];
			switch (type) {
				case "string": {
					res.push(StringType.write(value, i !== keys.length - 1));

					break;
				}
				default: {
					throw "Type not found";
					process.exit();
				}
			}
		}
		let payload = Buffer.concat(res);
		let id = Byte.write(this.id);
		return Buffer.concat([
            Int16.write(payload.byteLength+3),//add lenght of id and length vlaue
            id,
            payload
		]);
	}
}
