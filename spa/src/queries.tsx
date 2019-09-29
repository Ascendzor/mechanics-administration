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