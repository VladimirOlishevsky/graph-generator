import { IAnswerDTO, IQuestionDTO } from "./types"

export const mockQuestions: IQuestionDTO[] = [
    {
        "code": "4737",
        "name": "Обслуживались ли вы ранее",
        "descr": "Скажите пожалуйста полное ФИО собственника автомобиля. (Имя клиента) обслуживались ли Вы ранее нашем дилерском центре?.",
        "fields_shows": [
            "48"
        ]
    },
    {
        "code": "4738",
        "name": "Какой авто",
        "descr": "Запись для какого автомобиля нужно сформировать (модель, марка)?",
        "fields_shows": [
            "45",
            "46"
        ]
    },
    {
        "code": "4740",
        "name": "Телефонный номер",
        "descr": "Уточните пожалуйста номер телефона для связи.",
        "fields_shows": [
            "43"
        ]
    },
    {
        "code": "4735",
        "name": "Привествие",
        "descr": "Меня зовут… (свое имя), координатор отдела сервиса. Скажите пожалуйста полное ФИО собственника автомобиля.",
        "fields_shows": [
            "40",
            "41",
            "42"
        ]
    },
]

export const mockAnswers: IAnswerDTO[] = [
    {
        "code": "4910",
        "name": "Обслуживались ли вы ранее",
        "question": "4737",
        "answer": [
            {
                "name": "Далее 222",
                "question_next": "4738"
            }
        ]
    },
    {
        "code": "4911",
        "name": "Какой авто",
        "question": "4738",
        "answer": [
            {
                "name": "Далее 333",
                "question_next": "4740"
            }
        ]
    },
    {
        "code": "4909",
        "name": "Телефонный номер",
        "question": "4740",
        "answer": [
            {
                "name": "Далее 444",
                "question_next": ""
            }
        ]
    },
    {
        "code": "4909",
        "name": "Привествие",
        "question": "4735",
        "answer": [
            {
                "name": "Далее 111",
                "question_next": "4737"
            }
        ]
    },
]

export const mockFieldShows = [
    {
      "code": "40",
      "name": "Имя"
    },
    {
      "code": "41",
      "name": "Фамилия"
    },
    {
      "code": "42",
      "name": "Отчество"
    },
    {
      "code": "43",
      "name": "Телефон"
    },
    {
      "code": "44",
      "name": "Адрес"
    },
    {
      "code": "45",
      "name": "Марка автомобиля"
    },
    {
      "code": "46",
      "name": "Модель автомобиля"
    },
    {
      "code": "47",
      "name": "Год выпуска"
    },
    {
      "code": "48",
      "name": "Обслуживались ли вы ранее?"
    }
]
  


