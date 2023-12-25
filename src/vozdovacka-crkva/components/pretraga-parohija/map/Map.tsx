import React from 'react'
import {MapContainer, Polygon, TileLayer} from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import {hram_bounds, IGeoJSON, mapObject} from "../../../const/pretragaparohija/map/const";
import GeoJSONField from "./GeoJSONField/GeoJSONField";
import SearchField from "./SearchField/Search";
import {Box} from "@mui/material";
import {LatLngExpression} from "leaflet";


function Map() {

    return (
        <div style={{width: "100%", overflow: "hidden", marginTop: "100px"}}>
            <Box style={{marginBottom: "2rem"}}>
                <h4>Мапа парохије</h4>
                <p>Претражите адресу или кликните на зграду да пронађете свештеника који је задужен за вашу адресу</p>
            </Box>
            <MapContainer center={[44.7778196, 20.4749862]} zoom={23} style={{height: "500px", width: "100%"}} >
                <SearchField  />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    mapObject.map(
                        (map: IGeoJSON, index: number) =>
                            <GeoJSONField
                                key={index}
                                svestenik={map.svestenik}
                                ime={map.ime}
                                style={map.style}
                            />
                    )
                }

                <Polygon pathOptions={{
                    fillColor: "#fff",
                    color: "#fff",
                    opacity: 1
                }} positions={hram_bounds as unknown as LatLngExpression[][]} />

            </MapContainer>
        </div>
    );
}
export default Map;
