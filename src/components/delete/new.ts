// interface IQuestionDTO {
//     code: string;
//     name: string;
//     descr: string;
//     fields_shows: string[];
// }

// interface IInternalAnswerDTO {
//     name: string;
//     question_next: string;
// }

// interface IAnswerDTO {
//     code: string,
//     name: string,
//     question: string,
//     answer: IInternalAnswerDTO[]
// }

// interface IInternalAnswer {
//     name: string;
//     question_next?: IQuestion;
// }

// interface IAnswer extends Omit<IAnswerDTO, 'answer'> {
//     answer: IInternalAnswer[]
// }

// interface IQuestion extends IQuestionDTO {
//     answer: IAnswer[]
// }

// export const mockQuestions: IQuestionDTO[] = [
//     {
//         "code": "4735",
//         "name": "Привествие",
//         "descr": "Меня зовут… (свое имя), координатор отдела сервиса. Скажите пожалуйста полное ФИО собственника автомобиля.",
//         "fields_shows": [
//             "40",
//             "41",
//             "42"
//         ]
//     },
//     // {
//     //     "code": "4737",
//     //     "name": "Обслуживались ли вы ранее",
//     //     "descr": "Скажите пожалуйста полное ФИО собственника автомобиля. (Имя клиента) обслуживались ли Вы ранее нашем дилерском центре?.",
//     //     "fields_shows": [
//     //         "48"
//     //     ]
//     // },
//     // {
//     //     "code": "4738",
//     //     "name": "Какой авто",
//     //     "descr": "Запись для какого автомобиля нужно сформировать (модель, марка)?",
//     //     "fields_shows": [
//     //         "45",
//     //         "46"
//     //     ]
//     // },
//     // {
//     //     "code": "4740",
//     //     "name": "Телефонный номер",
//     //     "descr": "Уточните пожалуйста номер телефона для связи.",
//     //     "fields_shows": [
//     //         "43"
//     //     ]
//     // }
// ]

// export const mockAnswers: IAnswerDTO[] = [
//     {
//         "code": "4909",
//         "name": "Привествие",
//         "question": "4735",
//         "answer": [
//             {
//                 "name": "Далее",
//                 "question_next": "4737"
//             }
//         ]
//     },
//     // {
//     //     "code": "4910",
//     //     "name": "Обслуживались ли вы ранее",
//     //     "question": "4737",
//     //     "answer": [
//     //         {
//     //             "name": "Далее",
//     //             "question_next": "4738"
//     //         }
//     //     ]
//     // },
//     // {
//     //     "code": "4911",
//     //     "name": "Какой авто",
//     //     "question": "4738",
//     //     "answer": [
//     //         {
//     //             "name": "Далее",
//     //             "question_next": "4740"
//     //         }
//     //     ]
//     // },
//     // {
//     //     "code": "4909",
//     //     "name": "Телефонный номер",
//     //     "question": "4740",
//     //     "answer": [
//     //         {
//     //             "name": "Далее",
//     //             "question_next": ""
//     //         }
//     //     ]
//     // }
// ]

// export const constQuestionsLinks: string[] = mockAnswers.reduce((accumulator: string[], currentValue) => accumulator.concat(currentValue.answer.map(x => x.question_next)),
//     [])

// export const rootQuestions = mockQuestions.filter(f => !constQuestionsLinks.find(x => f.code == x));

// export const feelTreeQuestion = (questions: IQuestionDTO[], answers: IAnswerDTO[], question: IQuestionDTO): IQuestion => {
//     const questionAnswers: IAnswer[] = answers
//         .filter(x => x.question == question.code)
//         .map(f => ({
//             ...f,
//             answer: f.answer.map(z => ({
//                 ...z,
//                 question_next: (() => {
//                     const foundQuestion = questions.find(y => y.code == z.question_next);
//                     if (!foundQuestion) {
//                         return undefined;
//                     }
//                     return feelTreeQuestion(questions, answers, foundQuestion)
//                 })()
//             }))
//         }));


//     return {
//         ...question,
//         answer: questionAnswers
//     } as IQuestion;
// }

// export const getTransformedRootQuestions = (questions: IQuestionDTO[], answers: IAnswerDTO[], rootQuestions: IQuestionDTO[]): IQuestion[] =>
//     rootQuestions.map(x => feelTreeQuestion(questions, answers, x));




// export const result = getTransformedRootQuestions(mockQuestions, mockAnswers, rootQuestions);