import {IGeoJSON} from "../../../../../const/pretragaparohija/map/const";
import React, {useState} from "react";
import L, {LatLng, Point} from "leaflet";
import {Paroh} from "../../../../../const/pretragaparohija/const";
import {GeoJSON, Popup} from "react-leaflet";

import './GeoJSONField.scss';
interface IOpenMapObject {
    containerPoint: Point;
    latlng: LatLng;
    layetPoint: Point;
    originalEvent: PointerEvent;
    sourceTarget: any;
    target: any;
}


function GeoJSONField(geoJSON: IGeoJSON) {
    const [mapObject, setMapObject] = useState<IOpenMapObject | undefined>(undefined);
    function whenClicked(e: any) {
        setMapObject(e);
    }
    function onEachFeature(feature: any, layer: any) {
        layer.on({
            click: whenClicked
        });
    }
    const creatCircle = (_: any, latlng: L.LatLng) => {
        return L.circleMarker(latlng, {
            radius: 5
        });
    }
    const detaljiSvestenika = () => {
        switch (geoJSON.ime) {
            case "otacAleksandar":
                return {
                    ime: Paroh.otacAleksandar.ime,
                    telefon: Paroh.otacAleksandar.telefon
                }

            case "otacJovo":
                return {
                    ime: Paroh.otacJovo.ime,
                    telefon: Paroh.otacJovo.telefon
                }

            case "otacDjordje":
                return {
                    ime: Paroh.otacDjordje.ime,
                    telefon: Paroh.otacDjordje.telefon
                }

            case "otacGligorije":
                return {
                    ime: Paroh.otacGligorije.ime,
                    telefon: Paroh.otacGligorije.telefon
                }
            default:
                break;
        }
    }
    return <GeoJSON
        data={geoJSON.svestenik}
        onEachFeature={onEachFeature}
        interactive
        style={geoJSON.style}
        pointToLayer={creatCircle}>
        <Popup className="geojson-popup">
            <div className="geojson-popup-content">
                <div className="top">
                    <p>
                        <span>Улица: {mapObject?.target.feature.properties['addr:street']}</span>
                        <span>Број: {mapObject?.target.feature.properties['addr:housenumber']}</span>
                    </p>
                </div>
                <div>
                    <h5>{detaljiSvestenika()?.ime}</h5>
                    <a href={`tel:${detaljiSvestenika()?.telefon}`}>{detaljiSvestenika()?.telefon}</a>
                </div>
            </div>
        </Popup>
    </GeoJSON>;
}

export default GeoJSONField
