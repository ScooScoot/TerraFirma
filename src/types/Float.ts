///<reference types="node"/>
class float {
	read(buffer: Buffer, offset: number): number {
		return buffer.readFloatLE(offset);
	}
}
let Float = new float();
export default Float;
