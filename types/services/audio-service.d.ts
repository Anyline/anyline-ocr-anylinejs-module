declare type CustomAudioNode = any;
export interface Sound {
    volume: number;
    audioBuffer: AudioBuffer | null;
}
export declare function loadAudioForIOS(filename: string): Sound;
export declare function playAudioForIOS(sound: any): boolean;
export declare function stopSound(sound: CustomAudioNode): void;
export declare function setSoundVolume(sound: CustomAudioNode, volume: number): void;
export {};