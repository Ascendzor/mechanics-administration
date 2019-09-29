import gql from 'graphql-tag';

export const GET_CUSTOMERS = gql`
    {
        customers {
            id
            names
            emails
            phoneNumbers
        }
    }
`;

export const ADD_CUSTOMER = gql`
    mutation AddCustomer($names: [String], $phoneNumbers: [String], $emails: [String]) {
        addCustomer(names: $names, phoneNumbers: $phoneNumbers, emails: $emails) {
            id
            names
            emails
            phoneNumbers
        }
    }
`

export const GET_CUSTOMER = gql`
    query Customer($customerId: String) {
        customer(customerId: $customerId) {
            id
            names
            emails
            phoneNumbers
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