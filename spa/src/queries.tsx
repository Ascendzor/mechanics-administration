import gql from 'graphql-tag';

export const GET_CUSTOMERS = gql`
    {
        customers {
            id
            name
            email
            phoneNumber
        }
    }
`;

export const ADD_CUSTOMER = gql`
    mutation AddCustomer($name: String, $phoneNumber: String, $email: String) {
        addCustomer(name: $name, phoneNumber: $phoneNumber, email: $email) {
            id
            name
            email
            phoneNumber
        }
    }
`

export const GET_CUSTOMER = gql`
    query Customer($customerId: String) {
        customer(customerId: $customerId) {
            id
            name
            email
            phoneNumber
            registrations
            jobs {
                id
            }
            tags
        }
    }
`

export const DELETE_CUSTOMER = gql`
    mutation DeleteCustomer($customerId: String){
        deleteCustomer(customerId: $customerId)
    }
`