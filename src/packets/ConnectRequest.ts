import StringType from "../types/StringType";
import Packet from "./Packet";
//testing adding comments with github.dev
export default class ConnectRequestPacket extends Packet {
	version: string;
	typeKeys = { version: "string" };
	constructor(raw: Buffer) {
		super(raw);
		this.version = StringType.read(this.payload, 0);
	}
}
