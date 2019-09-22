import { useReducer } from 'react';

type Customer = {
    id: string
}
type Job = {
    id: string
}
type IState = {
    customers: Customer[]
    jobs: Job[]
}
type IAction = {
    type: string
    data: any
}
const reducer = (state: IState, action: IAction): IState => {
    return state
}

const initialState = {
    customers: [],
    jobs: []
}

const [state, dispatch] = useReducer(reducer, initialState)

export default state;
export const act = dispatch;