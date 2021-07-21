///<reference types="node"/>
class int32 {
	read(buffer: Buffer, offset: number): number {
		return buffer.readInt32LE(offset);
	}
}
let Int32 = new int32();
export default Int32;
