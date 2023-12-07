export const PARNI = 'parni';
export const NEPARNI = 'neparni';

const Paroh = {
    otacAleksandar: {
        ime:  "о. Александар Савић",
        telefon: "0641970233"
    },
    otacJovo: {
        ime:  "о. Јово Калинић",
        telefon: "0604009353",
    },
    otacDjordje: {
        ime:  "о. Ђорђе Поповић",
        telefon: "063323682",
    },
    otacGligorije: {
        ime:  "о. Глигорије Марковић",
        telefon: "063232398",
    }
}
export interface Parohija {
    ime: {
        cyr: string,
        lat: Array<string> | string
    };
    parniIliNeparni?: string | Array<string>;
    paroh: {  ime: string; telefon: string; };
    odredjeniBrojevi?: Array<{
        prviBroj: number;
        zadnjiBroj: number;
    }>
}

export const parohije: Array<Parohija> =  [
    {
        ime: {
            lat: ["Admirala Vukovica", "Admirala Vukovića"],
            cyr: "Адмирала Вуковића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: "Italijanskih Partizana",
            cyr: "Италијанских Партизана"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Jovana Popovića", "Jovana Popovica"],
            cyr: "Јована Поповића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Isidore Sekulic", "Isidore Sekulić"],
            cyr: "Исидоре Секулић"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Kirila Savica", "Kirila Savića"],
            cyr: "Кирила Савића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Kumodraska", "Kumodraška"],
            cyr: "Кумодрашка"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 2,
                zadnjiBroj: 90
            },
            {
                prviBroj: 1,
                zadnjiBroj: 121
            }
        ],
        parniIliNeparni: [PARNI, NEPARNI],
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: "Danijelova",
            cyr: "Данијелова"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Esad Pasina", "Esad Pašina"],
            cyr: "Есад Пашина"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Bože Jankovića", "Boze Jankovica"],
            cyr: "Боже Јанковића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Borisavljeviceva", "Borisavljevićeva"],
            cyr: "Борисављевића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Bukovicka", "Bukovička"],
            cyr: "Буковичка"
        },
        parniIliNeparni: PARNI,
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Vitanovacka", "Vitanovaćka"],
            cyr: "Витановачка"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 38,
                zadnjiBroj: 44
            }
        ],
        parniIliNeparni: PARNI,
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Vojvode Djurovica", "Vojvode Đurovića"],
            cyr: "Војводе Ђуровића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: "Vojvode Skopljanca",
            cyr: "Војводе Скопљанца"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: "Limska",
            cyr: "Лимска"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Ljube Kovacevica", "Ljube Kovačevića"],
            cyr: "Љубе Ковачевића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Ljube Nedica", "Ljube Nedića"],
            cyr: "Љубе Недића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Ljubicka", "Ljubička"],
            cyr: "Љубичка"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Milana Bogdanovica", "Milana Bodanovića"],
            cyr: "Милана Богдановића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Nestora Zucnog", "Nestora Žučnog"],
            cyr: "Нестора Жучног"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Petra Gvojica", "Petra Gvojića"],
            cyr: "Петра Гвојића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Pirocanceva", "Piroćančeva"],
            cyr: "Пироћанчева"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Ribnicka", "Ribnička"],
            cyr: "Рибничка"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Rucoviceva", "Rucovićeva"],
            cyr: "Руцовићева"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Stevana Jakovljevica", "Stevana Jakovljevića"],
            cyr: "Стевана Јаковљевића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: ["Stevana Lilica", "Stevana Lilića"],
            cyr: "Стевана Лилића"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: "Tolminska",
            cyr: "Толминска"
        },
        paroh: Paroh.otacAleksandar,
    },
    {
        ime: {
            lat: "Bajronova",
            cyr: "Бајронова"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Koste Jovanovica", "Koste Jovanovića"],
            cyr: "Косте Јовановића"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Radjevska", "Rađevska"],
            cyr: "Рађевска"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Milovana Marinkovica","Milovana Marinkovića"],
            cyr: "Милована Маринковића"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Jove Ilica","Jove Ilića"],
            cyr: "Јове Илића"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Prilucka","Prilučka"],
            cyr: "Прилучка"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Dimitrija Stamenkovica","Dimitrija Stamenkovića"],
            cyr: "Димитрија Стаменковића"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Lepenicka","Lepenička"],
            cyr: "Лепеничка"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Pukovnika Purica","Pukovnika Purića"],
            cyr: "Пуковинка Пурића"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Bulevar Oslobodjenja","Bulevar Oslobođenja"],
            cyr: "Булевар Ослобођења"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 75,
                zadnjiBroj: 209
            }
        ],
        parniIliNeparni: NEPARNI,
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: "Vojvode Stepe",
            cyr: "Војводе Степе"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 8,
                zadnjiBroj: 212
            },
            {
                prviBroj: 51,
                zadnjiBroj: 227
            }
        ],
        parniIliNeparni: [PARNI, NEPARNI],
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: "Generala Anrija",
            cyr: "Генерала Анрија"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: "Gostivarska",
            cyr: "Гостиварска"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: "Dukljaninova",
            cyr: "Дукљанинова"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: ["Josanicka", "Jošanička"],
            cyr: "Јошаничка"
        },
        paroh: Paroh.otacJovo,
    },
    {
        ime: {
            lat: "Vojvode Stepe",
            cyr: "Војводе Степе"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 216,
                zadnjiBroj: 300
            },
            {
                prviBroj: 229,
                zadnjiBroj: 293
            }
        ],
        parniIliNeparni: [PARNI, NEPARNI],
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Milana Raspopovica", "Milana Raspoopvića"],
            cyr: "Милана Распоповића"
        },
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Niksicka", "Nikšićka"],
            cyr: "Никшићка"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 8,
                zadnjiBroj: 50
            },
            {
                prviBroj: 9,
                zadnjiBroj: 51
            }
        ],
        parniIliNeparni: [PARNI, NEPARNI],
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: "Milke Grgurove",
            cyr: "Милке Гргурове"
        },
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Ljube Sercera", "Ljube Šercera"],
            cyr: "Љубе Шерцера"
        },
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Nikole Miljanovica", "Nikole Miljanovića"],
            cyr: "Николе Миљановића"
        },
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Kumodraska", "Kumodraška"],
            cyr: "Кумодрашка"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 181,
                zadnjiBroj: 181
            },
        ],
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Kostolacka", "Kostolačka"],
            cyr: "Костолачка"
        },
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Ljube Vuckovica", "Ljube Vučkovića"],
            cyr: "Љубе Вучковића"
        },
        parniIliNeparni: PARNI,
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Vorornjeska", "Vorornješka"],
            cyr: "Вороњешка"
        },
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: "Gruzijska",
            cyr: "Грузијска"
        },
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Danila Bojovica", "Danila Bojovića"],
            cyr: "Данила Бојовића"
        },
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: "Darvinova",
            cyr: "Дарвинова"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 25,
                zadnjiBroj: 33
            },
            {
                prviBroj: 26,
                zadnjiBroj: 34
            }
        ],
        parniIliNeparni: [PARNI, NEPARNI],
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: "Zlarinska",
            cyr: "Зларинска",
        },
        parniIliNeparni: PARNI,
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: ["Kalnicka", "Kalnička"],
            cyr: "Калничка"
        },
        paroh: Paroh.otacDjordje,
    },
    {
        ime: {
            lat: "Unska",
            cyr: "Унска",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: "Sanska",
            cyr: "Санска",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: "Podravska",
            cyr: "Подравска",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: "Bjelovarska",
            cyr: "Бјеловарска",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: ["Kumodraska", "Kumodraška"],
            cyr: "Кумодрашка"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 90,
                zadnjiBroj: 182
            },

            {
                prviBroj: 183,
                zadnjiBroj: 291
            }
        ],
        parniIliNeparni: PARNI,
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: ["Vitanovacka", "Vitanovaćka"],
            cyr: "Витановачка"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 2,
                zadnjiBroj: 36
            },
            {
                prviBroj: 1,
                zadnjiBroj: 77
            }
        ],
        parniIliNeparni: [PARNI, NEPARNI],
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: ["Gligorija Vozarevica", "Gligorija Vozarevića"],
            cyr: "Глигорија Возаревића",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: ["Kacarska", "Kačarska"],
            cyr: "Качарска",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: "Kralja Vladimira",
            cyr: "Краља Владимира",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: ["Milana Saranovica", "Milana Šaranovića"],
            cyr: "Милована Шарановића",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: ["Nikole Djurkovica", "Nikole Đurkovića"],
            cyr: "Николе Ђурковића",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: ["Petrovacka", "Petrovačka"],
            cyr: "Петровачка",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: ["Sicevacka", "Sićevačka"],
            cyr: "Сићевачка",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: ["Svetislava Cvijanovica", "Svetislava Cvijanovića"],
            cyr: "Светислава Цвијановића",
        },
        paroh: Paroh.otacGligorije,
    },
    {
        ime: {
            lat: "Vojvode Stepe",
            cyr: "Војводе Степе"
        },
        odredjeniBrojevi: [
            {
                prviBroj: 1,
                zadnjiBroj: 49
            },
        ],
        parniIliNeparni: [NEPARNI],
        paroh: Paroh.otacGligorije,
    },
]
