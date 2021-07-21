class stringType {
	read(buffer: Buffer, offset: number): string {
		return buffer
			.slice(offset, buffer.length)
			.toString("ascii")
			.split("\\x00\\x00")[0];
	}
	write(data: string, needsTerminator: boolean = true): Buffer {
		return Buffer.from(
			`${data}${needsTerminator ? "\\x00\\x00" : ""}`,
			"ascii"
		);
	}
}
let StringType = new stringType();
export default StringType;
