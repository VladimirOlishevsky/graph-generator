import { action, makeAutoObservable, makeObservable } from 'mobx';
import { IAnswerDTO, IQuestionDTO } from './types';

interface IState {
    questions: IQuestionDTO[],
    answers: IAnswerDTO[]
}

export class GraphStore {

    state: IState = {
        questions: [],
        answers: []
    }

    constructor() {

        makeAutoObservable(this.state);
        makeObservable(this, {
            deleteQuestions: action,
            deleteAnswers: action,
            setQuestions: action,
            setAnswers: action
        })
    }

    setQuestions = (questions: IQuestionDTO[]) => {
        this.state.questions = questions;
    }

    setAnswers = (answers: IAnswerDTO[]) => {
        this.state.answers = answers
    }

    deleteQuestions = (questions: IQuestionDTO[]) => {
        this.state.questions = this.state.questions.filter(x => !questions.some(value => value.code === x.code));
    }

    deleteAnswers = (answers: IAnswerDTO[]) => {
        this.state.answers = this.state.answers.filter(x => !answers.some(value => value.code === x.code));
    }
}

export class CommonRootStore {
    graphStore: GraphStore;

  constructor() {
    this.graphStore = new GraphStore();
  }

  reset() {
    this.graphStore = new GraphStore();
  }
}

export const commonStore = new CommonRootStore();
