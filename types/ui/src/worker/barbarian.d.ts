import { PacketFrame } from "./packet_frame";
export declare function initBarbarianWasm(wasmModule: any, barbarianRes: BarbarianResponse, isSecureIndexSupported: boolean): number;
export declare function request(url: string, opts?: {
    method?: 'get' | 'post';
    headers?: any;
    body?: Parameters<XMLHttpRequest['send']>[0];
}): string;
export declare class BarbarianResponse {
    wasmUrl: string;
    index?: number;
    clientPacket?: PacketFrame;
    serverPacket?: PacketFrame;
    constructor(wasmUrl: string, index?: number, serverPacket?: PacketFrame, clientPacket?: PacketFrame);
}
export declare class BarbarianRequest {
    license: string;
    apiVersion: number;
    versionPath: string;
    clientPackage?: PacketFrame;
    constructor(license: string, apiVersion: number, versionPath: string, clientPackage?: PacketFrame);
    toJson(): {
        license: string;
        apiVersion: number;
        versionPath: string;
        clientPackage: string;
    };
    toString(): string;
}
export declare function postBarbarianRequest(url: string, license: string, isIndexSecureSupported: boolean): BarbarianResponse;
