import * as React from "react";
import {IBogosluzenjeUopsteno} from "../../../../shared/services/bogosluzenja_uopsteno";

interface IUopsteno {
    bogosluzenje: IBogosluzenjeUopsteno;
}
export const Uopsteno = (
    {bogosluzenje}: IUopsteno
): React.JSX.Element => {
    const {
        opis
    } = bogosluzenje;
    return <div dangerouslySetInnerHTML={{__html: opis as string}}></div>
}