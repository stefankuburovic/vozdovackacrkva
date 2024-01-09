import React, {useState} from 'react';
import {
    Box,
    List,
    Button,
    Divider,
    Tooltip,
    ListItem,
    TextField,
    Container,
    ListItemText,
    Autocomplete,
} from "@mui/material";
import {uliceRSCyr} from "../../const/pretragaparohija/ulice";
import Map from "./map/Map";
import {NEPARNI, PARNI, Paroh, Parohija, parohije} from "../../const/pretragaparohija/const";

import {CYR_PATTERN} from "../../const";
import {latToCyr} from "../../../util/functions";


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
                const ostaleParohije = parohije.filter((p: Parohija) => p.ime.cyr !== parohija[0].ime.cyr && p.paroh.ime === parohija[0].paroh.ime);
                setError({
                    error: false,
                    errorText: ''
                })

                postaviOstaleParohije(ostaleParohije);
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
                <Container sx={{display: "flex", flexDirection: "column"}}>
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
                            ) && <Container sx={{display: "flex"}} className="dodavanje-broja">
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
                    <p className="opis-adrese">
                        {
                            izabraneParohije?.length === 1
                            && izabraneParohije[0].odredjeniBrojevi
                            && izabraneParohije[0]?.odredjeniBrojevi[0]?.prviBroj !== izabraneParohije[0]?.odredjeniBrojevi[0]?.zadnjiBroj
                            && setSpecificNumbers(
                                izabraneParohije[0]?.odredjeniBrojevi,
                                izabraneParohije[0].parniIliNeparni
                            )
                        }
                    </p>
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
                </Container>

                <Container sx={{display: "flex"}}>
                    {
                        izabraneParohije?.length === 1 &&
                        <>
                            <Divider orientation="vertical" className="react-divider"/>
                            <Container sx={{display: "flex", flexDirection: "column"}}>
                                <Container>
                                    <img src={`/assets/images/svestenici/${izabraneParohije[0].paroh.ime}.webp`}
                                         alt={izabraneParohije[0].paroh.ime}/>
                                    <Container>
                                        <h2>{izabraneParohije[0].paroh.ime}</h2>
                                        <a href={`tel:${izabraneParohije[0].paroh.telefon}`}>{izabraneParohije[0].paroh.telefon}</a>
                                    </Container>
                                </Container>
                            </Container>
                        </>
                    }
                </Container>
            </Container>
            <Map/>
        </Container>
    );
}

export default PretragaParohija;
