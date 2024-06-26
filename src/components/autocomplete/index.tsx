import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { AcAutoComplateItem } from "./types";
import { sleep } from "@/utils/sleep";
import { Box } from "@mui/material";

const AcAutocomplete = ({
  options,
  label,
  onInputChange,
  Item,
}: {
  options: AcAutoComplateItem[];
  label: string;
  onInputChange: Function;
  Item: any;
}) => {
  const [open, setOpen] = useState(false);
  const [localOptions, setLocalOptions] = useState<AcAutoComplateItem[]>([]);
  const loading = open && options.length === 0;
  const [search, setSearch] = useState("");
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(100);

      if (active) {
        setLocalOptions([...options]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, options]);

  useEffect(() => {
    if (!open) {
      setLocalOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (options && options.length > 0) {
      setLocalOptions(options);
    }
  }, [options]);

  return (
    <>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <Autocomplete
        multiple
        options={localOptions}
        disableCloseOnSelect
        loading={loading}
        autoFocus
        onError={(error) => setError(error)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onInputChange={(event: any, newInputValue: string) => {
          setSearch(newInputValue);
          if (typeof onInputChange === "function") {
            onInputChange(event, newInputValue);
          }
        }}
        getOptionLabel={(option: any) => option.name}
        renderOption={(props, option, { index, selected }) => (
            <Item
              option={option}
              search={search}
              selected={selected}
              props={props}
              // {...props}
            />
        )}
      />
    </>
  );
};

export default AcAutocomplete;