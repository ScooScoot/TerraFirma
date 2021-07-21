import { Socket } from "net";

export default class TerrariumClient extends Socket {
	writeQueue: Buffer[] = [];
	start(port: number, address: string): Promise<void> {
		return new Promise((resolve, reject) =>
			this.connect(port, address, () => {
				this.writeQueue.forEach((data: Buffer) => this.write(data));
				resolve(undefined);
			})
		);
	}
}
