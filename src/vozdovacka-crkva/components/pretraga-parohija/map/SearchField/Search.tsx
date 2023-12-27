import {GeoSearchControl, MapBoxProvider} from "leaflet-geosearch";
import {useMap} from "react-leaflet";
import {EffectCallback, useEffect} from "react";
import L from "leaflet";
import './SearchField.scss';
import {SearchControlProps} from "../../../../const/pretragaparohija/map/const";

const SearchField = () => {
    const provider = new MapBoxProvider({
        params: {
            access_token: "pk.eyJ1Ijoic3RlZmFua3VidXJvdmljIiwiYSI6ImNpenI0ZzlhNjAwMHYzM3BnOTR6bjNsdzMifQ.6XfTAtdlL6FPue8L5yP9Nw",
        },
    });

    // @ts-ignore
    const searchControl: SearchControlProps = new GeoSearchControl({
        provider: provider,
        showMarker: true,
        showPopup: false,
        marker: {
            draggable: false,
        },
        maxMarkers: 1,
        searchLabel: 'Унесите адресу за претрагу',
        keepResult: false,
        updateMap: true,
    });

    const map: L.Map = useMap();

    const addControlToMap: any = () => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    };

    useEffect(addControlToMap, [map, searchControl]);

    return null;
};

export default SearchField;
