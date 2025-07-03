import React from 'react';
import { ViewConfig } from "./modules/workerConnector/types";
interface AppProps {
    parentEl: HTMLElement;
    mediaConstraints?: MediaStreamConstraints;
    loadingScreen?: string;
    coverVideo?: boolean;
    feedbackAnimationStyle?: string;
    uiFeedback?: ViewConfig['uiFeedback'];
}
declare const App: React.FC<AppProps>;
export default App;
