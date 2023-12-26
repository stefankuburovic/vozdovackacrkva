import {GeoSearchControl, MapBoxProvider} from "leaflet-geosearch";
import {useMap} from "react-leaflet";
import {useEffect} from "react";
import './SearchField.scss';

const SearchField = () => {
    const provider = new MapBoxProvider({
        params: {
            access_token: "pk.eyJ1Ijoic3RlZmFua3VidXJvdmljIiwiYSI6ImNpenI0ZzlhNjAwMHYzM3BnOTR6bjNsdzMifQ.6XfTAtdlL6FPue8L5yP9Nw",
        },
    });

    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: provider,
        showMarker: true,
        showPopup: false,

        countries: 'srb',
        bbox: [44.907608, 20.634493, 44.70843, 20.234832],
        marker: {
            draggable: false,
        },
        maxMarkers: 1,
        searchLabel: 'Унесите адресу за претрагу',
        keepResult: false,
        updateMap: true,
    });

    const map = useMap();
    map.addControl(searchControl);
    // @ts-ignore
    useEffect(() => {
        return () => map.removeControl(searchControl);
    });

    return null;
};

export default SearchField;
