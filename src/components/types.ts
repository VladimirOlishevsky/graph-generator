export interface IResponseData {
    fields: IResponseFields[],
    question: IResponseQuestion[]
    answer: IResponseAnswer[]
}

export interface IResponseFields {
    code: string;
    name: string;
}
export interface IResponseQuestion {
    code: string;
    name: string;
    descr: string;
    fields_shows: string[];
}

export interface IResponseAnswer {
    code: string,
    name: string,
    question: string,
    answer: IInternalAnswerDTO[]
}

export interface IQuestionDTO extends IResponseQuestion {
    isCollapse?: boolean
}

export interface IInternalAnswerDTO {
    name: string;
    question_next: string;
}

export interface IAnswerDTO extends IResponseAnswer { }

export interface IInternalAnswer {
    name: string;
    question_next?: IQuestion;
}

export interface IAnswer extends Omit<IAnswerDTO, 'answer'> {
    answer: IInternalAnswer[]
}

export interface IQuestion extends IQuestionDTO {
    answers: IAnswer[]
}

export interface ICreateEditQuestionAnswer {
    title: string,
    description: string,
    fieldsShowsIds?: string[]
}