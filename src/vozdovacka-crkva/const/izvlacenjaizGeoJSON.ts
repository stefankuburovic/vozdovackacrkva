//otac Gligorije


import JSON from "./pretragaparohija/map/map.json";
import {extractNumericPart} from "../../util/functions";
//
// const arrayOfNames: string[] = [];
// ostaleParohije !== null && ostaleParohije.map(parohije => {
//     arrayOfNames.push(parohije.ime.cyr);
// });
// izabraneParohije !== null && arrayOfNames.push(izabraneParohije[0].ime.cyr);
// @ts-ignore
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
// @ts-ignore
// let vitanovacka = JSON["features"].filter(
// (d: any) => (
//         d["properties"]
//         && d["properties"]["building"]
//         && d["properties"]["addr:street"]
//         && arrayOfNames.includes(d["properties"]["addr:street"])
//         && d["properties"]["addr:street"] !== "Војводе Степе"
//         && d["properties"]["addr:street"] !== "Витановачка"
//         && d["properties"]["addr:street"] !== "Кумодрашка"
//     )
//     || (
//         d["properties"]["addr:housenumber"]
//         && arrayOfNames.includes(d["properties"]["addr:street"]
//             && d["properties"]["addr:street"] !== "Војводе Степе"
//             && d["properties"]["addr:street"] !== "Витановачка"
//             && d["properties"]["addr:street"] !== "Кумодрашка"
//         )
//     )
// );
//
// console.log(vitanovacka);

// const a = vita.filter((d: any) => (
//     ( d["properties"]["addr:street"] === "Војводе Степе" &&
//         (
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 !== 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 1
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 51
//             )
//         )
//     )
//     ||
//
//     ( d["properties"]["addr:street"] === "Витановачка" &&
//         (
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 2
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 38
//             ) ||
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 !== 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 1
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 77
//             )
//         )
//     ) ||
//
//
//     ( d["properties"]["addr:street"] === "Кумодрашка" &&
//         (
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 90
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 185
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
// let vitanovacka = JSON["features"].filter(
//     (d: any) => (
//             d["properties"]
//             && d["properties"]["building"]
//             && d["properties"]["addr:street"]
//             && arrayOfNames.includes(d["properties"]["addr:street"])
//             && d["properties"]["addr:street"] !== "Војводе Степе"
//             && d["properties"]["addr:street"] !== "Витановачка"
//             && d["properties"]["addr:street"] !== "Кумодрашка"
//             && d["properties"]["addr:street"] !== "Зларинска"
//             && d["properties"]["addr:street"] !== "Љуба Вучковића"
//         )
//         || (
//             d["properties"]["addr:housenumber"]
//             && arrayOfNames.includes(d["properties"]["addr:street"]
//                 && d["properties"]["addr:street"] !== "Војводе Степе"
//                 && d["properties"]["addr:street"] !== "Витановачка"
//                 && d["properties"]["addr:street"] !== "Кумодрашка"
//                 && d["properties"]["addr:street"] !== "Зларинска"
//                 && d["properties"]["addr:street"] !== "Љуба Вучковића"
//             )
//         )
// );
//
// const a = vita.filter((d: any) => (
//     ( d["properties"]["addr:street"] === "Војводе Степе" &&
//         (
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 216
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 302
//             ) ||
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 !== 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 229
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 293
//             )
//         )
//     )
//     ||
//
//     ( d["properties"]["addr:street"] === "Никшићка" &&
//         (
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 8
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 52
//             ) ||
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 !== 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 9
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 51
//             )
//         )
//     ) ||
//     ( d["properties"]["addr:street"] === "Дарвинова" && extractNumericPart(d["properties"]["addr:housenumber"]) > 24 && extractNumericPart(d["properties"]["addr:housenumber"]) < 35)  ||
//     (
//         d["properties"]["addr:street"] === "Кумодрашка"
//         && extractNumericPart(d["properties"]["addr:housenumber"]) % 2 !== 0
//         && extractNumericPart(d["properties"]["addr:housenumber"]) >= 181
//         && extractNumericPart(d["properties"]["addr:housenumber"]) <= 181
//     ) ||
//     (
//         d["properties"]["addr:street"] === "Љуба Вучковића"
//         && extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//         && extractNumericPart(d["properties"]["addr:housenumber"]) >= 1
//         && extractNumericPart(d["properties"]["addr:housenumber"]) <= 100
//     ) ||
//     (
//         d["properties"]["addr:street"] === "Зларинска"
//         && extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//         && extractNumericPart(d["properties"]["addr:housenumber"]) >= 1
//         && extractNumericPart(d["properties"]["addr:housenumber"]) <= 200
//     )
// ));

//otac Jovo


//
// const arrayOfNames: string[] = [];
// ostaleParohije !== null && ostaleParohije.map(parohije => {
//     arrayOfNames.push(parohije.ime.cyr);
// });
// izabraneParohije !== null && arrayOfNames.push(izabraneParohije[0].ime.cyr);

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
// const a = vitanovacka.filter((d: any) => (
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

//otac Aleksandar

// @ts-ignore
// let vitanovacka = JSON["features"].filter(
//     (d: any) => (
//             d["properties"]
//             && d["properties"]["building"]
//             && d["properties"]["addr:street"]
//             && arrayOfNames.includes(d["properties"]["addr:street"])
//             && d["properties"]["addr:street"] !== "Кумодрашка"
//             && d["properties"]["addr:street"] !== "Витановачка"
//             && d["properties"]["addr:street"] !== "Буковичка"
//         )
//         || (
//             d["properties"]["addr:housenumber"]
//             && arrayOfNames.includes(d["properties"]["addr:street"]
//                 && d["properties"]["addr:street"] !== "Кумодрашка"
//                 && d["properties"]["addr:street"] !== "Витановачка"
//                 && d["properties"]["addr:street"] !== "Буковичка"
//             )
//         )
// );
//
// // @ts-ignore
//
// const a = vita.filter((d: any) => (
//     ( d["properties"]["addr:street"] === "Кумодрашка" &&
//         (
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 2
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 92
//             ) ||
//             (
//                 extractNumericPart(d["properties"]["addr:housenumber"]) % 2 !== 0
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) >= 1
//                 && extractNumericPart(d["properties"]["addr:housenumber"]) < 123
//             )
//         )
//     )
//     ||
//     (
//         d["properties"]["addr:street"] === "Витановачка"
//         && extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//         && extractNumericPart(d["properties"]["addr:housenumber"]) >= 38
//         && extractNumericPart(d["properties"]["addr:housenumber"]) < 70
//     )
//     ||
//     (
//         d["properties"]["addr:street"] === "Буковичка"
//         && extractNumericPart(d["properties"]["addr:housenumber"]) % 2 === 0
//         && extractNumericPart(d["properties"]["addr:housenumber"]) >= 2
//         && extractNumericPart(d["properties"]["addr:housenumber"]) < 70
//     )
// ));
// console.log(a);
export const aaa = 1;
