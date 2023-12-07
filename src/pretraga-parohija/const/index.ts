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

const kalendar = ReactDOM.createRoot(
    document.getElementById('kalendar-praznika') as HTMLElement
);


// const footer = ReactDOM.createRoot(
//     document.getElementById('instagram-feed') as HTMLElement
// );

export const roots: ReactDOM.Root[] = [parohije, galerija, bogosluzenja, kalendar /*footer*/];