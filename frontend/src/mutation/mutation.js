import { gql } from 'apollo-boost';

const login = gql`
    mutation login($email: String, $password: String, $college: String, $company: String){
        login(email:$email, password:$password, college:$college, company:$company){
            status
            message
        }
    }
`;

export { login };