import { GlobalState } from './global-state';
declare const rootReducer: (state: GlobalState, action: {
    type: string;
    payload?: any;
}) => GlobalState;
export default rootReducer;
