import { gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        image
        episode {
          id
        }
      }
    }
  }
`;

export default GET_CHARACTERS;
