export interface IQuestionDTO {
    code: string;
    name: string;
    descr: string;
    fields_shows: string[];
}

export interface IInternalAnswerDTO {
    name: string;
    question_next: string;
}

export interface IAnswerDTO {
    code: string,
    name: string,
    question: string,
    answer: IInternalAnswerDTO[]
}

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

// todo change name
export interface ICreateQuestionOrAnswer { 
    title: string, 
    description: string 
}