import React, {useState} from 'react';
import {Autocomplete, Button, Container, Divider, TextField, Tooltip} from "@mui/material";
import {uliceRS, uliceRSCyr} from "../../const/pretragaparohija/ulice";
import {NEPARNI, PARNI, Parohija, parohije} from "../../const/pretragaparohija/const";

const CYR_PATTERN = /^[абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ ]*$/

function PretragaParohija() {
    const sortUliceRS = uliceRS.sort((a, b) => a.value > b.value ? 1 : -1);
    const sortUliceRSCyr = uliceRSCyr.sort((a, b) => a.value > b.value ? 1 : -1);
    const [error, setError] = useState<{ error: boolean; errorText: string }>({error: false, errorText: ''});
    const [izabraneOpcije, postaviIzabranuOpciju] = useState<{ value: string; label: string; }[]>(sortUliceRS);
    const [izabraneParohije, postaviIzabraneParohije] = useState<Array<Parohija> | null>(null);
    const [ostaleParohije, postaviOstaleParohije] = useState<Array<Parohija> | null>(null);
    const [parohijeAutoKomplit, postaviParohijeAutokomplit] = useState<Array<Parohija> | null>(null);
    const [broj, upisiBroj] = useState<number | null>(null);
    const setOptions = (keyboardValue: string | null): void => {
        if (keyboardValue && CYR_PATTERN.test(keyboardValue)) {
            postaviIzabranuOpciju(sortUliceRSCyr);
        } else {
            postaviIzabranuOpciju(sortUliceRS);
        }
    }

    const handleTextInputChange = (event: any) => {
        setOptions(event.target.value);
    };
    const handleNumberInputChange = (event: any) => {
        upisiBroj(event.target.value);
    };

    const pronadjiParohaPoBrojuUlice = () => {
        let strana: string;
        if (broj !== null) {
            strana = broj % 2 ? PARNI : NEPARNI;
            const parohija = parohijeAutoKomplit?.filter(parohije => parohije.odredjeniBrojevi ? parohije.odredjeniBrojevi.some(brojevi => brojevi.prviBroj % 2 === broj % 2 && brojevi.prviBroj <= broj && broj <= brojevi.zadnjiBroj) : parohije.parniIliNeparni === strana);
            console.log(izabraneParohije);
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

    const handleAutocompleteChange = (autocompleteValue: { value: string; label: string; } | null) => {
        const selectedValue = autocompleteValue?.value;
        let izabranaParohija: Parohija[];
        let ostaleParohije: Parohija[];
        postaviIzabraneParohije(null);
        if (selectedValue !== undefined) {
            if (CYR_PATTERN.test(selectedValue)) {
                izabranaParohija = parohije.filter((parohija: Parohija) => parohija.ime.cyr === selectedValue);
                ostaleParohije = parohije.filter((parohija: Parohija) => parohija.ime.cyr !== selectedValue);
                console.log(ostaleParohije);
            } else {
                izabranaParohija = parohije.filter((parohija: Parohija) => (Array.isArray(parohija.ime.lat) && parohija.ime.lat.includes(selectedValue)) || (typeof parohija.ime.lat === "string" && parohija.ime.lat === selectedValue));
                ostaleParohije = parohije.filter((parohija: Parohija) => (Array.isArray(parohija.ime.lat) && parohija.ime.lat.includes(selectedValue)) || (typeof parohija.ime.lat === "string" && parohija.ime.lat !== selectedValue));

                console.log(ostaleParohije);
            }
            console.log(izabranaParohija);
            upisiBroj(null);
            postaviIzabraneParohije(izabranaParohija);
            postaviOstaleParohije(ostaleParohije)
            postaviParohijeAutokomplit(izabranaParohija);
        }
    }
    return (
        <Container sx={{padding: 5, display: "flex", flexDirection: "column"}}>
            <h2>Пронађите своју парохију</h2>
            <hr/>
            <div className="text-box">
                <p>Како да пронађете пароха ваше адресе?</p>
                <ul>
                    <li>У поље име улице, упишите или изаберите име улице где живите (можете и ћирилицом и латиницом)
                    </li>
                    <li>Ако је улица подељена на више пароха, приказаће се поље да унесете број улице</li>
                    <li>Када унесете број улице, притисните дугме "Прикажи"</li>
                    <li>Са десне стране ће се показати ком пароху припада ваша адреса</li>
                    <li>Ако улица припада само једном пароху, са десне стране ће се показати ко је парох за вашу улицу
                    </li>
                </ul>
            </div>
            <Divider variant="inset" sx={{margin: "20px 0"}} className="react-divider"/>
            <Container sx={{display: "flex"}}>
                <Container sx={{display: "flex", alignItems: "center"}}>
                    <Autocomplete
                        disablePortal
                        clearText={"Претражи поново"}
                        id="combo-box-demo"
                        options={izabraneOpcije}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        sx={{width: 400}}
                        onChange={(_, value) => {
                            handleAutocompleteChange(value)
                        }}
                        renderInput={(params) => <TextField {...params} onChange={handleTextInputChange}
                                                            label="Име улице"/>}
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

                <Container sx={{display: "flex", height: 200}}>
                    {
                        izabraneParohije?.length === 1 &&
                        <>
                            <Divider orientation="vertical" className="react-divider"/>
                            <Container sx={{display: "flex", flexDirection: "column"}}>
                                <h2>{izabraneParohije[0].paroh.ime}</h2>
                                <a href={`tel:${izabraneParohije[0].paroh.telefon}`}>{izabraneParohije[0].paroh.telefon}</a>
                                <p>Остале адресе на којима је парох {izabraneParohije[0].paroh.ime}</p>
                                <ul>
                                    {
                                        ostaleParohije && ostaleParohije.map(parohije => {
                                            if(parohije.paroh.ime === izabraneParohije[0].paroh.ime) {
                                                return (
                                                    <li>{parohije.ime.cyr}</li>
                                                );
                                            } else {
                                                return '';

                                            }
                                        })
                                    }
                                </ul>
                            </Container>
                        </>
                    }
                </Container>
            </Container>
        </Container>

    );
}

export default PretragaParohija;
