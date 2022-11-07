export declare class Wasm {
    private isLoaded_;
    private wasmLocation_;
    private webAssembly_;
    constructor();
    fetchBinary(info: any, callback: any): Promise<void>;
    instantiate(binary: Uint8Array, info: any): any;
    anyXorEncodeBuffer(data_buffer: any): Uint8Array;
    load(wasmLocation: string, anylineWorker: any, callbackFunc: any): void;
}
