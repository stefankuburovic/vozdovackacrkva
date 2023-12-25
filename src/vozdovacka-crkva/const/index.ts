import ReactDOM from "react-dom/client";
import L from 'leaflet';
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


export const CYR_PATTERN = /^[абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ ()]*$/
// const footer = ReactDOM.createRoot(
//     document.getElementById('instagram-feed') as HTMLElement
// );

export const roots: ReactDOM.Root[] = [parohije, galerija, bogosluzenja, kalendar /*footer*/];
