export declare function isArrayEqual(a: any, b: any): boolean;
export declare function toByteArray(value: number | Uint8Array | string): Uint8Array;
export declare function toString(arr: Uint8Array): string;
export declare class PacketData {
    private dateTime_;
    private random_;
    private hash_;
    constructor(hashByte: string | Uint8Array, t?: number | Date, random?: number);
    get dateTime(): number;
    get random(): number;
    get hash(): Uint8Array;
    isEqual(rhs: PacketData): boolean;
    isEquivalent(rhs: PacketData, range: number): boolean;
}
export declare function hexStringToPacketFrame(str: string): PacketFrame;
export declare class PacketFrame {
    private data_;
    constructor(data?: Uint8Array);
    get data(): Uint8Array;
    get length(): number;
    toByteArray(start?: number, end?: number): Uint8Array;
    isNull(): boolean;
    isEqual(other: PacketFrame): boolean;
}
export declare function generatePacket(data: PacketData): PacketFrame;
export declare function extractPacket(frame: PacketFrame): PacketData;
export declare function generateKey(frame1: PacketFrame, frame2: PacketFrame): Uint8Array;
export declare function generateIndex(key: Uint8Array, maxNum: number): number;
export declare function md5(inputString: string): string;
