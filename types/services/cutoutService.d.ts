import { StoredCutout, GlobalState, StoredCutouts } from '../store/global-state';
import { ICutout, ViewConfig } from '../Anyline-JS/interface/types';
export declare const setupCutouts: (currCutouts: {
    [key: string]: ICutout;
}, newCutouts: StoredCutout[]) => StoredCutouts;
export declare const setup: (cutouts: StoredCutouts, newConfig: ViewConfig, parentEl: GlobalState["parent"]) => StoredCutouts;
export declare const setMask: (newConfig: ViewConfig) => {
    outerColor: string;
    outerAlpha: number;
};
export declare const resetDelay: (cutouts: any, cutoutIds: any) => void;
export declare const removeCutouts: (cutouts: StoredCutouts, idsToRemove: string[]) => {
    [key: string]: StoredCutout;
};
