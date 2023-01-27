import { IAnswerDTO, IQuestion, IQuestionDTO } from "../components/types";

export interface IGetFlatQuestionsAndAnswers { 
    questions: IQuestionDTO[], 
    answers: IAnswerDTO[] 
}

export const getFlatQuestionsAndAnswers = (questions: IQuestion[]): IGetFlatQuestionsAndAnswers  => {

    const questionsDTO: IQuestionDTO[] = [];
    const answersDTO: IAnswerDTO[] = [];

    const proceedQuestion = (question: IQuestion, dtoAnswers: IAnswerDTO[], dtoQuestions: IQuestionDTO[]) => {
          const {  answers, ...questionDtoProps } = question; 
          const q: IQuestionDTO = {
              ...questionDtoProps
          };
          dtoQuestions.push(q);
          question.answers.forEach(f => {
             
              const a: IAnswerDTO = {
                  ...f,
                  answer: f.answer.map(z => ({
                      ...z,
                      question_next: z.question_next?.code || ''
                  }))
              };
              dtoAnswers.push(a);

              f.answer.forEach(a => {
                   if(a.question_next) {
                      proceedQuestion(a.question_next, dtoAnswers, dtoQuestions)
                   }
              })

          })
    }

    questions.forEach(f => proceedQuestion(f, answersDTO, questionsDTO))
    
    return {
      questions: questionsDTO,
      answers: answersDTO 
    } 
}