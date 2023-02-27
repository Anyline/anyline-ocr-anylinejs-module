export namespace canvasMock {
    const width: number;
    const height: number;
    function getContext(dim: any): {
        fillStyle: string;
        fillRect: () => void;
        clearRect: () => void;
        fill: () => void;
        beginPath: () => void;
        moveTo: () => void;
        arcTo: () => void;
        closePath: () => void;
    };
}
