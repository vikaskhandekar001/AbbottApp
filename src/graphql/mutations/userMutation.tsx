// graphql/mutations/userMutations.js
import {gql} from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const POST_MUTATION = gql`
  mutation PostLink($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      description
      url
    }
  }
`;
