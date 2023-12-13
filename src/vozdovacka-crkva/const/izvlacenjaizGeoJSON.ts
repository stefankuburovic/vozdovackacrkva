//otac Gligorije

import JSON from "./pretragaparohija/map/sve.json";

// let vitanovacka = JSON.features.filter((d: any) => d["properties"] && d["properties"]["building"] && d["properties"]["addr:street"] && arrayOfNames.includes(d["properties"]["addr:street"]) && d["properties"]["addr:street"] !== "Војводе Степе" && d["properties"]["addr:street"] !== "Кумодрашка" && d["properties"]["addr:street"] !== "Витановачка");
// console.log(vitanovacka);
// const a = vitanovacka.filter((d: any) => (
//     ( d["properties"]["addr:street"] === "Војводе Степе" &&
//         (
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 1
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 51
//             )
//         )
//     )
//     ||
//
//     ( d["properties"]["addr:street"] === "Витановачка" &&
//         (
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 === 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 2
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 38
//             ) ||
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 1
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 77
//             )
//         )
//     ) ||
//
//
//     ( d["properties"]["addr:street"] === "Кумодрашка" &&
//         (
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 === 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 90
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 184
//             ) ||
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 183
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 293
//             )
//         )
//     )
// ));
// console.log(a);


// //otac Djordje

//
// ostaleParohije !== null && ostaleParohije.map(parohije => {
//     arrayOfNames.push(parohije.ime.cyr);
// });
// izabraneParohije !== null && arrayOfNames.push(izabraneParohije[0].ime.cyr);
// let vitanovacka = JSON["features"].filter((d: any) => d["properties"] && d["properties"]["building"] && d["properties"]["addr:street"] && arrayOfNames.includes(d["properties"]["addr:street"]) && d["properties"]["addr:street"] !== "Војводе Степе" && d["properties"]["addr:street"] !== "Кумодрашка" && d["properties"]["addr:street"] !== "Никшићка" && d["properties"]["addr:street"] !== "Дарвинова");
//
// console.log(vitanovacka);
// const a = vitanovacka.filter((d: any) => (
//     ( d["properties"]["addr:street"] === "Војводе Степе" &&
//         (
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 === 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 216
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 302
//             ) ||
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 229
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 293
//             )
//         )
//     )
//     ||
//
//     ( d["properties"]["addr:street"] === "Никшићка" &&
//         (
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 === 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 8
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 52
//             ) ||
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 9
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 51
//             )
//         )
//     ) ||
//
//
//     ( d["properties"]["addr:street"] === "Дарвинова" &&
//         (
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 === 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 25
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 33
//             ) ||
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 26
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 34
//             )
//         )
//     ) ||
//     (
//         d["properties"]["addr:street"] === "Кумодрашка"
//         && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//         && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z 0-9.]+/g,'')) >= 181
//         && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z]+/g,'')) <= 181
//     )
// ));

//otac Jovo


//
// const arrayOfNames: string[] = [];
// ostaleParohije !== null && ostaleParohije.map(parohije => {
//     arrayOfNames.push(parohije.ime.cyr);
// });
// izabraneParohije !== null && arrayOfNames.push(izabraneParohije[0].ime.cyr);
// let vitanovacka = JSON["features"].filter((d: any) => d["properties"] && d["properties"]["building"] && d["properties"]["addr:street"] && ostaleParohije !== null && arrayOfNames.includes(d["properties"]["addr:street"]) && d["properties"]["addr:street"] !== "Булевар Ослобођења" && d["properties"]["addr:street"] !== "Војводе Степе");
// const a = vitanovacka.filter((d: any) => (
//     ( d["properties"]["addr:street"] === "Војводе Степе" &&
//         (
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 === 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 8
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 212
//             ) ||
//             (
//                 Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 51
//                 && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 219
//             )
//         )
//     )
//     ||
//     (
//         d["properties"]["addr:street"] === "Булевар Ослобођења"
//         && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//         && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z 0-9.]+/g,'')) >= 75
//         && Number(d["properties"]["addr:housenumber"]?.replace(/[^a-zA-Z]+/g,'')) < 210
//     )
// ));

//otac Aleksandar

//
// const arrayOfNames: string[] = [];
// ostaleParohije !== null && ostaleParohije.map(parohije => {
//     arrayOfNames.push(parohije.ime.cyr);
// });
// izabraneParohije !== null && arrayOfNames.push(izabraneParohije[0].ime.cyr);
// let vitanovacka = JSON["features"].filter((d: any) => d["properties"] && d["properties"]["building"] && d["properties"]["addr:street"] && ostaleParohije !== null && arrayOfNames.includes(d["properties"]["addr:street"]) && d["properties"]["addr:street"] !== "Кумодрашка" && d["properties"]["addr:street"] !== "Витановачка");
// const a = vitanovacka.filter((d: any) => (
//    ( d["properties"]["addr:street"] === "Кумодрашка" &&
//     (
//         (
//             Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 === 0
//             && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z 0-9.]+/g,'')) >= 2
//             && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z]+/g,'')) < 92
//         ) ||
//         (
//             Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 !== 0
//             && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z 0-9.]+/g,'')) >= 1
//             && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z]+/g,'')) < 123
//         )
//     )
//    )
//      ||
//     (
//         d["properties"]["addr:street"] === "Витановачка"
//         && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z 0-9.]+/g,'')) % 2 === 0
//         && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z 0-9.]+/g,'')) >= 38
//         && Number(d["properties"]["addr:housenumber"].replace(/[^a-zA-Z]+/g,'')) < 44
//     )
// ));
export const aaa = 1;
