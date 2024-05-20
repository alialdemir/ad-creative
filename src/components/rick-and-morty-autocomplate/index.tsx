import React, { useState } from "react";
import AcAutocomplete from "@/components/autocomplete";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {  useQuery } from "@apollo/client";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import GET_CHARACTERS from "@/graphql/queries/get_characters";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


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
  selected,
}: {
  option: Character;
  search: string;
  selected: boolean;
}) => {
  return (
    <Box
      component="li"
      sx={{ display: "flex", alignItems: "center", padding: 2 }}
    >
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        style={{ marginRight: 8 }}
        checked={selected}
      />
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
