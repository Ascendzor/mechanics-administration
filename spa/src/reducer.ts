import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

type User = {
    id: string
}
type IState = {
    users: User[]
}
type IAction = {
    type: string
    data: any
}

// client.query({
//   query: gql`
//     query TodoApp {
//       todos {
//         id
//         text
//         completed
//       }
//     }
//   `,
// }).then(data => console.log(data))
//   .catch(error => console.error(error));

export default (state: IState, action: IAction): IState => {
    if(action.type === 'setUsers') return {...state, users: action.data}
    return state
}