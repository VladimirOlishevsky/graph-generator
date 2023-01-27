export type ActionType = 'add' | 'edit' | 'delete' | 'empty';
export type ComponentType = 'question' | 'answer';
export interface IOption {
    type: ActionType,
    value: string
}

export const optionsAnswer: IOption[] = [
    { type: 'edit', value: 'Редактировать' },
    { type: 'delete', value: 'Удалить' }
];

export const optionsQuestion: IOption[] = [
    { type: 'add', value: 'Добавить ответ' },
    { type: 'edit', value: 'Редактировать' },
];
