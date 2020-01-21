import gql from 'graphql-tag';

export const LOGIN = gql`
mutation login($email: String, $password: String) {
    doLogin(email: $email, password: $password)
}
`;
