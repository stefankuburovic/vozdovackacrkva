import ReactDOM from "react-dom/client";

const parohije = ReactDOM.createRoot(
    document.getElementById('pretraga-parohija') as HTMLElement
);

const galerija = ReactDOM.createRoot(
    document.getElementById('galerija') as HTMLElement
);

const bogosluzenja = ReactDOM.createRoot(
    document.getElementById('bogosluzenja') as HTMLElement
);

export const roots: ReactDOM.Root[] = [parohije, galerija, bogosluzenja];