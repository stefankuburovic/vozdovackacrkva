import axios from "axios";

export interface IBogosluzenje {
    id?: number;
    praznik: string | null;
    datum_bdenija: string | null;
    vreme_bdenija: string | null;
    dodatne_informacije: string | null;
    datum_bogosluzenja: string | null;
    vreme_bogosluzenja: string | null;
}

interface IBogosluzenjaService {
    getBogosluzenja: (
        datumLiturgije: Date,
        setBogosluzenjeData: Function,
        setPostojeceBogosluzenje: Function,
        apiUrl?: string,
    ) => void;
    saveOrUpdateBogosuzenje: (
        bogosluzenje: IBogosluzenje,
        bogosluzenjeData: IBogosluzenje[],
        fetchData: Function,
        openSnackbar: Function,
        apiUrl?: string
    ) => void;
    deleteBogosluzenje: (id: number, fetchData: Function, openSnackbar: Function, apiUrl?: string) => void;
}
class BogosluzenjaService implements IBogosluzenjaService {
    private static instance: BogosluzenjaService;

    private constructor() {
    }

    public static getInstance(): BogosluzenjaService {
        if (!BogosluzenjaService.instance) {
            BogosluzenjaService.instance = new BogosluzenjaService();
        }

        return BogosluzenjaService.instance;
    }

    public async getBogosluzenja(datumLiturgije: Date, setBogosluzenjeData: Function, setPostojeceBogosluzenje: Function, apiUrl?: string) {
        try {
            const response = await axios.get(`${apiUrl}/bogosluzenja/date/${datumLiturgije.toISOString().slice(0, 10)}`);
            setBogosluzenjeData(response.data);
            setPostojeceBogosluzenje(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    public async saveOrUpdateBogosuzenje (
        bogosluzenje: IBogosluzenje,
        bogosluzenjeData: IBogosluzenje[],
        fetchData: Function,
        openSnackbar: Function,
        apiUrl?: string
    ) {

        try {
            if (bogosluzenjeData.length > 0) {
                await axios.put(`${apiUrl}/bogosluzenja/${bogosluzenjeData[0].id}`, bogosluzenje);
            } else {
                await axios.post(`${apiUrl}/bogosluzenja`, bogosluzenje);
            }
            openSnackbar(`Богослужење за празник ${bogosluzenje.praznik} је успешно сачувано у распоред`, "success");
            fetchData();
        } catch (error) {
            console.error(error);
            openSnackbar('Дошло је до грешке приликом чувања богослужења у распоред', "error");
        }
    }

    public async deleteBogosluzenje(
        id: number,
        fetchData: Function,
        openSnackbar: Function,
        apiUrl?: string
    ) {
        try {
            await axios.delete(`${apiUrl}/bogosluzenja/${id}`);
            openSnackbar('Богослужење је успешно обрисано из распореда', "success");
            fetchData();
        } catch (error) {
            console.error(error);
            openSnackbar('Дошло је до грешке приликом брисања богослужења из распореда', "error");
        }
    }
}
    export default BogosluzenjaService;