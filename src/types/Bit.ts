///<reference types="node"/>
class bit {
	read(buffer: Buffer, byte: number, bit: number) {
		return (buffer[byte] >> bit) % 2;
	}

	write(buffer: Buffer, byte: number, bit: number, value: number) {
		if (value == 0) {
			buffer[byte] &= ~(1 << bit);
		} else {
			buffer[byte] |= 1 << bit;
		}
	}

	all(buffer: Buffer, byte: number): number[] {
		let res = [];
		while (res.length < 8) {
			res.push(this.read(buffer, byte, res.length));
		}
		return res;
	}
}
let Bit = new bit();
export default Bit;
