import { Server, Socket } from "net";
import Packet from "../packets/Packet";
import ConnectRequestPacket from "../packets/ConnectRequest";
import TerrariumClient from "./Client";

export default class TerrariumServer extends Server {
	destinationPort: number;
	destinationAddress: string;
	constructor() {
		super();

		this.on("connection", async (client: Socket) => {
			client.on("data", (data: Buffer) => {
				let packet = new Packet(data);
				if (packet.id === 1) {
					let temp = new ConnectRequestPacket(data);
					temp.version = "\x0BTerraria230";
					data = temp.serialized;
				}
				if (proxyClient.writable) {
					proxyClient.write(data);
				} else {
					proxyClient.writeQueue.push(data);
				}
			});
			client.on("close", () => {
				proxyClient.end();
			});

			let proxyClient = new TerrariumClient();
			proxyClient.on("data", (data: Buffer) => {
				if (client.writable) client.write(data);
			});
			proxyClient.on("close", () => {
				proxyClient.end();
				client.end();
			});

			await proxyClient.start(this.destinationPort, this.destinationAddress);
		});
	}
	start(
		destinationPort: number,
		destinationAddress: string,
		listenerPort: number,
		listenerAddress: string
	): Promise<void> {
		this.destinationPort = destinationPort;
		this.destinationAddress = destinationAddress;
		return new Promise((resolve, reject) => {
			this.listen(listenerPort, listenerAddress, () => resolve(undefined));
		});
	}
}
