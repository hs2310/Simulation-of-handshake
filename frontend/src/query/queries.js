import { gql } from 'apollo-boost';

const login = gql`
query($email: String, $password:String, $college:String, $company:String){
    login(email :$email, password :$password, college :$college, company :$company){
      status
      message
    }
  }

`;

const getAllJobs = gql`
query($name : String, $title : String){
  getAllJobs(name:$name,title:$title){
    status
    message
  }
}`;

export { login, getAllJobs }