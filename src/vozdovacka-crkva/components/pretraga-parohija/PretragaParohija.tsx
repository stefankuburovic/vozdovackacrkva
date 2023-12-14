import React, {useState} from 'react';
import {
    Autocomplete, Box,
    Button,
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
    Tooltip
} from "@mui/material";
import {GeoJsonObject} from "geojson";
import L from 'leaflet';
import {extractNumericPart, latToCyr} from "../../../util/functions";
import {GeoJSON, MapContainer, Polygon, Popup, TileLayer} from "react-leaflet";
import {uliceRSCyr} from "../../const/pretragaparohija/ulice";
import oJovo from "../../const/pretragaparohija/map/o_jovo.min.json";
import oGligorije from "../../const/pretragaparohija/map/o_gligorije.min.json";
import oDjordje from "../../const/pretragaparohija/map/o_djordje.json";
import oAleksandar from "../../const/pretragaparohija/map/o_aleksandar.min.json";
// import JSON from "../../const/pretragaparohija/map/map.json";
import {NEPARNI, PARNI, Paroh, Parohija, parohije} from "../../const/pretragaparohija/const";
import 'leaflet/dist/leaflet.css';

// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const CYR_PATTERN = /^[абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ ()]*$/

function PretragaParohija() {
    const sortUliceRSCyr = uliceRSCyr.sort((a, b) => a.value > b.value ? 1 : -1);

    const [error, setError] = useState<{ error: boolean; errorText: string }>({error: false, errorText: ''});
    const [cyrillicValue, setCyrillicValue] = useState<string>('');
    const [izabraneParohije, postaviIzabraneParohije] = useState<Array<Parohija> | null>(null);
    const [ostaleParohije, postaviOstaleParohije] = useState<Array<Parohija> | null>(null);
    const [parohijeAutoKomplit, postaviParohijeAutokomplit] = useState<Array<Parohija> | null>(null);
    const [broj, upisiBroj] = useState<number | null>(null);

    const handleTextInputChange = (event: any) => {
        setCyrillicValue(latToCyr(event.target.value));
    };
    const handleNumberInputChange = (event: any) => {
        upisiBroj(event.target.value);
    };

    const pronadjiParohaPoBrojuUlice = () => {
        let strana: string;
        if (broj !== null) {
            strana = broj % 2 ? PARNI : NEPARNI;
            const parohija = parohijeAutoKomplit?.filter(parohije => parohije.odredjeniBrojevi ? parohije.odredjeniBrojevi.some(brojevi => brojevi.prviBroj % 2 === broj % 2 && brojevi.prviBroj <= broj && broj <= brojevi.zadnjiBroj) : parohije.parniIliNeparni === strana);

            if (parohija && parohija.length === 1) {
                postaviIzabraneParohije(parohija);
                setError({
                    error: false,
                    errorText: ''
                })
            }
            if (parohija && parohija.length === 0 && broj) {
                postaviIzabraneParohije(parohija);
                setError({
                    error: true,
                    errorText: 'Број који сте уписали не припада ни једној од парохија'
                });
            }
        }
    }


    function generate(mappingArray: Parohija[] | null, element: React.ReactElement) {
        return mappingArray?.map((value) => {
                const specificNumbers = value.odredjeniBrojevi && setSpecificNumbers(
                    value.odredjeniBrojevi,
                    value.parniIliNeparni && value.parniIliNeparni
                );
                return React.cloneElement(element, {
                    key: value.paroh.ime + value.ime.lat,
                    primary: value.ime.cyr,
                    children:
                        <Tooltip title={specificNumbers} arrow className="ostali-brojevi-tooltip" enterTouchDelay={0}>
                            <ListItemText
                                primary={value.ime.cyr}
                                secondary={specificNumbers}
                                secondaryTypographyProps={{className: "ostali-brojevi"}}
                            />
                        </Tooltip>
                })
            }
        );
    }

    function setSpecificNumbers(odredjeniBrojevi: Array<{
        prviBroj: number;
        zadnjiBroj: number;
    }>, strane?: string | Array<string>): string {
        if (odredjeniBrojevi.length > 1) {
            return `Парна страна од броја ${odredjeniBrojevi[0].prviBroj} до броја ${odredjeniBrojevi[0].zadnjiBroj},` +
                ` и непарна страна од броја ${odredjeniBrojevi[1].prviBroj} до броја ${odredjeniBrojevi[1].zadnjiBroj}`
        } else {
            const parnaIliNeparna = strane && typeof strane === "string" ? strane === PARNI ? "Парна страна" : "Непарна страна" : "";
            return odredjeniBrojevi[0].prviBroj === odredjeniBrojevi[0].zadnjiBroj ? `Број ${odredjeniBrojevi[0].prviBroj}` : `${parnaIliNeparna} од броја ${odredjeniBrojevi[0].prviBroj} до броја ${odredjeniBrojevi[0].zadnjiBroj}`;
        }
    }

    const handleAutocompleteChange = (autocompleteValue: { value: string; label: string; } | null) => {
        const selectedValue = autocompleteValue?.value;
        let izabranaParohija: Parohija[];
        let ostaleParohije: Parohija[];
        if (selectedValue) {
            setCyrillicValue(latToCyr(selectedValue));
        }
        postaviIzabraneParohije(null);
        if (selectedValue !== undefined) {
            if (CYR_PATTERN.test(selectedValue)) {
                izabranaParohija = parohije.filter((parohija: Parohija) => parohija.ime.cyr === selectedValue);
                ostaleParohije = parohije.filter((parohija: Parohija) => parohija.ime.cyr !== selectedValue && parohija.paroh.ime === izabranaParohija[0].paroh.ime);
            } else {
                izabranaParohija = parohije.filter(
                    (parohija: Parohija) =>
                        (
                            Array.isArray(parohija.ime.lat) && parohija.ime.lat.includes(selectedValue)
                        )
                        || (typeof parohija.ime.lat === "string" && parohija.ime.lat === selectedValue)
                );
                ostaleParohije = parohije.filter(
                    (parohija: Parohija) => {
                        return parohija.ime.lat !== selectedValue && parohija.paroh.ime === izabranaParohija[0].paroh.ime
                    }
                );
            }
            upisiBroj(null);
            postaviIzabraneParohije(izabranaParohija);
            postaviOstaleParohije(ostaleParohije)
            postaviParohijeAutokomplit(izabranaParohija);
        }
    }

//
// const arrayOfNames: string[] = [];
// ostaleParohije !== null && ostaleParohije.map(parohije => {
//     arrayOfNames.push(parohije.ime.cyr);
// });
// izabraneParohije !== null && arrayOfNames.push(izabraneParohije[0].ime.cyr);
//
//
// // @ts-ignore
// let vita = JSON["features"].filter(
//     (d: any) => (
//             d["properties"]
//             && d["properties"]["building"]
//             && d["properties"]["addr:street"]
//             && arrayOfNames.includes(d["properties"]["addr:street"])
//         )
//         || (
//             d["properties"]["addr:housenumber"]
//             && arrayOfNames.includes(d["properties"]["addr:street"]
//             )
//         )
// );
//
// // @ts-ignore
// let vitanovacka = JSON["features"].filter(
//     (d: any) => (
//             d["properties"]
//             && d["properties"]["building"]
//             && d["properties"]["addr:street"]
//             && arrayOfNames.includes(d["properties"]["addr:street"])
//             && d["properties"]["addr:street"] !== "Војводе Степе"
//             && d["properties"]["addr:street"] !== "Булевар Ослобођења"
//         )
//         || (
//             d["properties"]["addr:housenumber"]
//             && arrayOfNames.includes(d["properties"]["addr:street"]
//                 && d["properties"]["addr:street"] !== "Војводе Степе"
//                 && d["properties"]["addr:street"] !== "Булевар Ослобођења"
//             )
//         )
// );
//
// console.log(vitanovacka);
// const a = vita.filter((d: any) => (
//     ( d["properties"]["addr:street"] === "Војводе Степе" &&
//         (
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 8
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 212
//             ) ||
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 !== 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 51
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 219
//             )
//         )
//     )
//     ||
//     (
//         d["properties"]["addr:street"] === "Булевар oслобођења"
//         && extractNumericPart(d["properties"]["addr:housenumber"]) % 2 !== 0
//         && extractNumericPart(d["properties"]["addr:housenumber"]) >= 75
//         && extractNumericPart(d["properties"]["addr:housenumber"]) < 210
//     )
// ));
// console.log(a);
// console.log([...vitanovacka, ...a]);
//
    function whenClicked(e: any) {
        // e = event
        console.log(e);
        // You can make your ajax call declaration here
        //$.ajax(...
    }

    function onEachFeature(feature: any, layer: any) {
        console.log(feature, layer);
        //bind click
        layer.on({
            click: whenClicked
        });
    }

    return (
        <Container sx={{padding: 5, display: "flex", flexDirection: "column"}}>
            <h2>Пронађите своју парохију</h2>
            <Divider/>
            <div className="text-box">
                <p>Како да пронађете свештеника ваше адресе?</p>
                <ul>
                    <li>У поље име улице, упишите или изаберите име улице где живите (можете и ћирилицом и латиницом)
                    </li>
                    <li>Ако је улица подељена на више свештеника, приказаће се поље да унесете број улице</li>
                    <li>Када унесете број улице, притисните дугме "Прикажи"</li>
                    <li>Са десне стране ће се показати ком пароху припада ваша адреса</li>
                    <li>Ако улица припада само једном пароху, са десне стране ће се показати ко је парох за вашу улицу
                    </li>
                </ul>
            </div>
            <Divider variant="inset" sx={{margin: "20px 0"}} className="react-divider"/>
            <Container sx={{display: "flex"}}>
                <Container sx={{display: "flex", alignItems: "flex-start"}}>
                    <Autocomplete
                        value={{value: cyrillicValue, label: cyrillicValue}}
                        disablePortal
                        clearText={"Претражи поново"}
                        id="combo-box-demo"
                        options={sortUliceRSCyr}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        sx={{width: 400}}
                        onInputChange={(e, v, r) => {
                            if (r === 'clear') {
                                setCyrillicValue('');
                            }
                        }}
                        onChange={(_, value) => {
                            handleAutocompleteChange(value)
                        }}
                        renderInput={
                            (params) =>
                                <TextField
                                    {...params}
                                    onChange={handleTextInputChange}
                                    label="Име улице"
                                />
                        }
                    />
                    {
                        (
                            (izabraneParohije && izabraneParohije.length > 1) ||
                            (izabraneParohije && 1 >= izabraneParohije.length && broj)
                        ) && <Container sx={{display: "flex"}}>
                            <Tooltip
                                title={error.error ? error.errorText : "Молимо вас да унесете број улице, слова нису потребна"}
                                arrow>
                                <TextField label="бр." sx={{width: 70}} onChange={handleNumberInputChange}
                                           error={error.errorText.length > 0}/>
                            </Tooltip>
                            <Button type="button" sx={{marginLeft: "20px"}}
                                    onClick={pronadjiParohaPoBrojuUlice}>Прикажи</Button>
                        </Container>
                    }
                </Container>

                <Container sx={{display: "flex"}}>
                    {
                        izabraneParohije?.length === 1 &&
                        <>
                            <Divider orientation="vertical" className="react-divider"/>
                            <Container sx={{display: "flex", flexDirection: "column"}}>
                                <h2>{izabraneParohije[0].paroh.ime}</h2>
                                <a href={`tel:${izabraneParohije[0].paroh.telefon}`}>{izabraneParohije[0].paroh.telefon}</a>
                            </Container>
                        </>
                    }
                </Container>
            </Container>

            {
                izabraneParohije && izabraneParohije.length === 1 &&
                <Box sx={{marginTop: "2rem"}} className="ostale-parohije-wrapper">
                    <Divider className="react-divider"/>
                    <p><strong>Остале адресе на којима је свештеник {izabraneParohije[0].paroh.ime}:</strong></p>
                    <List className="ostale-parohije" dense={true}>
                        {generate(ostaleParohije,
                            <ListItem divider className="ostale-parohije-list-item">
                                <ListItemText/>
                            </ListItem>,
                        )}
                    </List>
                </Box>
            }
            <div style={{width: "100%", overflow: "hidden", marginTop: "100px"}}>
                <p>Мапа (у изради)</p>
                <MapContainer center={[44.7778196, 20.4749862]} zoom={18} style={{height: "500px", width: "100%"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        data={oAleksandar as GeoJsonObject}
                        style={
                            {
                                fillColor: "#7835cc",
                                color: "#7835cc",
                                opacity: 1
                            }
                        }
                        interactive
                        pointToLayer={
                            (_, latlng) => {
                                return L.circleMarker(latlng, {
                                    radius: 5
                                });
                            }
                        }
                    >
                        <Popup>
                            <div>
                                <h5>{Paroh.otacAleksandar.ime}</h5>
                                <a href={`tel:${Paroh.otacAleksandar.telefon}`}>{Paroh.otacAleksandar.telefon}</a>
                            </div>
                        </Popup>
                    </GeoJSON>
                    <GeoJSON
                        data={oDjordje as GeoJsonObject}
                        style={
                            {
                                fillColor: "#968e0f",
                                color: "#968e0f",
                                opacity: 1
                            }
                        }
                        interactive
                        pointToLayer={
                            (_, latlng) => {
                                return L.circleMarker(latlng, {
                                    radius: 5
                                });
                            }
                        }
                    >

                        <Popup>
                            <div>
                                <h5>{Paroh.otacDjordje.ime}</h5>
                                <a href={`tel:${Paroh.otacDjordje.telefon}`}>{Paroh.otacDjordje.telefon}</a>
                            </div>
                        </Popup>
                    </GeoJSON>
                    <GeoJSON
                        data={oJovo as GeoJsonObject}
                        onEachFeature={onEachFeature}
                        style={{fillColor: "#81002b", color: "#81002b", opacity: 1}}
                        interactive
                        pointToLayer={
                            (_, latlng) => {
                                return L.circleMarker(latlng, {
                                    radius: 5
                                });
                            }
                        }
                    >
                        <Popup>
                            <div>
                                <h5>{Paroh.otacJovo.ime}</h5>
                                <a href={`tel:${Paroh.otacJovo.telefon}`}>{Paroh.otacJovo.telefon}</a>
                            </div>
                        </Popup>
                    </GeoJSON>
                    <GeoJSON
                        data={oGligorije as GeoJsonObject}
                        onEachFeature={onEachFeature}
                        style={{fillColor: "#00b8c9", color: "#00b8c9", opacity: 1}}
                        interactive
                        pointToLayer={
                            (_, latlng) => {
                                return L.circleMarker(latlng, {
                                    radius: 5
                                });
                            }
                        }
                    >
                        <Popup>
                            <div>
                                <h5>{Paroh.otacGligorije.ime}</h5>
                                <a href={`tel:${Paroh.otacGligorije.telefon}`}>{Paroh.otacGligorije.telefon}</a>
                            </div>
                        </Popup>
                    </GeoJSON>
                    {/*<Polygon positions={*/}
                    {/*    [*/}
                    {/*        [*/}
                    {/*            44.7770072,*/}
                    {/*            20.4735594*/}
                    {/*        ],*/}
                    {/*        [*/}
                    {/*            44.7771123,*/}
                    {/*            20.473946*/}
                    {/*        ],*/}
                    {/*        [*/}
                    {/*            44.7771405,*/}
                    {/*            20.4739283*/}
                    {/*        ],*/}
                    {/*        [*/}
                    {/*            44.7772424,*/}
                    {/*            20.4744054*/}
                    {/*        ],*/}
                    {/*        [44.7775141,*/}
                    {/*            20.4742892*/}
                    {/*        ],*/}
                    {/*        [44.7774829,*/}
                    {/*            20.4741093*/}
                    {/*        ],*/}
                    {/*        [44.7775008,*/}
                    {/*            20.474092*/}
                    {/*        ],*/}
                    {/*        [44.777518,*/}
                    {/*            20.4740712*/}
                    {/*        ],*/}
                    {/*        [44.777426,*/}
                    {/*            20.4737602*/}
                    {/*        ],*/}
                    {/*        [44.7772816,*/}
                    {/*            20.4733296*/}
                    {/*        ],*/}
                    {/*        [44.7770072,*/}
                    {/*            20.4735594*/}
                    {/*        ]*/}
                    {/*    ]*/}
                    {/*} />*/}
                </MapContainer>
            </div>
        </Container>

    );
}

export default PretragaParohija;
