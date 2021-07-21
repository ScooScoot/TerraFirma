import Byte from "./Byte"
class color {
    read(buffer: Buffer, offset: number): number[] {
        let result = []
        while (result.length < 3) {
            result.push(Byte.read(buffer, offset + result.length));
        }
        return result;
    }
}
let Color = new color();
export default Color;