export const newMock = {
    "fields": [
        {
            "code": "40",
            "name": "Имя"
        },
        {
            "code": "41",
            "name": "Фамилия"
        },
        {
            "code": "42",
            "name": "Отчество"
        },
        {
            "code": "43",
            "name": "Телефон"
        },
        {
            "code": "44",
            "name": "Адрес"
        },
        {
            "code": "45",
            "name": "Марка автомобиля"
        },
        {
            "code": "46",
            "name": "Модель автомобиля"
        },
        {
            "code": "47",
            "name": "Год выпуска"
        },
        {
            "code": "48",
            "name": "VIN"
        },
        {
            "code": "49",
            "name": "Время и дата"
        },
        {
            "code": "66",
            "name": "Комментарий"
        },
        {
            "code": "67",
            "name": "Email"
        },
        {
            "code": "132",
            "name": "Почему продаете?"
        },
        {
            "code": "133",
            "name": "Кто собственник?"
        },
        {
            "code": "134",
            "name": "Пробег"
        },
        {
            "code": "135",
            "name": "Какая коробка"
        },
        {
            "code": "136",
            "name": "Какая модификация"
        },
        {
            "code": "137",
            "name": "Какой цвет?"
        },
        {
            "code": "138",
            "name": "Сколько хозяев?"
        },
        {
            "code": "139",
            "name": "Было ДТП?"
        },
        {
            "code": "140",
            "name": "Сколько лет владеете?"
        },
        {
            "code": "141",
            "name": "Что с ЛКП, на что обратить внимание?"
        },
        {
            "code": "142",
            "name": "Нарекания по коробке, двигателю, подвеске?"
        },
        {
            "code": "254",
            "name": "Тестовое поле"
        },
        {
            "code": "2492",
            "name": "Причина отказа"
        },
        {
            "code": "2505",
            "name": "Город"
        },
        {
            "code": "2517",
            "name": "Тестовое поле"
        },
        {
            "code": "2681",
            "name": "Тип осмотра"
        },
        {
            "code": "4745",
            "name": "Обслуживались ли вы ранее?"
        },
        {
            "code": "4748",
            "name": "Тип осмотра"
        },
        {
            "code": "4755",
            "name": "Классификация"
        },
        {
            "code": "UF_CRM_1665138869",
            "name": "Гос.номер"
        },
        {
            "code": "421",
            "name": "Время и дата записи "
        }
    ],
    "question": [
        {
            "code": "testcodescript-asd1243sd-asda1-aghh-1sh",
            "name": "Обновленное поле",
            "descr": "Обновил описание и убрал поле UF_CRM_1665138869",
            "fields_shows": [
                "43",
                "48"
            ]
        },
        {
            "code": "testcodescript-4735",
            "name": "Привествие",
            "descr": "Меня зовут… &#40;свое имя&#41;, координатор отдела сервиса. Скажите пожалуйста полное ФИО собственника автомобиля.\n\n",
            "fields_shows": [
                "41",
                "40",
                "42",
                "2425"
            ]
        },
        {
            "code": "testcodescript-4737",
            "name": "Обслуживались ли вы ранее",
            "descr": "Скажите пожалуйста полное ФИО собственника автомобиля.&nbsp;&nbsp;&#40;Имя клиента&#41; обслуживались ли Вы ранее нашем дилерском центре?\n",
            "fields_shows": [
                "4745"
            ]
        },
        {
            "code": "testcodescript-4738",
            "name": "Какой авто",
            "descr": "Запись для какого автомобиля нужно сформировать &#40;модель, марка&#41;?\n",
            "fields_shows": [
                "45",
                "46",
                "48",
                "UF_CRM_1665138869"
            ]
        },
        {
            "code": "testcodescript-4740",
            "name": "Телефонный номер",
            "descr": "Уточните пожалуйста номер телефона для связи. \r\n\r\n Мы удалим позже тип осмотра, сейчас он нужен для отладки процессов TradeIN (тип осмотра заполняться не будет менеджером, а всегда будет только в ДЦ)",
            "fields_shows": [
                "43"
            ]
        }
    ],
    "answer": [
        {
            "code": "testcodescript-asd1243sd-asda1-aghh-1sh",
            "name": "Новое поле",
            "question": "",
            "answer": [
                {
                    "name": "Ответ",
                    "question_next": "testcodescript-4898"
                },
                {
                    "name": "Ответ 2",
                    "question_next": "testcodescript-4892"
                },
                {
                    "name": "Ответ 3",
                    "question_next": "testcodescript-4892"
                }
            ]
        },
        {
            "code": "testcodescript-412a",
            "name": "новый ответ тест",
            "question": "testcodescript-413s",
            "answer": [
                {
                    "name": "Ответ",
                    "question_next": "testcodescript-4898"
                },
                {
                    "name": "Ответ 2",
                    "question_next": "testcodescript-4892"
                },
                {
                    "name": "Ответ 3",
                    "question_next": "testcodescript-4892"
                }
            ]
        },
        {
            "code": "testcodescript-4909",
            "name": "Привествие",
            "question": "testcodescript-4735",
            "answer": [
                {
                    "name": "Далее обслуживались ли ранее",
                    "question_next": "testcodescript-4737"
                }
            ]
        },
        {
            "code": "testcodescript-4910",
            "name": "Обслуживались ли вы ранее",
            "question": "testcodescript-4737",
            "answer": [
                {
                    "name": "Далее какой авто",
                    "question_next": "testcodescript-4738"
                }
            ]
        },
        {
            "code": "testcodescript-4911",
            "name": "Какой авто",
            "question": "testcodescript-4738",
            "answer": [
                {
                    "name": "Далее телефонный номер",
                    "question_next": "testcodescript-4740"
                }
            ]
        },
        {
            "code": "testcodescript-4912",
            "name": "Продолжите в 1с",
            "question": "testcodescript-4740",
            "answer": [
                {
                    "name": "Далее",
                    "question_next": ""
                }
            ]
        }
    ]
  }