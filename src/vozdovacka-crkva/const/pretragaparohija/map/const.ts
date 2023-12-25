import oDjordje from "../../../const/pretragaparohija/map/o_djordje.json";
import oJovo from "../../../const/pretragaparohija/map/o_jovo.json";
import oAleksandar from "../../../const/pretragaparohija/map/o_aleksandar.json";
import oGligorije from "../../../const/pretragaparohija/map/o_gligorije.json";
import {GeoJsonObject} from "geojson";

export interface IGeoJSON {
    svestenik: GeoJsonObject;
    ime: string;
    style: {
        fillColor: string;
        color: string;
        opacity: number;
    }
}
export const mapObject: IGeoJSON[] = [
    {
        ime: 'otacAleksandar',
        svestenik: oAleksandar as GeoJsonObject,
        style: {
            fillColor: "#7835cc",
            color: "#7835cc",
            opacity: 1
        }
    },
    {
        ime: 'otacJovo',
        svestenik: oJovo as GeoJsonObject,
        style: {
            fillColor: "#81002b",
            color: "#81002b",
            opacity: 1
        }
    },
    {
        ime: 'otacDjordje',
        svestenik: oDjordje as GeoJsonObject,
        style: {
            fillColor: "#968e0f",
            color: "#968e0f",
            opacity: 1

        }
    },
    {
        ime: 'otacGligorije',
        svestenik: oGligorije as GeoJsonObject,
        style: {
            fillColor: "#00b8c9",
            color: "#00b8c9",
            opacity: 1

        },
    }
]

export const hram_bounds = [
    [
        44.7770072,
        20.4735594
    ],
    [
        44.7771123,
        20.473946
    ],
    [
        44.7771405,
        20.4739283
    ],
    [
        44.7772424,
        20.4744054
    ],
    [44.7775141,
        20.4742892
    ],
    [44.7774829,
        20.4741093
    ],
    [44.7775008,
        20.474092
    ],
    [44.777518,
        20.4740712
    ],
    [44.777426,
        20.4737602
    ],
    [44.7772816,
        20.4733296
    ],
    [44.7770072,
        20.4735594
    ]
];
