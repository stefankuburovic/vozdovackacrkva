import axios from "axios";

export interface IBogosluzenjeUopsteno {
    id?: number;
    opis: string | null;
}

interface IBogosluzenjeUopstenoService {
    getBogosluzenjeUopsteno: (
        apiUrl?: string,
        setBogosluzenjeUopsteno?: Function
    ) => void;
    saveOrUpdateBogosuzenjeUopsteno: (
        bogosluzenje: IBogosluzenjeUopsteno,
        bogosluzenjeData: IBogosluzenjeUopsteno[],
        fetchData: Function,
        openSnackbar: Function,
        apiUrl?: string
    ) => void;
    deleteBogosluzenjeUopsteno: (
        fetchData: Function,
        openSnackbar: Function,
        id?: number,
        apiUrl?: string
    ) => void;
}

class BogosluzenjaUopstenoService implements IBogosluzenjeUopstenoService {
    private static instance: IBogosluzenjeUopstenoService;

    private constructor() {
    }

    public static getInstance(): IBogosluzenjeUopstenoService {
        if (!BogosluzenjaUopstenoService.instance) {
            BogosluzenjaUopstenoService.instance = new BogosluzenjaUopstenoService();
        }

        return BogosluzenjaUopstenoService.instance;
    }
    async getBogosluzenjeUopsteno(apiUrl?: string, setBogosluzenjeUopsteno?: Function) {
        try {
            const response = await axios.get(`${apiUrl}/bogosluzenja_uopsteno`);
            if(setBogosluzenjeUopsteno) {
                setBogosluzenjeUopsteno(response.data);
            } else {
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }
    async saveOrUpdateBogosuzenjeUopsteno(
        bogosluzenje: IBogosluzenjeUopsteno,
        bogosluzenjeData: IBogosluzenjeUopsteno[],
        fetchData: Function,
        openSnackbar: Function,
        apiUrl?: string
    ) {
        try {
            if (bogosluzenjeData.length > 0) {
                await axios.put(`${apiUrl}/bogosluzenja_uopsteno/${bogosluzenjeData[0].id}`, bogosluzenje);
            } else {
                await axios.post(`${apiUrl}/bogosluzenja_uopsteno`, bogosluzenje);
            }
            openSnackbar(`Богослужење је успешно сачувано у распоред`, "success");
            fetchData();
        } catch (error) {
            console.error(error);
            openSnackbar('Дошло је до грешке приликом чувања богослужења у распоред', "error");
        }
    }
    async deleteBogosluzenjeUopsteno( fetchData: Function, openSnackbar: Function, id?: number, apiUrl?: string) {
        try {
            await axios.delete(`${apiUrl}/bogosluzenja_uopsteno/${id}`);
            openSnackbar('Богослужење је успешно обрисано из распореда', "success");
            fetchData();
        } catch (error) {
            console.error(error);
            openSnackbar('Дошло је до грешке приликом брисања богослужења из распореда', "error");
        }
    }
}
export default BogosluzenjaUopstenoService;