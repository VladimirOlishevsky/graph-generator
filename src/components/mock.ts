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
  

export const newGraphMock = {
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
            "code": "4922",
            "name": "Тип претензии"
        },
        {
            "code": "4923",
            "name": "Суть притензии"
        }
    ],
    "question": [
        {
            "code": "testcodescript-4735",
            "name": "Привествие1",
            "descr": "Меня зовут… &#40;свое имя&#41;, координатор отдела сервиса. Скажите пожалуйста полное ФИО собственника автомобиля.\n\n",
            "fields_shows": [
                "41",
                "40",
                "42"
            ]
        },
        {
            "code": "testcodescript-4737",
            "name": "Обслуживались ли вы ранее",
            "descr": "Скажите пожалуйста полное ФИО собственника автомобиля.&nbsp;&nbsp;&#40;Имя клиента&#41; обслуживались ли Вы ранее нашем дилерском центре?n",
            "fields_shows": [
                "4745"
            ]
        },
        {
            "code": "testcodescript-4738",
            "name": "Какой авто",
            "descr": "Запись для какого автомобиля нужно сформировать &#40;модель, марка&#41;?n",
            "fields_shows": [
                "45",
                "46"
            ]
        },
        {
            "code": "testcodescript-4740",
            "name": "Телефонный номер",
            "descr": "Уточните пожалуйста номер телефона для связи. rnrn Мы удалим позже тип осмотра, сейчас он нужен для отладки процессов TradeIN &#40;тип осмотра заполняться не будет менеджером, а всегда будет только в ДЦ&#41;",
            "fields_shows": [
                "43"
            ]
        },
        {
            "code": "testcodescript-xRP6tr-r",
            "name": "Новый вопрос 333",
            "descr": "Новый вопрос 333",
            "fields_shows": [
                "43",
                "44"
            ]
        }
    ],
    "answer": [
        {
            "code": "testcodescript-rIucZOjz",
            "name": "тест вопрос 1",
            "question": "testcodescript-IQtK_cIo",
            "answer": []
        },
        {
            "code": "testcodescript-3XghLUUq",
            "name": "тест вопрос 2",
            "question": "testcodescript-2bpRHsoy",
            "answer": []
        },
        {
            "code": "testcodescript-k9B6TYcZ",
            "name": "Новый вопрос 11",
            "question": "testcodescript-MtWTsglw",
            "answer": []
        },
        {
            "code": "testcodescript-DoPiitLl",
            "name": "Новый вопрос 333",
            "question": "testcodescript-xRP6tr-r",
            "answer": []
        },
        {
            "code": "testcodescript-4909",
            "name": "Привествие",
            "question": "testcodescript-4735",
            "answer": [
                {
                    "name": "Далее",
                    "question_next": "testcodescript-4737"
                },
                {
                    "name": "Новый ответ 2",
                    "question_next": ""
                },
                {
                    "name": "Новый ответ 333",
                    "question_next": "testcodescript-xRP6tr-r"
                }
            ]
        },
        {
            "code": "testcodescript-4910",
            "name": "Обслуживались ли вы ранее",
            "question": "testcodescript-4737",
            "answer": [
                {
                    "name": "Далее",
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
                    "name": "Далее",
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