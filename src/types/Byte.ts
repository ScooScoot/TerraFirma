class byte {
    read(buffer: Buffer, offset: number): number {
		return buffer.readUIntLE(offset, 1);
    }
    write(value: number):Buffer {
        let buf = Buffer.alloc(1);
        buf.writeUIntLE(value, 0, 1);
        return buf;
    }
}
let Byte = new byte();
export default Byte;
