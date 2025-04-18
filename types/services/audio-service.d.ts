declare global {
    interface Window {
        AudioContext: typeof AudioContext;
        webkitAudioContext: typeof AudioContext;
    }
}
type CustomAudioNode = Sound & {
    gainNode: GainNode;
};
export interface Sound {
    volume: number;
    audioBuffer: AudioBuffer | null;
}
export declare function loadAudioForIOS(filename: string): Sound;
export declare function playAudioForIOS(sound: Sound | CustomAudioNode | undefined): boolean;
export declare function stopSound(sound: CustomAudioNode): void;
export declare function setSoundVolume(sound: CustomAudioNode, volume: number): void;
export {};
