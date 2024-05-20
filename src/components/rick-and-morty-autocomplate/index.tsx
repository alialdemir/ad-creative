import React, { useState } from "react";
import Head from "next/head";
import AcAutocomplete from "@/components/autocomplete";
import { AcAutoComplateItem } from "@/components/autocomplete/types";
import ApolloProvider from "@/graphql/ApolloProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { gql, useQuery } from "@apollo/client";
import parse from "html-react-parser";

import {
  TextField,
  Autocomplete,
  CircularProgress,
  Avatar,
  Box,
} from "@mui/material";

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

const highlightMatch = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <span>
      {parts.map((part: string, index: number) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <b key={index}>{part}</b>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default function RickandMortyAutocomplete() {
  const [search, setSearch] = useState("");
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name: search },
    skip: !search,
  });
  const handleInputChange = (event: any, newInputValue: string) => {
    setSearch(newInputValue);
  };

  const characterOptions =
    data?.characters.results.map((character: Character) => ({
      id: character.id,
      name: character.name,
      image: character.image,
      episodeCount: character.episode.length,
    })) || [];

  return (
    <Box sx={{ p: 4 }}>
      <h1>Rick and Morty</h1>
      <Card>
        <CardContent>
          <AcAutocomplete
            onInputChange={handleInputChange}
            label={"Search for a character"}
            options={characterOptions}
            Item={RickandMortyAutocompleteItem}
          >
            <RickandMortyAutocompleteItem search={""} />
          </AcAutocomplete>
        </CardContent>
      </Card>
      {error && <p>Error: {error.message}</p>}
    </Box>
  );
}

const RickandMortyAutocompleteItem = ({
  option,
  search,
}: {
  option: Character;
  search: string;
}) => {
  return (
    <Box component="li" sx={{ display: "flex", alignItems: "center", padding:2}}>
      <Avatar src={option.image} alt={option.name} sx={{ mr: 2 }} />
      <Box>
        <Typography variant="body1">
          {highlightMatch(option.name ?? "", search)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {option.episodeCount} Episodes
        </Typography>
      </Box>
    </Box>
  );
};
