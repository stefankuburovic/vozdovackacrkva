import * as React from "react";
import {IBogosluzenje} from "../../../../shared/services/bogosluzenja";
import {formatDate, getDayName} from "../../../../util/functions";

interface IPraznikPoPraznik {
    bogosluzenje: IBogosluzenje;
}

export const PraznikPoPraznik = (
    {bogosluzenje}: IPraznikPoPraznik
): React.JSX.Element => {
    const {
        praznik,
        datum_bogosluzenja,
        vreme_bogosluzenja,
        datum_bdenija,
        vreme_bdenija,
        dodatne_informacije
    } = bogosluzenje;

    return <div key={bogosluzenje.id}>
        {
            !!praznik &&
            <div className="praznik">
                <h4>{
                    getDayName(new Date(datum_bogosluzenja as string))}, {formatDate(new Date(datum_bogosluzenja as string))} {praznik}</h4>

                <h5>{getDayName(new Date(datum_bdenija as string))}, {formatDate(new Date(datum_bdenija as string))}</h5>
                <ul>
                    <li>
                        <p>{vreme_bdenija} - Предпразнично бденије</p>
                    </li>
                </ul>
                <h5>{getDayName(new Date(datum_bogosluzenja as string))}, {formatDate(new Date(datum_bogosluzenja as string))}</h5>
                <ul>
                    <li>
                        <p>{vreme_bogosluzenja} - Света Литургија</p>
                    </li>
                </ul>
            </div>
        }
        <div dangerouslySetInnerHTML={{__html: dodatne_informacije as string}}></div>
    </div>
}