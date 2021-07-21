///<reference types="node"/>
class int16 {
	read(buffer: Buffer, offset: number): number {
		return buffer.readInt16LE(offset);
    }
    write(value: number): Buffer{
        let buf = Buffer.alloc(2);
        buf.writeInt16LE(value, 0);
        return buf;
    }
}
let Int16 = new int16();
export default Int16;